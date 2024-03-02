const parser = require("./Parser")

const Ornement = (text) => {
  return text.replace(parser.text_tag_regex, (allLine, content) => {
    console.log("all : "+content);
    let tag_containing_content = "<span {}>";
    let closing_tag_containing_content = "</span>"

    let styleAttribute = "";
    let link =  "";
    let colorAttribute = "";
    let highlightAttribute = "";

    // getting all attributes for a line
    let attributes = parser.getAttributesArray(allLine);

    console.log(attributes);
    // settings vers to set html code
    for(var i = 0; i < attributes.length; i++) {
      var [attribute, attribute_value] = attributes[i].split(parser.colon_separator_regex);

      if (attribute === "font-style"){
        console.log("font-style");
        styleAttribute = parser.parseFontStyles(attribute_value);
      } else if (attribute === "link") {
        console.log("link");
        link = attribute_value.replace(/"/g, '');
      } else if (attribute === "color") {
        colorAttribute = attributes[i].replace(/"/g, '');
      } else if (attribute === "highlight-color") {
        highlightAttribute = "background-color: "+attribute_value.replace(/"/g, '');
      } else if (attribute === "style") {
        [tag_containing_content, closing_tag_containing_content] = parser.getTagContainingContent(attribute_value.replace(/"/g, ''));
      }
    }

    const linkAttribute = link ? `<a href="${link}">` : '';
    const closingTag = link ? '</a>' : '';

    let result = "";

    // adding style attribute to the tag containing the content
    result = tag_containing_content.replace("{}", `style="${styleAttribute}${colorAttribute}${highlightAttribute}"`)+ content + closing_tag_containing_content;
    
    if (link){
      // surrounding he tag containing the content with a tag, with href set
      result = linkAttribute + result + closingTag;
    }
    return result;
  });
};

const coolMessage = `
[T{font-style:"sui", link:"https://www.google.com/", color:"#FF0000"}] To all of my friends:
[T{link:"https://www.google.com/",  color:"#00FF00", font-style:"sui" }] To all of my friends:
[T{link:"https://www.google.com/",  highlight-color:"#00FF00"}] To all of my friends:
[T{style:"t2",  highlight-color:"#00FF00", font-style:"i"}] To all of my friends:
**Live long and prosper!!!**
`;

console.log(Ornement(coolMessage));
