const fs = require('fs');
const path = require('path');
const { HELP_MSGS } = require('./constants.js');
const { Logs, Log } = require('./logfile.js');
const History = require('../sprint-6_4_mar_to_08_mar_2024/history.js');

class Constants {
    static CHANGEDIRECTORY = "cd";
    static PRESENTWORKINGDIRECTORY = "pwd";
    static LISTOFFILES = "ls";
    static DISPLAYCONTENT = "cat";
    static FIND = "find";
    static HISTORY = "history";
    static LOG = "log";
    static HELP = "--help";
    static START = "--start";
    static STOP = "--stop";
    static EXIT = "exit";
    static A = "-a";
    static FI = "-fi";
    static FIG = "-fiG";
    static DIR = "-dir";
    static G = "-G"
    static S = "s";
    static E = "e";
    static DOTS = "..";

}

class FileViwer {
    constructor() {
        this.defaultFilePath = __dirname;
        this.validCommands = [Constants.CHANGEDIRECTORY, Constants.PRESENTWORKINGDIRECTORY, Constants.LISTOFFILES,
        Constants.DISPLAYCONTENT, Constants.FIND, Constants.LOG, Constants.HELP, Constants.HISTORY];
        this.givenPath = this.defaultFilePath;
        this.filesAndDirectories = { "Files": [], "Directories": [] };
        this.history = new History();
        this.logs = new Logs();
    }

    handleInput() {
        this.seperateFilesDirectories();
        while (true) {
            if (this.logs.isLogingStart === false) {
                console.log("logs are in deactive state, please activate to store logs \nobserve the format : <log --start> <filepath>");
            }
            console.log();
            let input = prompt("enter the command : ");
            this.history.storeHistory(input);
            let command = input.split(" ");
            if (this.logs.isLogingStart) {
                this.storeLogDetails(command);
            }
            if (command[0] === Constants.EXIT) {
                break;
            }
            else if (command[command.length - 1] === Constants.HELP) {
                this.helpMethod(command);
            }
            else if (command[0] === Constants.CHANGEDIRECTORY) {
                this.changeDirectory(command);
            }
            else if (command[0] === Constants.PRESENTWORKINGDIRECTORY) {
                this.presentWorkingDirectory();
            }
            else if (command[0] === Constants.LISTOFFILES) {
                this.listOfFiles(command);
            }
            else if (command[0] === Constants.DISPLAYCONTENT) {
                this.displayContent(command);
            }
            else if (command[0] === Constants.FIND) {
                this.findFile(command);
            }
            else if (command[0] === Constants.HISTORY) {
                this.historyMethod(command);
            }
            else if (command[0] === Constants.LOG) {
                this.logHandler(command);
            }
            else {
                console.log("invalid command");
            }
        }
    }

    changeDirectory(command) {
        try {
            let argument = command[1];
            if (command.length === 1) {
                console.log("<DIR> missing : please specify directory");
                return;
            }
            else {
                let newPath = path.join(this.givenPath, argument);
                if (fs.existsSync(newPath)) {
                    this.givenPath = newPath;
                    this.seperateFilesDirectories();
                    console.log(this.givenPath);
                }
                else {
                    console.log("invalid directory");
                }
            }
        }
        catch (err) {
            console.log("invalid command");
        }
    }

    presentWorkingDirectory(command) {
        console.log(this.givenPath);
    }

    listOfFiles(command) {
        try {
            let argument = command[1];
            let files = [];
            if (argument === undefined) {
                let fileNames = fs.readdirSync(this.givenPath);
                console.log("\ncurrent directory filenames : ");
                fileNames.forEach(file => {
                    files.push(file);
                });
                this.printPattern(files);
            }
            else if (argument === Constants.A) {
                let fileNames = fs.readdirSync(this.givenPath);
                const hiddenFiles = fileNames.filter(file => file.startsWith("."));
                this.printPattern(hiddenFiles);
            }
            else if (argument === Constants.G) {
                for(let index in this.filesAndDirectories)
                {
                    console.log("\n",index , ":");
                    this.printPattern(this.filesAndDirectories[index]);
                }
                
            }
            else if (argument === Constants.FI) {
                console.log("\nFiles : ");
                this.printPattern(this.filesAndDirectories["Files"]);

            }
            else if (argument === Constants.DIR) {
                console.log("\nDirectories : ");
                this.printPattern(this.filesAndDirectories["Directories"]);
            }
            else if (argument === Constants.FIG) {            
                let directoryFiles = fs.readdirSync(this.givenPath);
                const groupOfFiles = directoryFiles.reduce((accumulator, file) => {
                    let fileArr = file.split(".");
                    const category = fileArr.length === 1 ? "directory" : fileArr[1];                    
                    (!accumulator[category]) ? accumulator[category] = [file]: accumulator[category].push(file);
                    return accumulator;
                }, {})
                for(let index in groupOfFiles)
                {
                    console.log("\n", index , ":");
                    this.printPattern(groupOfFiles[index]);
                }
            }
            else {
                console.log("invalid command"); 
            }
        }
        catch (err) {
            console.log(err.message, "invalid command or error occured");
        }
    }

