const utils = require("./Utils");
const textParser = require("./TextParser");
const mediaParser = require("./MediaParser");

const list_tag_regex = /\[L{.*}]\n(#\s*.+;\n)+\[\/L\]/gmis;
const items_in_content = /#\s*([^;]+);/g;

function getItemsList(content) {
    let li_list = "";
    let match;

    while ((match = items_in_content.exec(content)) !== null) {
      var text_parsed = match[1].trim()
      .replace(textParser.text_tag_regex, (allLine, content) => {
        return textParser.generateHtmlTextFromLine(allLine, content);
      })
      .replace(mediaParser.media_tag_regex, (allLine, content) => {
        return mediaParser.generateHtmlMediaFromLine(allLine);
      })
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
  let attributes = utils.getAttributesArray(allLine);

  // settings to set HTML code
  for (var i = 0; i < attributes.length; i++) {
    var [attribute, attribute_value] = attributes[i].split(utils.colon_separator_regex);

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

module.exports = { list_tag_regex, generateHtmlListFromLine };