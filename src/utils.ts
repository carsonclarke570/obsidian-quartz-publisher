import { SHA1 } from "crypto-js";

function generateGitBlobHash(content: string){
	const byteLength = (new TextEncoder().encode(content)).byteLength;
	const header = `blob ${byteLength}\0`;
	const gitBlob = header + content;

	return SHA1(gitBlob).toString();
}

export { generateGitBlobHash }
