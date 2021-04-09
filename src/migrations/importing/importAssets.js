import { exportClient as client, importService } from '../../helpers/kontentClients';
import fs from "fs";


export default async () => {
    let exportZip = fs.readFileSync('exports/all.zip')

    let extractedZipFile = await zipService.extractZipAsync(exportZip)

    // console.log(JSON.stringify(extractedZipFile, undefined, 2))


    extractedZipFile.


    const importS = importService.importAssetsAsync(extractedZipFile)

    const folders = await client.listAssetFolders().toPromise();

    fs.writeFileSync(
        `exports/assetFolders.json`,
        JSON.stringify(folders.data.items, undefined, 2)
    );

    const assets = await client.listAssets().toPromise();

    fs.writeFileSync(
        `exports/assets.json`,
        JSON.stringify(assets.data.items, undefined, 2)
    );

}

