import { text_tag_regex, generateHtmlTextFromLine } from "./Parsers/TextParser.js";
import { media_tag_regex, generateHtmlMediaFromLine } from "./Parsers/MediaParser.js";
import { list_tag_regex, generateHtmlListFromLine } from "./Parsers/ListParser.js";
import { code_tag_regex, generateHtmlCodeFromLine } from "./Parsers/CodeParser.js";

function Ornement(text, targetId){
  const htmlTags = text
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

const coolMessage = `
[T{font-style:"sui", link:"https://www.google.com/", color:"#FF0000"}] To all of my friends:[/T]
[T{link:"https://www.google.com/",  color:"#00FF00", font-style:"sui" }] To all of my friends:[/T]
[T{link:"https://www.google.com/",  highlight-color:"#00FF00"}] To all of my friends:[/T]
To all of my [T{style:"sup",  highlight-color:"#00FF00", font-style:"i"}]friends:[/T]
[M{src:"test.jpg"}]Test[/M]
[M{src:"test.mkv"}]Test[/M]
[M{src:"test.ogg"}]Test[/M]
[L{type:"n"}]
# tetst;
# test[T{style:"sub",  highlight-color:"#00FF00", font-style:"i"}]2[/T];
# test3;
# [M{src:"test.ogg"}]Test[/M];
[/L]
[C]
# tetst;
  # test 2;
# test3;
[/C]
`;

console.log(Ornement(coolMessage));

export { Ornement }
