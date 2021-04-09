import inquirer from 'inquirer';
import { addProject, removeProject, listProjects, selectProjects } from './helpers/setupConfig';
import kontentSync from './main'
import chalk from 'chalk';
import fs from 'fs';

async function makeExportsDirectory(){
    try {
        // create new directory
        fs.mkdirSync('exports', () => {
            console.log("Directory is created.");
        });

    }catch{}

}


async function promptForSetup() {

    const questions = [];

    questions.push({
        type: 'confirm',
        name: 'setup',
        message: 'Configure Sync Tool?',
        default: false,
    });

    const answers = await inquirer.prompt(questions);

    if (answers.setup){
        await promptForAdjustProjects()
    }

}

async function promptForAdjustProjects(){

    const questions = [];

    questions.push({
        type: 'confirm',
        name: 'add_project',
        message: 'Add a new project?',
        default: false,
    });

    questions.push({
        type: 'confirm',
        name: 'remove_project',
        message: 'Remove a project?',
        default: false,
    });

    const answers = await inquirer.prompt(questions);

    if (answers.add_project) await promptForAddProject();
    if (answers.remove_project) await promptForRemoveProject();

}
async function promptForRemoveProject() {

    const questions = [];

    questions.push({
        type: 'list',
        name: 'project_name',
        message: 'Please choose.',
        choices: listProjects(),
        required: true
    });

    const answers = await inquirer.prompt(questions);

    removeProject(answers.project_name)

}
async function promptForAddProject() {

    const questions = [];

    questions.push({
        type: 'input',
        name: 'project_name',
        message: 'Enter Project Name',
        required: true
    });

    questions.push({
        type: 'input',
        name: 'project_api',
        message: 'Enter Project Delivery API Key',
        required: true
    });

    questions.push({
        type: 'input',
        name: 'project_management_api',
        message: 'Enter Project Management API Key',
        required: true
    });

    const answers = await inquirer.prompt(questions);

    addProject(answers.project_name, answers.project_api, answers.project_management_api)

}

async function promptForSelectProjects() {

    const questions = [];

    questions.push({
        type: 'list',
        name: 'export_project_name',
        message: 'Please choose a project to export FROM',
        choices: listProjects(),
        required: true
    });

    questions.push({
        type: 'list',
        name: 'import_project_name',
        message: 'Please choose a project to import TO',
        choices: listProjects(),
        required:true
    });

    const answers = await inquirer.prompt(questions);

    selectProjects(answers.import_project_name, answers.export_project_name)
}

async function promptForTemplate() {
    const defaultTemplate = 'export';

    const questions = [];

    questions.push({
        type: 'list',
        name: 'template',
        message: 'Please choose.',
        required: true,
        choices: [
            {
                value: "export",
                name: 'Export from a Kontent project'
            },
            {
                value: "import",
                name: 'Import to a kontent project'
            },
            {
                value: "sync",
                name: 'Sync from EXPORT to IMPORT'
            }
        ],

        default: defaultTemplate,
    });

    const answers = await inquirer.prompt(questions);
    let tools = []

    if (answers.template === "" || answers.template === "sync") {
        tools = await promptForTools(answers.template)
    }

    return {
        template:  answers.template,
        tools: tools,
    };
}

async function promptForTools(template) {
    const questions = [];

    questions.push({
        type: 'checkbox',
        name: 'tools',
        message: 'Please choose.',
        required: true,
        choices: [
            {
                value: "assets",
                name: 'Assets'
            },
            {
                value: "types",
                name: 'Content Types'
            },
            {
                value: "items",
                name: 'Content Items'
            },
            {
                value: "localisations",
                name: 'Localisations'
            },
            {
                value: "taxonomies",
                name: 'Taxonomies'
            },
            {
                value: "snippets",
                name: 'Snippets'
            },
        ],
    });



    const answers = await inquirer.prompt(questions);
    return answers.tools
}

export async function cli() {
    await makeExportsDirectory()

    await promptForSetup()

    try {
        await promptForSelectProjects()

    }catch(e) {
        console.error(chalk.red.bold(e))
        return
    }

    const options = await promptForTemplate();

    // console.log(options);

    await kontentSync(options)
}
