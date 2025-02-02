import fs from "fs-extra";
import path from "path";
import process from "process";

export async function cli(args) {
  let scaffoldingPath;

  if (args.database) {
    scaffoldingPath = path.resolve(
      new URL(import.meta.url).pathname,
      "../../scaffolding"
    );
  } else {
    scaffoldingPath = path.resolve(
      new URL(import.meta.url).pathname,
      "../../scaffolding/next"
    );
  }

  const destinationPath = process.cwd() + "/" + args.projectName;

  fs.mkdirSync(destinationPath);

  await fs.copy(scaffoldingPath, destinationPath);

  // could also open the file in the code editorß
}
