import { getAttributesArray, colon_separator_regex } from "./Utils.js"
import { text_tag_regex,generateHtmlTextFromLine } from "./TextParser.js";
import { media_tag_regex, generateHtmlMediaFromLine } from "./MediaParser.js";
import { code_tag_regex, generateHtmlCodeFromLine } from "./CodeParser.js";

const list_tag_regex = /\[L\{.*}][\n\r]([\s\S]+?)[\n\r]\[\/L\]/g;
const items_in_content = /#\s*([\s\S]+?)(?<!&lt|&gt);/g;

function getItemsList(content) {
    let li_list = "";
    let match;

    while ((match = items_in_content.exec(content)) !== null) {
      var text_parsed = match[1].trim()
      .replace(text_tag_regex, (allLine, content) => {
        return generateHtmlTextFromLine(allLine, content);
      })
      .replace(media_tag_regex, (allLine, content) => {
        return generateHtmlMediaFromLine(allLine);
      })
	  .replace(code_tag_regex, (_, content) => {
        return generateHtmlCodeFromLine(content);
      });
      console.log(text_parsed);
      li_list += "<li>"+text_parsed+"</li>";
    }

    return li_list;
}

const generateHtmlListFromLine = (allLine, content) => {
  let tags;
  let type = "";
  let items = getItemsList(content);

  // getting all attributes for a line
  let attributes = getAttributesArray(allLine);

  // settings to set HTML code
  for (var i = 0; i < attributes.length; i++) {
    var [attribute, attribute_value] = attributes[i].split(colon_separator_regex);

    if (attribute === "type") {
      type = attribute_value.replace(/"/g, '');
    }
  }

  // choosing the list type
  console.log("type : "+type);
  if (type === "b") {
    tags = `<ul>${items}</ul>`;
  } else if (type === "n"){
    tags = `<ol>${items}</ol>`;
  } else {
    tags = `<ul>${items}</ul>`;
  }

   return tags;
};

export { list_tag_regex, generateHtmlListFromLine };