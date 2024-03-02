const textParser = require("./Parsers/TextParser");
const mediaParser = require("./Parsers/MediaParser");
const listParser = require("./Parsers/ListParser");
const utils = require("./Parsers/Utils");

const Ornement = (text) => {
  return text
    .replace(textParser.text_tag_regex, (allLine, content) => {
      return textParser.generateHtmlTextFromLine(allLine, content);
    })
    .replace(mediaParser.media_tag_regex, (allLine, content) => {
      return mediaParser.generateHtmlMediaFromLine(allLine);
    })
    .replace(listParser.list_tag_regex, (allLine, content) => {
      return listParser.generateHtmlListFromLine(allLine, content);
    });
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
# test[T{style:"sup",  highlight-color:"#00FF00", font-style:"i"}]2[/T];
# test3;
[/L]
`;

console.log(Ornement(coolMessage));