    printPattern(totalFiles)
    {
        let index = 0;
        let line = " ";
        while(index < totalFiles.length)
        {
            if(index % 2 === 0 && index !== 0)
            {
                console.log(line);
                line = " ";
            }
            line += totalFiles[index];
            line += "\t";
            index += 1;
        }
        console.log(line);
    }

    displayContent(command) {
        try {
            if (command.length === 1) {
                console.log("please specify fileName");
            }
            else {
                if (command.length < 3 && command[command.length - 1] !== typeof Number) {
                    this.catOperation(command)
                }
                else if (command.length === 3) {
                    this.catOperation(command);
                }
            }
        }
        catch (err) {
            console.log("invalid command");
        }
    }

    catOperation(command) {
        try {
            let fileName = command[1];
            let argument = command[2] ?? 5;
            let relativePath = fileName;
            let absolutePath = path.resolve(relativePath);
            let check = absolutePath.split(".");
            if (fs.existsSync(absolutePath)) {
                let poppedElement = check.pop();
                if (poppedElement !== "txt") {
                    console.log(".txt extension files only supported");
                    return;
                }
                else {
                    let fileContent = fs.readFileSync(absolutePath, 'utf8');
                    const lines = fileContent.split('\n').slice(0, Number(argument));
                    console.log(lines.join('\n'));
                }
            }
            else {
                console.log("file not found");
            }
        }
        catch (err) {
            console.log("invalid command or error occured");
        }
    }

    findFile(command) {
        try {
            let name = command[1].toLowerCase();
            let argument = command[2] ?? "c";
            if (command.length === 1) {
                console.log("<NAME> missing - Please specify name to search");
                return;
            }
            else {
                if (argument.toLowerCase() === Constants.S) {
                    let fileNames = fs.readdirSync(this.givenPath);
                    let files = fileNames.filter(file => file.startsWith(name));
                    console.log(files);
                }
                else if (argument.toLowerCase() === Constants.E) {
                    let directoryFiles = fs.readdirSync(this.givenPath);
                    const files = directoryFiles?.filter((file) => {
                        let index = file.lastIndexOf(".");
                        let fileName = file.slice(0, index);
                        return fileName.endsWith(name);
                    })
                    console.log(files);
                }
                else if (argument) {
                    let directoryFiles = fs.readdirSync(this.givenPath);
                    const files = directoryFiles?.filter((file) => {
                        let index = file.lastIndexOf(".");
                        let fileName = file.slice(0, index);
                        return fileName.includes(name);
                    })
                    console.log(files);
                }
                else {
                    console.log("invalid command");
                }
            }
        }
        catch (err) {
            console.log("invalid command");
        }
    }

    seperateFilesDirectories() {
        for (let key in this.filesAndDirectories) {
            this.filesAndDirectories[key] = [];
        }
        let fileNames = fs.readdirSync(this.givenPath);
        fileNames.forEach(file => {
            const filePath = path.join(this.givenPath, file);
            const fileStats = fs.statSync(filePath);
            if (fileStats.isFile()) {
                this.filesAndDirectories["Files"].push(file);
            }
            else if (fileStats.isDirectory()) {
                this.filesAndDirectories["Directories"].push(file);
            }
        })
    }

    helpMethod(command) {
        if (command.length === 1) {
            console.log(HELP_MSGS);
        }
        else if (command.length === 2) {
            console.log(HELP_MSGS[command[0]]);
        }
    }
    historyMethod(command) {
        this.history.handleInput(command);
    }

    storeLogDetails(command) {
        command = command.join(" ");
        let log = new Log({ logSerial: this.logs.logSerialNumber, timeStamp: Date.now(), logCommand: command });
        this.logs.storeLog(log);
    }

    logHandler(command) {
        if (command[1] === Constants.START) {
            this.logs.isLogingStart = true;
            this.logs.handleLog(command);
        }
        else if (this.logs.isLogingStart) {
            this.logs.handleLog(command);
        }
        else {
            console.log("log is not yet started");
        }
    }

}

const prompt = require("prompt-sync")();
const fileViwer = new FileViwer();
fileViwer.handleInput();



