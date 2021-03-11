import fs from "fs";
import chalk from 'chalk';

const readline = require("readline-sync");

const selectProjects = (importProject, exportProject) => {

    let kontent_config = {};
    try {
        const kontent_environments = require("../../.environments.json");
        kontent_config = { ...kontent_environments };
    } catch {}

    kontent_config["IMPORT"] = kontent_config[importProject]
    kontent_config["EXPORT"] = kontent_config[exportProject]

    fs.writeFileSync(
        ".environments.json",
        JSON.stringify(kontent_config, undefined, 2)
    );

}

const addProject = (projectName, projectDelivery, projectManagement) => {

    let name = projectName.toUpperCase().replace(/ /g,"_")

    console.log("%s", chalk.yellow.bold("Adding ", name));

    let kontent_config = {};
    try {
        const kontent_environments = require("../../.environments.json");
        kontent_config = { ...kontent_environments };
    } catch {}

    if (kontent_config[name]) {
        console.log(kontent_config["EXPORT"]);
        console.log(chalk.red.bold("Overriding..."))
    }

    kontent_config[name] = {
        projectId: projectDelivery,
        apiKey: projectManagement
    }

    fs.writeFileSync(
        ".environments.json",
        JSON.stringify(kontent_config, undefined, 2)
    );
}

const removeProject = (projectName) => {
    let kontent_config = {};
    try {
        const kontent_environments = require("../../.environments.json");
        kontent_config = { ...kontent_environments };
    } catch {}

    delete kontent_config[projectName]

}

const listProjects = () => {
    let kontent_config = {};
    try {
        const kontent_environments = require("../../.environments.json");
        kontent_config = { ...kontent_environments };
    } catch {
        fs.writeFileSync(
            ".environments.json",
            JSON.stringify(kontent_config, undefined, 2)
        );

    }

    let projects = Object.keys( kontent_config).filter(key => {
        return !(key==="IMPORT" || key ==="EXPORT")
    })

    if (projects.length <= 1){
        throw "Please add at least two projects first! "
    }

    return projects
}

const kontentSetup = () => {
    console.log("");
    console.log(`Running Kontent setup...`);
    console.log("");

    let kontent_config = {};
    try {
        const kontent_environments = require("../../.environments.json");
        kontent_config = { ...kontent_environments };
    } catch {}

    if (kontent_config["EXPORT"]) {
        console.log(kontent_config["EXPORT"]);

        const continue_input = readline.question(
            "This will overwrite Kontent config, continue? (y/n): "
        );

        if (continue_input === "n") {
            console.log("Skipped Kontent Setup...");
            return;
        }
    }

    if (kontent_config["IMPORT"]) {
        console.log(kontent_config["IMPORT"]);

        const continue_input = readline.question(
            "This will overwrite Kontent config, continue? (y/n): "
        );

        if (continue_input === "n") {
            console.log("Skipped Kontent Setup...");
            return;
        }
    }

    console.log("");
    console.log("Setup for Kontent project export");
    console.log("");

    let projectId = readline.question("Enter Kontent Project ID: ");
    let apiKey = readline.question("Enter Kontent Management token: ");

    kontent_config["EXPORT"] = {
        projectId,
        apiKey
    };

    console.log("");
    console.log("Setup for Kontent project import");
    console.log("");

    projectId = readline.question("Enter Kontent Project ID: ");
    apiKey = readline.question("Enter Kontent Management token: ");

    kontent_config["IMPORT"] = {
        projectId,
        apiKey
    };

    fs.writeFileSync(
        ".environments.json",
        JSON.stringify(kontent_config, undefined, 2)
    );

    console.log("Kontent Setup complete");
};

export { selectProjects ,kontentSetup, addProject, removeProject, listProjects };
