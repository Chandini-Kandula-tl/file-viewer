const fs = require('fs');
class Log {
    constructor({logSerial,timeStamp,logCommand}) {
        this.logSerial = logSerial;
        this.timeStamp = timeStamp;
        this.logCommand = logCommand;
    }
}

class Logs {
    constructor() {
        this.totalLogs = []
        this.object = {"--tail" : this.printLogTail.bind(this),
                       "--head" : this.printLogHead.bind(this),
                        "--all" : this.printAll.bind(this),
                        "--clear" : this.clearLog.bind(this),
                        "--start" : this.startLog.bind(this),
                        "--stop" : this.stopLog.bind(this)
                    }
        this.isLogingStart = false;
        this.logCheck = true;
        this.logSerialNumber = 0;//
        this.logFilePath = 'command_log.txt';
        // this.log = new Log();//
    }

storeLog(log)
    { 
        let logENtry = `${log.logSerial}\t ${log.timeStamp}\t${log.logCommand}`; 
        fs.appendFileSync(this.logFilePath, `${logENtry}\n`);
        this.logSerialNumber += 1;
    }
    handleLog(command)
    {
        // command = command.split(" ");
        if(command[1] in this.object)
        {
            this.object[command[1]](command);
        }
        else
        {
            console.log("invalid command");
        }
    }
    printLogTail(command)
    {
        const logCommands = fs.readFileSync(this.logFilePath,'utf8');
        let logLength = this.logSerialNumber;
        let count = logLength - (Number(command[2]) || 5);
        const lines = logCommands.split('\n').slice(count + 1, );
        console.log(lines.join('\n'));
        if(command[2] === undefined)
        {
            console.log("log tail will show last 5 logs by default");
        }
    }

    printLogHead(command)
    {
        const logCommands = fs.readFileSync(this.logFilePath,'utf8');
        let count = (Number(command[2]) || 5);
        const lines = logCommands.split('\n').slice(1, count + 1);
        console.log(lines.join('\n'));
        if(command[2] === undefined)
        {
            console.log("log head will show first 5 logs by default");
        }
    }

    printAll()
    {
        const logCommands = fs.readFileSync(this.logFilePath,'utf8');
        console.log("All logs : ");
        console.log(logCommands);
    }

    startLog(command)
    {
        // console.log("Enter file path : ", this.logFilePath);
        try{
        if(this.isLogingStart && this.logCheck && command.length === 3)
        {
            this.logFilePath = command[2];
            console.log("entered file path is : ",this.logFilePath);
            console.log(`logging started. log file :  ${this.logFilePath}`);
            fs.writeFileSync(this.logFilePath, 'S.No\tTime Stamp\tCommand\n');
            this.logCheck = false;
        }
        else if(this.isLogingStart && !(this.logCheck))
        {
            // console.log(`logging started. log file :  ${this.logFilePath}`);
            console.log("logging started. log file : ",this.logFilePath);
        }
        else{
            throw(err);
        }
        }
        catch(err)
        {console.log("enter the file path");}
    }

    clearLog()
    {
        fs.writeFileSync(this.logFilePath, '');
        console.log("logs cleared");
        // this.totalLogs = {};
        // console.log("logs cleared");
    }

    stopLog()
    {
        this.isLogingStart = false;
        console.log("logging stopped. log file : ",this.logFilePath);
        // console.log("logging stoped");
    }
}

module.exports = { Logs, Log };