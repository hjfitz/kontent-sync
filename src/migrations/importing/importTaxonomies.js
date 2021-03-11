import {importClient as client} from "../../helpers/kontentClients";

import fs from 'fs';


export default async() => {

  const taxonomies = fs.readFileSync("exports/taxonomies.json")

  let count = 0;
  for (const contentType of taxonomies) {
    count += 1;

    try {
      console.log(
        `Uploading Taxonomy: ${contentType.name} ... Taxonomy: #${count}`
      );
      await client
      .addTaxonomy()
      .withData(contentType)
      .toPromise();

    } catch (err) {
      console.log(err);
      console.log(contentType);
      console.warn(err.message);
    }
  }
};

