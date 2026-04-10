import { readdir, rm } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist");

const removeAppleDoubleFiles = async (directory) => {
  let removedCount = 0;

  let entries = [];
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return removedCount;
  }

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      removedCount += await removeAppleDoubleFiles(fullPath);
      continue;
    }

    if (entry.name.startsWith("._")) {
      await rm(fullPath, { force: true });
      removedCount += 1;
    }
  }

  return removedCount;
};

const removeLegacyRootPdfs = async () => {
  let entries = [];
  try {
    entries = await readdir(distDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const removedFiles = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    if (/\.pdf$/i.test(entry.name) && entry.name !== "Hardik_Dagha_Resume.pdf") {
      await rm(path.join(distDir, entry.name), { force: true });
      removedFiles.push(entry.name);
    }
  }

  return removedFiles;
};

const removedAppleDoubleCount = await removeAppleDoubleFiles(distDir);
const removedLegacyRootPdfs = await removeLegacyRootPdfs();

if (removedAppleDoubleCount > 0) {
  console.log(
    `[postbuild] Removed ${removedAppleDoubleCount} macOS AppleDouble file(s) from dist.`
  );
}

if (removedLegacyRootPdfs.length > 0) {
  console.log(
    `[postbuild] Removed stale root PDF file(s): ${removedLegacyRootPdfs.join(
      ", "
    )}`
  );
}
