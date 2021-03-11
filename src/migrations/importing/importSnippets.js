import {importClient as client} from "../../helpers/kontentClients";

import fs from 'fs';


export default async () => {

  const snippets = fs.readFileSync("exports/snippets.json")

  let count = 0;
  for (const contentType of snippets) {
    count += 1;

    const snippet = ( builder ) => {
                return {
                    codename: contentType.codename,
                    elements: contentType.elements,
                    name: contentType.name
                };
            };

    try {
      console.log(
        `Uploading Content Type Snippet: ${contentType.name} ... Content Type Snippet #${count}`
      );
      await client
      .addContentTypeSnippet()
      .withData(snippet)
      .toPromise();

    } catch (err) {
      console.log(err);
      console.log(snippet);
    }
  }
};

