import { TFile, Vault } from "obsidian";
import { QuartzPublishPluginSettings } from "./settings";
import { Octokit } from "@octokit/core";
import MarkdownConverter from "./converter";
import { generateGitBlobHash } from "./utils";

const QUARTZ_CONTENT_FOLDER = "content/";

export interface PublisherStatus {
    unpublishedNotes: Array<TFile>;
    publishedNotes: Array<TFile>;
    changedNotes: Array<TFile>;

    deletedNotePaths: Array<string>;
}
export default class PublisherStatusManager {
    settings: QuartzPublishPluginSettings;
    converter: MarkdownConverter;
    vault: Vault;

    constructor(vault: Vault, converter: MarkdownConverter, settings: QuartzPublishPluginSettings) {
        this.vault = vault;
        this.converter = converter;
        this.settings = settings
    }

    async getStatus(): Promise<PublisherStatus> {
        const unpublishedNotes: Array<TFile> = [];
        const publishedNotes: Array<TFile> = [];
        const changedNotes: Array<TFile> = [];

        const remoteNoteHashes = await this.getRemoteNoteHashes();
        const files = this.vault.getFiles();

        for (const file of files) {
            if (file.extension === "md") {
                const convertedText = await this.converter.convertFile(file)
                const localHash = generateGitBlobHash(convertedText)
                const remoteHash = remoteNoteHashes[file.path]
                
                if (!remoteHash) {
                    unpublishedNotes.push(file)
                } else if (remoteHash === localHash) {
                    publishedNotes.push(file)
                } else {
                    changedNotes.push(file)
                }
            }
        }

        return {
            unpublishedNotes: unpublishedNotes,
            publishedNotes: publishedNotes,
            changedNotes: changedNotes,
            deletedNotePaths: this.generateDeletedPaths(remoteNoteHashes, files.map((f) => f.path))
        }
    }

    async getRemoteNoteHashes(): Promise<{[key: string]: string}> {
        const octokit = new Octokit({ auth: this.settings.githubToken });

         //Force the cache to be updated
         const response = await octokit.request(`GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=${Math.ceil(Math.random() * 1000)}`, {
            owner: this.settings.githubUserName,
            repo: this.settings.githubRepo,
            tree_sha: 'HEAD'
        });

        const files = response.data.tree;
        const notes: Array<{ path: string, sha: string }> = files.filter(
            (x: { path: string; type: string; }) => {
                return x.path.startsWith(QUARTZ_CONTENT_FOLDER) && x.type === "blob"
            }
        );

        const hashes: { [key: string]: string } = {};

        for (const note of notes) {
            const vaultPath = note.path.replace(QUARTZ_CONTENT_FOLDER, "");
            hashes[vaultPath] = note.sha;
        }
        return hashes;
    }

    private generateDeletedPaths(remoteHashes: { [key: string]: string }, marked: string[]): Array<string> {
        const deletedPaths: Array<string> = [];
        Object.keys(remoteHashes).forEach(key => {
            if (!marked.find(f => f === key)) {
                deletedPaths.push(key)
            }
        })
        return deletedPaths;
    }
}