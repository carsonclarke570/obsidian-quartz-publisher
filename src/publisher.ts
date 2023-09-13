import { Notice } from "obsidian";
import { QuartzPublishPluginSettings } from "./settings";
import { PublishCallbackStatus, PublishChange, PublishType } from "./types";
import MarkdownConverter from "./converter";
import { Base64 } from "js-base64";

import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";

const QUARTZ_CONTENT_PATH = 'content';

export default class Publisher {

    settings: QuartzPublishPluginSettings
    converter: MarkdownConverter
    client: Octokit

    constructor(converter: MarkdownConverter, settings: QuartzPublishPluginSettings) {
        this.converter = converter;
        this.settings = settings;
        this.client = new Octokit({ auth: this.settings.githubToken });
    }

    /**
     * Attempt to publish all the changes to github
     * @param changes A list of changes
     * @param callback function
     * @returns Promise<boolean> of whether any attempt to publish failed
     */
    async publishAll(changes: Array<PublishChange>, callback: (status: PublishCallbackStatus) => void): Promise<boolean> {

        let i = 1;
        let success = true;
        for (const change of changes) {
            const result = await this.publish(change, {
                fileIndex: i,
                numFiles: changes.length,
                fileName: change.path
            }, callback)

            await new Promise(resolve => setTimeout(resolve, 200))

            if (!result) {
                success = false;
            }
            i++;
        }

        return success;
    }


    private async publish(change: PublishChange, status: PublishCallbackStatus, callback: (status: PublishCallbackStatus) => void): Promise<boolean> {
        let text = ''
        let result = false;
        switch(change.type) {
            case PublishType.ADD:
            case PublishType.UPDATE:
                console.log(change.type == PublishType.ADD ? `ADD ${change.path}` : `UPDATE ${change.path}`)
                if (change.file === undefined) {
                    return result;
                }
                text = await this.converter.convertFile(change.file)
                result = await this.upload(text, change.path, change.type == PublishType.UPDATE)
                break
            case PublishType.DELETE:
                console.log(`DELETING ${change.path}`)
                result = await this.delete(change.path)
                break
        }

        callback(status)
        return result;
    } 

    private async delete(path: string): Promise<boolean> {
        const fullPath = `${QUARTZ_CONTENT_PATH}/${path}`
        try {
            await this.deleteFromGithub(fullPath)
        } catch (e) {
            console.log(e)
            return false
        }
        return true
    }

    private async upload(text: string, path: string, update: boolean): Promise<boolean> {
        const content = Base64.encode(text)
        const fullPath = `${QUARTZ_CONTENT_PATH}/${path}`
        try {
            await this.uploadToGithub(fullPath, content, update)
        } catch (e) {
            console.log(e)
            return false
        }
        return true
    }

    private validateSettings() {
        if (!this.settings.githubRepo) {
            new Notice("Config error: You need to define a GitHub repo in the plugin settings");
            throw {};
        }
        if (!this.settings.githubUserName) {
            new Notice("Config error: You need to define a GitHub Username in the plugin settings");
            throw {};
        }
        if (!this.settings.githubToken) {
            new Notice("Config error: You need to define a GitHub Token in the plugin settings");
            throw {};
        }
    }

    private async uploadToGithub(path: string, content: string, update: boolean) {
        this.validateSettings()

        const sha = update ? await this.getGithubSha(path) : ''
        const message = update ? `Update content ${path}` : `Add ${path}`

        const payload = {
            owner: this.settings.githubUserName,
            repo: this.settings.githubRepo,
            path,
            message,
            content,
            sha
        };

        type ResponseType = Endpoints['PUT /repos/{owner}/{repo}/contents/{path}']['response']
        const response: ResponseType = await this.client.request('PUT /repos/{owner}/{repo}/contents/{path}', payload);
        if (response.status !== 201) {
            new Notice("Failed to upload to GitHub!");
            throw {};
        }
    }

    private async getGithubSha(path: string): Promise<string> {
        type ResponseType = Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']

        const response: ResponseType = await this.client.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: this.settings.githubUserName,
            repo: this.settings.githubRepo,
            path
        });

        if (response.status === 200) {
            if (!Array.isArray(response.data) && response.data.type === 'file') {
                return response.data.sha
            }
        } 

        new Notice("Failed to retrieve SHA hash from GitHub");
        throw {};
    }

    private async deleteFromGithub(path: string): Promise<void> {
        this.validateSettings()

        const payload = {
            owner: this.settings.githubUserName,
            repo: this.settings.githubRepo,
            path,
            message: `Delete content ${path}`,
            sha: await this.getGithubSha(path)
        };

        type ResponseType = Endpoints['DELETE /repos/{owner}/{repo}/contents/{path}']['response']
        const response: ResponseType = await this.client.request('DELETE /repos/{owner}/{repo}/contents/{path}', payload);
        if (response.status !== 200) {
            new Notice("Failed to delete from GitHub!");
            throw {};
        }
    }
}