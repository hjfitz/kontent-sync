import {exportClient as client } from "../../helpers/kontentClients";
import fs from "fs";


export default async () => {

  let contentTypes = await client.
    listContentTypes()
    .toPromise();

  let contentTypesItems = contentTypes.data.items;


  while (contentTypes.data.pagination.nextPage) {
    contentTypes = await client.
    listContentTypes()
    .xContinuationToken(contentTypes.data.pagination.continuationToken)
    .toPromise();


    contentTypesItems = contentTypesItems.concat(contentTypes.data.items);
  }

  console.log(contentTypesItems.length , " content types exported");



  fs.writeFileSync(
    `exports/contentTypes.json`,
    JSON.stringify(contentTypesItems, undefined, 2)
  );
};



