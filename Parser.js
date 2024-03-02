const text_tag_regex = /\[T.*]\s*(.*$)/gim;
const attributes_regex = /(?<=\[T\{)\s*\w+-*\w+:"[^"]*"\s*(?=,)|(?<=,)\s*\w+-*\w+:"[^"]*"\s*(?=,)|(?<=\[T\{)\s*\w+-*\w+:"[^"]*"\s*(?=})|(?<=,)\s*\w+-*\w+:"[^"]*"\s*(?=})/gim
const colon_separator_regex = /(?<!https):(?!\/\/)/gm

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

function getAttributesArray(line) {
  let matches = [];
  let match;

  while ((match = attributes_regex.exec(line)) !== null) {
    matches.push(match[0].trim());
  }

  return matches;
}

module.exports = { text_tag_regex, colon_separator_regex, getAttributesArray, getTagContainingContent, parseFontStyles };