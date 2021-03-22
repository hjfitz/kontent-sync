import {exportClient as client } from "../../helpers/kontentClients";
import fs from "fs";


export default async () => {
  const contentSnippets = await client.listContentTypeSnippets().toPromise();

  console.log(contentSnippets.data.items.length , " snippets exported");

  fs.writeFileSync(
    `exports/snippets.json`,
    JSON.stringify(contentSnippets.data.items, undefined, 2)
  );
};


