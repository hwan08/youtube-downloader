import { spawn } from "child_process";
import path from "path";

export interface result {
    title: string;
    channel: string;
    url: string;
}

export async function search(keyword: string): Promise<result[]> {
    return new Promise((resolve) => {
        let data = "";
    
        try {
            const proc = spawn(path.resolve("src/programs/yt-dlp.exe"), [
                `ytsearch5:${encodeURIComponent(keyword)}`,
                "--dump-json",
                "--skip-download"
            ]);
    
            proc.stdout.on("data", d => data += d);
            proc.on("close", () => {
                const lines = data.trim().split("\n");
    
                const results = lines.map(line => {
                    const v = JSON.parse(line);
                    return {
                        title: v.title,
                        channel: v.uploader,
                        url: v.webpage_url
                    };
                });
    
                resolve(results)
            });
        } catch (error: unknown) {
            throw new Error("An error occurred while searching.");
        }
    });
}