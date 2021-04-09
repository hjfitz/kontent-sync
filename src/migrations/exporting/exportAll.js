import { exportService } from '../../helpers/kontentClients';
import fs from "fs";
import { ZipService } from '@kentico/kontent-backup-manager';


export default async () => {
    const data = await exportService.exportAllAsync();

    // you can also save backup in file with ZipService
    const zipService = new ZipService({
        filename: 'exports/all.zip',
        context: 'node.js',
        enableLog: true
    });

    let buffer = await zipService.createZipAsync(data);


    await fs.writeFileSync('exports/all.zip', buffer)

}

