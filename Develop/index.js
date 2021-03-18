const fs = require("fs");
const inquirer = require("inquirer");

let questions = [
  {
    type: "input",
    message: "What is the name of your project?",
    name: "projectName",
  },
  {
    type: "input",
    message: "Please write a short description of your project",
    name: "shortDescr",
  },
  {
    type: "input",
    message: "What command should be run to install dependencies?",
    name: "installCommand",
  },
  {
    type: "input",
    message: "What command will invoke this app to run?",
    name: "runCommand",
  },
  {
    type: "input",
    message: "What command will test the app?",
    name: "testCommand",
  },
  {
    type: "list",
    message: "What kind of license should you have?",
    choices: ["MIT", "IBM", "MOZILLA", "ODbl"],
    name: "licenseChoice",
  },
  {
    type: "input",
    message: "What is your Github username?",
    name: "username",
  },
];

inquirer.prompt(questions).then((answers) => {
  let badgeURL = (licenseChoice) => {
    if (answers.licenseChoice === "MIT") {
      return "https://img.shields.io/badge/License-MIT-yellow.svg";
    } else if (answers.licenseChoice === "IBM") {
      return "https://img.shields.io/badge/License-IPL%201.0-blue.svg";
    } else if (answers.licenseChoice === "MOZILLA") {
      return "https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg";
    } else if (answers.licenseChoice === "ODbL") {
      return "https://img.shields.io/badge/License-ODbL-brightgreen.svg";
    }
  };

  const avatarURL = `https://avatars.githubusercontent.com/${answers.username}`;

  let readmeTemplate = `
  # Project Name
  ${answers.projectName}
  ## Short Description
  ${answers.shortDescr}
  ## Table of content
  - Installation
  - Usage
  - License
  - Tests
  - Tutorial video
  - Contributors
  
  ### Installation
  ${answers.installCommand}
  ### Usage
  ${answers.runCommand}
  ### License
  ![License](${badgeURL(answers.licenseChoice)})
  
  ### Tests
  ${answers.testCommand}
  ### Tutorial video
  
  ### Contributors
  ![Avatar](${avatarURL})
  ${answers.username}
  
  `;

  fs.writeFile("readme.md", readmeTemplate, (err) => {
    if (err) throw err;
  });
});