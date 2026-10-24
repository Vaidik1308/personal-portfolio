import { readFile } from "node:fs/promises";
import path from "node:path";

// Images for next/og must be inlined as data URLs
export async function publicImage(file: string) {
  const buf = await readFile(path.join(process.cwd(), "public", file));
  // Sniff the real format: some assets here are PNGs saved with a .jpg name
  const mime = buf.subarray(0, 4).toString("hex") === "89504e47" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}
