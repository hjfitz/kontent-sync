import { importClient as client } from "../../helpers/kontentClients";
import * as fs from 'fs';


export default async () => {

    const languages = fs.readFileSync("exports/languages.json")

    let count = 0;
    for (const contentType of languages) {
        count += 1;

        try {
            console.log(
                `Uploading Language: ${contentType.name} ... Language: #${count}`
            );
            // console.log(contentType)
            await client
                .addLanguage()
                .withData({
                    ...contentType,
                    is_active: contentType.isActive,
                    is_default: contentType.isDefault,
                    fallback_language: contentType.fallbackLanguage
                })
                .toPromise();
        } catch (err) {
            console.log(err);
            console.log(contentType);
            console.warn(err.message);
        }
    }
};
