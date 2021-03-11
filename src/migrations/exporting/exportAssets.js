import {exportClient as client } from "../../helpers/kontentClients";
import fs from "fs";


export default async () => {
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

