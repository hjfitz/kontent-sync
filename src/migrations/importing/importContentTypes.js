import {importClient as client} from "../../helpers/kontentClients";

import {
  ContentTypeSnippetElementsBuilder,
  ContentTypeElementsBuilder,
  ContentTypeModels,
  ElementModels,
  TaxonomyModels

} from "@kentico/kontent-management";
import fs from 'fs';



export default async () => {
  const contentTypes = fs.readFileSync("exports/contentTypes.json")

  let count = 0;
  for (const contentType of contentTypes) {
    count += 1;

    // IF SNIPPET OR IF TAXONOMY THEN GOTTA MAP TO TAXONOMY GROUP, CODENAME, etc
    const elements = contentType.elements.map(element => {

      const field = {
        ...element
      };

      console.log(element.type);

      switch (element.type) {
        case "snippet": return {
          ...field,
          snippet: {
            codename: element.codename
          }
        };
        break;
        case "taxonomy": return {
          ...field,
          taxonomy_group: {
            codename: element.codename
          }
        };
        break;
        default: return {
          ...field,
          name: element.name
        };
      }

    });

    const contentTypeBuild = ( builder ) => {
                return {
                    codename: contentType.codename,
                    elements,
                    name: contentType.name
                };
            };

    try {
      console.log(
        `Uploading Content Type: ${contentType.name} ... Content Type #${count}/ ${contentTypes.length}`
      );
      await client
      .addContentType()
      .withData(contentTypeBuild)
      .toPromise();

    } catch (err) {
      console.warn(err.message);
      console.warn(err.validationErrors[0]);
    }
  }
};
