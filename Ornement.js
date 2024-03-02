const parser = require("./Parsers/TextParser");
const utils = require("./Parsers/Utils");

const Ornement = (text) => {
  return text
    .replace(parser.text_tag_regex, (allLine, content) => {
      return parser.generateHtmlFromLine(allLine, content);
    });
};

const coolMessage = `
[T{font-style:"sui", link:"https://www.google.com/", color:"#FF0000"}] To all of my friends:[/T]
[T{link:"https://www.google.com/",  color:"#00FF00", font-style:"sui" }] To all of my friends:[/T]
[T{link:"https://www.google.com/",  highlight-color:"#00FF00"}] To all of my friends:[/T]
To all of my [T{style:"sup",  highlight-color:"#00FF00", font-style:"i"}]friends:[/T]
`;

console.log(Ornement(coolMessage));
