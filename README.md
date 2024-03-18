Study 

File API 

 

FileViewer 

Write a class named `FileViewer`, capable of 

cd <DIR>        - Change Directory 

Cases: 

<DIR> missing: “Please specify directory” 

<DIR> invalid: “Directory invalid” 

<DIR> = ‘..’ - Move to parent directory 

 

pwd                - Present Working Directory (last ‘cd’ location) 

Cases: 

User did not use ‘cd’: “Not specified directory yet” 

 

ls <ARG>          - List folders/files in ‘pwd’ 

Cases 

<ARG> not specified - Show all folders and files 

<ARG> = ‘-a’ - Show just the hidden files 

<ARG> = ‘-G’ - Group folders & files separately Output: Folders: ---------- “dir1"/ “dir2”/ “dir3”/ “dir4”/ Files: ------ “File1.pdf” “Group1 Results.txt” 

<ARG> = ‘-fi’ - List just the files 

<ARG> = ‘-dir’ - List just the directories/folders 

<ARG> = ‘-fiG’ - List just the files in groups of their extensions 

Error Cases: 

All cases of ‘pwd’ 

Preferably 2 items per row 

 

cat <FIL> -<ARG>      - List first <ARG> lines of file (Support for only .TXT files 

Cases:  

<ARG> not specified - List first 5 lines of file 

<ARG> specified - List <ARG> lines (if exist) 

<FIL> missing: “Please specify file” 

<FIL> invalid: “File invalid” 

 

find <NAME> -<ARG> - Find the files containing <NAME>  

Cases: 

<NAME> missing - ‘Please specify name to search’ 

<ARG> missing or is ‘c’- Return files/folders containing <NAME> 

<ARG> = ‘s’ - Return files starting with <NAME> 

<ARG> = ‘e’ - Return files ending with <NAME> 

 

All the commands must handle `--help` argument, it should print the usage description of the command. 

Example:  

`$ cd --help` 

Prints -> `User’s current directory` 

 

`history <count>`: 

print <count> latest commands (no need to persist), default count is 5 

 

`log <options>` - Logs commands from the log file location 

`log --start <path>` - start logging and the save the log at given path. Ex: log --start C:/Users/UserName/log.txt 

`log --all`          - print all commands from the current log file 

`log --tail 9`     - print last 9 commands from the current log file 

`log --head 9`   - print first 9 commands from the current log file 

`log --clear`      - clears all logs from the current log file 

`log --stop`       - stops logging commands but keep the current log file 

 

Logging: 

You need to log all the commands in the current log file in the below pattern 
