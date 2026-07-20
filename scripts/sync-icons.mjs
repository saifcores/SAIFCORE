import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "public", "profile.png");
const iconPath = join(root, "src", "app", "icon.png");
const applePath = join(root, "src", "app", "apple-icon.png");

if (!existsSync(source)) {
  console.error("Missing public/profile.png — cannot sync icons.");
  process.exit(1);
}

mkdirSync(dirname(iconPath), { recursive: true });

function resizeWithSips(dest, size) {
  copyFileSync(source, dest);
  execFileSync("sips", ["-Z", String(size), dest], { stdio: "inherit" });
}

try {
  resizeWithSips(iconPath, 192);
  resizeWithSips(applePath, 180);
  console.log("Synced favicon (192) and apple-icon (180) from profile.png");
} catch {
  copyFileSync(source, iconPath);
  copyFileSync(source, applePath);
  console.warn(
    "sips unavailable — copied full-size profile.png. Install macOS sips or resize manually.",
  );
}
