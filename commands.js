const fs = require('fs');
const readline = require('readline');

// write out data
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

// where we will store out commands
function evaluateCmd(userInput) {
    //parses the user input to understand which command was typed
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch (command) {
        case "echo":
            //we weill add the functionality of echo next within the object commandLibrary
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail":
            commandLibrary.tail(userInputArray.slice(1));
            break;
        default:
            console.log("You have entered an unknown command.");
            process.stdout.write('\nprompt > ');
    }
}

// where we will store the Logic of our commands
const commandLibrary = {
    // the echo command
    "echo": function(userInput) {
        done(userInput);
    },
    // the cat command
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    // the head command
    "head": function(fullPath) {
        const fileName = fullPath[0];
        count = 1;
        let rl = readline.createInterface({
            input: fs.createReadStream(fileName)
        });
        rl.on('line', function (line) {
            if (count <= 9) {
                console.log(line);
                count++;
            } else if (count === 10) {
                done(line);
                count++;
            }
        });
    },
    "tail": function(fullPath) {
        const fileName = fullPath[0];
        let array = [];
        let count = 0;
        let rl = readline.createInterface({
            input: fs.createReadStream(fileName)
        });
        showRead();

        async function showRead() {
            const x = await doRead();
            for (let i = array.length - 10; i < array.length; i++) {
                console.log(array[i]);
            }
            process.stdout.write('\nprompt > ');
        }

        function doRead() {
            return new Promise(resolve => {
                rl.on('line', function (line) {
                    array[count] = line;
                    count++;
                });
                rl.on('close', () => resolve(count));
            });
        }
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;