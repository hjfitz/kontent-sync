import { ManagementClient } from "@kentico/kontent-management";

import { kontentSetup } from "./setupConfig";

interface Environment {
    IMPORT?: {
        projectId: string;
        apiKey: string;
    };
    EXPORT?: {
        projectId: string;
        apiKey: string;
    };
}

let environment: Environment = {};

try {
    environment = require("../../.environments.json");
} catch {
    console.log("Set up Kontent Config before continuing");
    kontentSetup();
}

let importClient = new ManagementClient({
    projectId: "Not Set",
    apiKey: "Not Set"
});
let exportClient = new ManagementClient({
    projectId: "Not Set",
    apiKey: "Not Set"
});

if (environment.EXPORT) {
    exportClient = new ManagementClient({
        projectId: environment.EXPORT.projectId,
        apiKey: environment.EXPORT.apiKey
    });
}
if (environment.IMPORT) {
    importClient = new ManagementClient({
        projectId: environment.IMPORT.projectId,
        apiKey: environment.IMPORT.apiKey
    });
}

export {exportClient, importClient};
