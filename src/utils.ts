import { SHA1 } from "crypto-js";

function generateGitBlobHash(content: string){
	const byteLength = (new TextEncoder().encode(content)).byteLength;
	const header = `blob ${byteLength}\0`;
	const gitBlob = header + content;

	return SHA1(gitBlob).toString();
}

function escapeRegExp(string: string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export { generateGitBlobHash, escapeRegExp }
