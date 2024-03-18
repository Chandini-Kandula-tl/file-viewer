const HELP_MSGS = {
    "cd": "prints -> user's current directory",
            "pwd": "prints -> present working directory",
            "ls": "prints -> shows list of files",
            "cat": "prints -> content of the file",
            "find": "prints -> result of serch",
            "history": "prints -> <count> latest commands, default count is 5",
            "log": `logs commands from the log file location \n 'log --all' : print all commands from the current log file
        \n 'log --tail 9' : "print last 9 commands from the current log file
        \n "'log --head 9' : print first 9 commands from the current log file
        \n "'log --clear' : clears all logs from the current log file
        \n "'log --stop' : stops logging commands but keep the current log file`
}

module.exports = { HELP_MSGS };