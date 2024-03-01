const parser = require("./Parser")

const Ornement = (text) => {
  return text.replace(parser.text_tag_regex, (_, style, fontStyles, link, content) => {
    const styleAttribute = parser.parseFontStyles(fontStyles);
    const linkAttribute = link ? `<a href="${link}">` : '';
    const closingTag = link ? '</a>' : '';

    let tag_containing_content = "<h1 {}>";
    let closing_tag_containing_content = "</h1>"

    let result = "";

    if (style){
      // adding style attribute to the tag containing the content
      result = tag_containing_content.replace("{}", `style="${styleAttribute}"`)+ content + closing_tag_containing_content;
    } 
    if (link){
      // surrounding he tag containing the content with a tag, with href set
      result = linkAttribute + result + closingTag;
    }
    return result;
  });
};

const coolMessage = `
[T{font-style:"sui", link:"https://www.google.com/"}] To all of my friends:
**Live long and prosper!!!**
`;

console.log(Ornement(coolMessage));
