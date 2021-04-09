import chalk from 'chalk';

import exportSnippets from './migrations/exporting/exportSnippets'

import importLocalisations from './migrations/importing/importLocalisations'
import exportTaxonomies from './migrations/exporting/exportTaxonomies';
import exportContentTypes from './migrations/exporting/exportContentTypes';
import exportLocalisations from './migrations/exporting/exportLocalisations';
import importContentTypes from './migrations/importing/importContentTypes';
import importSnippets from './migrations/importing/importSnippets';
import importTaxonomies from './migrations/importing/importTaxonomies';
import exportAll from './migrations/exporting/exportAll';
import importAll from './migrations/importing/importAll';


export default async (options) => {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    switch(options.template) {
        case "export": {

            console.log('%s ...', chalk.green.bold("Exporting all"));
            await exportAll()
            // for (const tool of options.tools) {
            //     switch (tool) {
            //         case "types":
            //             console.log('%s ...', chalk.green.bold("Exporting content types"));
            //             await exportContentTypes()
            //             break
            //         case "assets":
            //             console.log('%s ...', chalk.green.bold("Exporting " + tool));
            //             await exportAssets()
            //             break
            //         case "localisations":
            //             console.log('%s ...', chalk.green.bold("Exporting localisations"));
            //             await exportLocalisations()
            //             break
            //         case "taxonomies":
            //             console.log('%s ...', chalk.green.bold("Exporting taxonomies"));
            //             await exportTaxonomies()
            //             break
            //         case "snippets":
            //             console.log('%s ...', chalk.green.bold("Exporting snippets"));
            //             await exportSnippets()
            //             break
            //     }
            // }
            break
        }
        case "import": {
            console.log('%s ...', chalk.green.bold("Exporting all"));
            await importAll()
            // for (const tool of options.tools) {
            //     switch (tool) {
            //         case "types":
            //             console.log('%s ...', chalk.green.bold("Importing content types" ));
            //             await importContentTypes()
            //             break
            //         case "assets":
            //             console.log('%s ...', chalk.green.bold("Importing " + tool));
            //             await importLocalisations()
            //             break
            //         case "localisations":
            //             console.log('%s ...', chalk.green.bold("Importing " + tool));
            //             await importLocalisations()
            //             break
            //         case "taxonomies":
            //             console.log('%s ...', chalk.green.bold("Importing" + tool));
            //             await importTaxonomies()
            //             break
            //         case "snippets":
            //             console.log('%s ...', chalk.green.bold("Importing " + tool));
            //             await importSnippets()
            //             break
            //     }
            // }
            // break
        }
    }

    console.log('%s Complete', chalk.green.bold( options.template.toUpperCase()));
    return true;
}
