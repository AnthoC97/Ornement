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

function getAttributesArray(line) {
  let matches = [];
  let match;

  while ((match = attributes_regex.exec(line)) !== null) {
    matches.push(match[0].trim());
  }

  return matches;
}

module.exports = { text_tag_regex, colon_separator_regex, getAttributesArray, parseFontStyles };