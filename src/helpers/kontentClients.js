import { ManagementClient } from "@kentico/kontent-management";
import { ExportService, ImportService } from '@kentico/kontent-backup-manager';


let environment = {};

try {
    environment = require("../../.environments.json");
} catch {
    console.log("Set up Kontent Config before continuing");
}
let exportService = new ExportService({
    apiKey: 'sourceProjectApiKey',
    projectId: 'sourceProjectId',
    exportFilter: undefined,
    onExport: item => {
        // called when any content is exported
        console.log(`Exported: ${item.title} | ${item.type}`);
    }
});

let importService= new ImportService({
    apiKey: 'sourceProjectApiKey',
    projectId: 'sourceProjectId',
    exportFilter: undefined,
    onImport: item => {
        // called when any content is exported
        console.log(`Imported: ${item.title} | ${item.type}`);
    }
});

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

    exportService = new ExportService({
        projectId: environment.EXPORT.projectId,
        apiKey: environment.EXPORT.apiKey,
        exportFilter: undefined,
        onExport: item => {
            // called when any content is exported
            console.log(`Exported: ${item.title} | ${item.type}`);
        }
    });
}
if (environment.IMPORT) {
    importClient = new ManagementClient({
        projectId: environment.IMPORT.projectId,
        apiKey: environment.IMPORT.apiKey
    });

    importService = new ImportService({
        projectId: environment.IMPORT.projectId,
        apiKey: environment.IMPORT.apiKey,
        importFilter: undefined,
        onImport: item => {
            // called when any content is exported
            console.log(`Imported: ${item.title} | ${item.type}`);
        }
    });
}

export {exportClient, exportService, importService,  importClient};
