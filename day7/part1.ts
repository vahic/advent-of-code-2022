import { use_day_input } from "../inputs/inputs.ts";

const IsRoot = Symbol("IsRoot");

const NotComputed = Symbol("NotComputed");


interface File {
  name: string;
  size: number;
}

interface Directory {
  name: string;
  parent: Directory | typeof IsRoot;
  childrens: Directory[];
  files: File[];
  totalSize: typeof NotComputed | number
}

function buildFilesystemTreeFromTerminalHistory(history: string[]):Directory {
  const fsRoot: Directory = {
    name: "/",
    parent: IsRoot,
    childrens: [],
    files: [],
    totalSize: NotComputed
  };

  history
    .slice(1) // Remove the first line (getting at the root of the filesystem : we are already there)
    .reduce((currentDir: Directory, command: string) => {
      return executeCommand(command, currentDir, fsRoot);
    }, fsRoot);

    return fsRoot
}

function executeCommand(
  command: string,
  currentDir: Directory,
  rootDir: Directory,
): Directory {
  switch (command.slice(0, 4)) {
    case "$ cd": {
      const destination = command.slice(5);
      return changeDirectory(destination, currentDir, rootDir);
    }
    case "$ ls":
    case "dir ":
      return currentDir; // ls and dir brings no information so we skip, directory creation in handling when the cd is done in changeDirectory
    default: {
      const [size, name] = command.split(" ");
      const newFile = { name, size: parseInt(size) };
      currentDir.files.push(newFile);
      return currentDir;
    }
  }
}

function changeDirectory(
  destination: string,
  currentDir: Directory,
  rootDir: Directory,
): Directory {
  switch (destination) {
    case "..":
      return currentDir.parent === IsRoot ? rootDir : currentDir.parent;
    case "/":
      return rootDir;
    default: {
      const newDir:Directory = {
        name: destination,
        parent: currentDir,
        childrens: [],
        files: [],
        totalSize: NotComputed
      };
      currentDir.childrens.push(newDir);
      return newDir;
    }
  }
}


const terminalHistory = use_day_input(7);


const filesystemTree = buildFilesystemTreeFromTerminalHistory(terminalHistory)

console.log(filesystemTree)