import {exportClient as client } from "../../helpers/kontentClients";
import fs from "fs";


export default async () => {

  const taxonomies = await client.listTaxonomies().toPromise();

  console.log(taxonomies.data.taxonomies.length, " taxonomies exported");

  fs.writeFileSync(
      `exports/taxonomies.json`,
      JSON.stringify(taxonomies.data.taxonomies, undefined, 2)
  );
};


