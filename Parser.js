
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

module.exports = { parseFontStyles };