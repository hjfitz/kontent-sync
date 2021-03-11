import { exportClient as client } from '../../helpers/kontentClients';
import fs from 'fs';

export default async () => {
    const languages = await client.listLanguages().toPromise();

    fs.writeFileSync(
        `exports/languages.json`,
        JSON.stringify(languages.data.items, undefined, 2)
    );
};
