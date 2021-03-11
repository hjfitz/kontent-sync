import fs from "fs";
import chalk from 'chalk';

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

export { selectProjects , addProject, removeProject, listProjects };
