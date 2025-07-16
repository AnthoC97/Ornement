import { text_tag_regex, generateHtmlTextFromLine } from "./Parsers/TextParser.js";
import { media_tag_regex, generateHtmlMediaFromLine } from "./Parsers/MediaParser.js";
import { list_tag_regex, generateHtmlListFromLine } from "./Parsers/ListParser.js";
import { code_tag_regex, generateHtmlCodeFromLine } from "./Parsers/CodeParser.js";


function Ornement(text){
  const escapedText = text
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");
  
  const htmlTags = escapedText
    .replace(list_tag_regex, (allLine, content) => {
      return generateHtmlListFromLine(allLine, content);
    })
    .replace(text_tag_regex, (allLine, content) => {
      return generateHtmlTextFromLine(allLine, content);
    })
    .replace(media_tag_regex, (allLine, _) => {
      return generateHtmlMediaFromLine(allLine);
    })
    .replace(code_tag_regex, (_, content) => {
      return generateHtmlCodeFromLine(content);
    });
    return htmlTags;
};

export { Ornement }
