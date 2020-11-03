const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');


const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = ()=>{
    return inquirer.prompt([
        {
            name: 'author',
            message: 'What is the project author(s) name(s)?'
        },
        {
            name: 'name',
            message: 'What is the project name?'
        },
        {
            name: 'intro',
            message: 'An introduction or lead on the problem. "Why does someone need this? What purpose does it serve?"'
        },
        {
            name: 'install',
            message:'What are the install instructions for your project?'
        },
        {
            name: 'operation',
            message:'What are the instructions for using your project?'
        },
        {
            name: 'contribution',
            message: 'How may others contribute to this project?'
        }
    ]);
};

const generateMarkDown = answers =>{
    return `
        # ${answers.name}
        ===============
        Author:${answers.author}
        -------
        
        Introduction
        ------------
        ${answers.intro}

        Install
        ------
        ${answers.install}

        Operation Instructions
        ----------------------
        ${answers.operation}

        Contribution
        -------------
        ${answers.contribution}
    `;
};

promptUser()
    .then(answers =>{
        const markDown = generateMarkDown(answers);

        return writeFileAsync('ReadMe.md', markDown);
    })
    .then(()=>{
        console.log('Successfully wrote ReadMe.md!');
    })
    .catch(err => console.log(err));