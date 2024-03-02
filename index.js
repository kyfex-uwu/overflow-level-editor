import express from "express";
import fs from "fs";
const app = express();

//--

app.use("/", express.static("public"));
app.listen(3621);

//--

import readline from "readline";
import childProcess from 'child_process';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", async function(input) {
  console.log(await commandLineHandler(...input.split(" ")));
});

async function commandLineHandler(...input) {
  switch (input[0]) {
    case "help":
      return "help: this command\n"+
        "restart (r): restarts\n"+
        "shutdown: shuts down";

    case "r":
    case "restart":
      childProcess.exec('cmd /c start "" cmd /c node index.js');
      setTimeout(function() {
        process.exit()
      }, 100);
      return "inactive...";
    case "shutdown":
      setTimeout(function() {
        process.exit()
      }, 5000);
      return "shutting down...";
    default:
      return "not a command. type help to see all commands";
  }
  return "something happened";
};

function onError(error, identifier){
  console.log(`Caught exception (${identifier}): `);
  console.log(error);
}
process.on('uncaughtException', (err)=>onError(err, "exception"));
process.on('unhandledRejection', (err)=>onError(err, "rejection"));
app.use((err, req, res, next) => {
  onError(err, "express");
  res.status(500).send('ono');
});