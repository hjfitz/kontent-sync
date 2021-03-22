import { exportClient as client } from '../../helpers/kontentClients';
import fs from 'fs';

export default async () => {
    const languages = await client.listLanguages().toPromise();

    console.log(languages.data.items.length , " languages exported");

    fs.writeFileSync(
        `exports/languages.json`,
        JSON.stringify(languages.data.items, undefined, 2)
    );
};
