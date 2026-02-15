import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export interface DownloadResult {
    stats: "success" | "fail";
    code: number | null;
    message?: string;
    url?: string;
    ext?: string;
    size?: number;
    location?: string;
}

export function download(
    url: string,
    folder: string,
    filename: string,
    ext: string = "mp4"
): Promise<DownloadResult> {
    return new Promise((resolve) => {
        if (!fs.existsSync(folder))
            fs.mkdirSync(folder, { recursive: true });

        const outputTemplate = path.join(folder, filename + ".%(ext)s");

        let finalPath = "";
        let stderr = "";

        const isMp3 = ext.toLowerCase() === "mp3";

        const args = isMp3
            ? [
                "-f", "ba/b",
                "-x",
                "--audio-format", "mp3",
                "--audio-quality", "0",
                "--no-playlist",
                "--windows-filenames",
                "--print", "after_move:filepath",
                "-o", outputTemplate,
                url
            ]
            : [
                "-f", "bv*+ba/b",
                "--merge-output-format", "mp4",
                "--no-playlist",
                "--windows-filenames",
                "--print", "after_move:filepath",
                "-o", outputTemplate,
                url
            ];

        const proc = spawn(path.resolve("src/programs/yt-dlp.exe"), args);

        proc.stdout.on("data", d => {
            finalPath += d.toString();
        });

        proc.stderr.on("data", d => {
            stderr += d.toString();
        });

        proc.on("close", (code) => {
            finalPath = finalPath.trim();

            if (code !== 0 || !finalPath || !fs.existsSync(finalPath)) {
                return resolve({
                    stats: "fail",
                    code,
                    message: "An error occurred while downloading the YouTube video."
                });
            }

            const size = fs.statSync(finalPath).size;

            if (size < 100000) {
                return resolve({
                    stats: "fail",
                    code,
                    message: "The file was corrupted while downloading the video."
                });
            }

            resolve({
                stats: "success",
                code,
                url,
                ext,
                size,
                location: finalPath
            });
        });

        proc.on("error", () => {
            resolve({
                stats: "fail",
                code: null,
                message: "Failed to start yt-dlp process."
            });
        });
    });
}
