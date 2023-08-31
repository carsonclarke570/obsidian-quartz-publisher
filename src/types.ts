import { TFile } from "obsidian";

export enum PublishType {
    ADD, DELETE, UPDATE
}

export interface PublishChange {
    path: string;
    file?: TFile;
    type: PublishType;
}

export interface PublishChoice {
    isSelected: boolean;
    change: PublishChange;
}

export interface PublishCallbackStatus {
    numFiles: number;
    fileIndex: number;
    fileName: string;
}