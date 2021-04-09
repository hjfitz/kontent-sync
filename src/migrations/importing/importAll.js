import {importService} from '../../helpers/kontentClients';

import fs from "fs";
import { ZipService } from '@kentico/kontent-backup-manager';


export default async () => {
    let exportZip = fs.readFileSync('exports/all.zip')

    // you can also save backup in file with ZipService
    const zipService = new ZipService({
        filename: 'exports/all.zip',
        context: 'node.js',
        enableLog: true
    });

    let extractedZipFile = await zipService.extractZipAsync(exportZip)

    // console.log(JSON.stringify(extractedZipFile, undefined, 2))

    const importS = importService.importAsync(extractedZipFile)

}
