import { getAttributesArray, colon_separator_regex } from "./Utils.js"

const text_tag_regex = /\[T{.*}]\s*(.*)\[\/T]/gim;

function parseFontStyles(fontStyles) {
    let fontStyleAttributes = '';
    let textDecoration = '';

    if (fontStyles.includes('b')) {
      fontStyleAttributes += 'font-weight: bold;';
    }
    if (fontStyles.includes('i')) {
      fontStyleAttributes += 'font-style: italic;';
    }
    if (fontStyles.includes('s')) {
      if (textDecoration === '') {
          textDecoration = 'text-decoration: line-through {};';
      } else {
        textDecoration = textDecoration.replace(" {}", " line-through {}");
      }
    }
    if (fontStyles.includes('u')) {
      if (textDecoration === '') {
          textDecoration = 'text-decoration: underline {};';
      } else {
        textDecoration = textDecoration.replace(" {}", " underline {}");
      }
    }

    textDecoration = textDecoration.replace(" {}", "");
    fontStyleAttributes += textDecoration;

    return fontStyleAttributes;
}

function getTagContainingContent(style) {
  switch (style) {
    case "t1":
      return ["<h1 {}>", "</h1>"];
    case "t2":
      return ["<h2 {}>", "</h2>"];
    case "t3":
      return ["<h3 {}>", "</h3>"];
    case "t4":
      return ["<h4 {}>", "</h4>"];
    case "t5":
      return ["<h5 {}>", "</h5>"];
    case "t6":
      return ["<h6 {}>", "</h6>"];
    case "sup":
      return ["<sup {}>", "</sup>"];
    case "sub":
      return ["<sub {}>", "</sub>"];
    default:
      return ["<span {}>", "</span>"]; 
  }
}

const generateHtmlTextFromLine = (allLine, content) => {
  let tagContainingContent = "<span {}>";
  let closingTagContainingContent = "</span>";

  let styleAttribute = "";
  let link = "";
  let colorAttribute = "";
  let highlightAttribute = "";

  // getting all attributes for a line
  let attributes = getAttributesArray(allLine);

  // settings to set HTML code
  for (var i = 0; i < attributes.length; i++) {
    var [attribute, attribute_value] = attributes[i].split(colon_separator_regex);

    if (attribute === "font-style") {
      styleAttribute = parseFontStyles(attribute_value);
    } else if (attribute === "link") {
      link = attribute_value.replace(/"/g, '');
    } else if (attribute === "color") {
      colorAttribute = `color: ${attribute_value.replace(/"/g, '')};`;
    } else if (attribute === "highlight-color") {
      highlightAttribute = `background-color: ${attribute_value.replace(/"/g, '')};`;
    } else if (attribute === "style") {
      [tagContainingContent, closingTagContainingContent] = getTagContainingContent(attribute_value.replace(/"/g, ''));
    }
  }

  const linkAttribute = link ? `<a href="${link}">` : '';
  const closingTag = link ? '</a>' : '';

  let result = "";

  // adding style attribute to the tag containing the content
  result = tagContainingContent.replace("{}", `style="${styleAttribute}${colorAttribute}${highlightAttribute}"`) + content + closingTagContainingContent;

  if (link) {
    // surrounding the tag containing the content with a tag, with href set
    result = linkAttribute + result + closingTag;
  }
  return result;
};

export { text_tag_regex, generateHtmlTextFromLine };