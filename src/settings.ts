interface QuartzPublishPluginSettings {
    output: string;

    githubToken: string;
	githubRepo: string;
	githubUserName: string;

    renderDataview: boolean;
}

const DEFAULT_SETTINGS: QuartzPublishPluginSettings = {
    output: '',

    githubToken: '',
	githubRepo: '',
	githubUserName: '',

    renderDataview: false
}

export type {
    QuartzPublishPluginSettings
}

export {
    DEFAULT_SETTINGS
}