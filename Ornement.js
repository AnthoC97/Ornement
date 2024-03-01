const Ornement = (text) => {
  return text.replace(/^\[T(\{font-style:"([buis]+)"\})\] (.*$)/gim, (_, style, fontStyles, content) => {
    let styleAttribute = '';
    let textDecoration = '';

    if (fontStyles.includes('b')) {
      styleAttribute += 'font-weight: bold;';
    }
    if (fontStyles.includes('i')) {
      styleAttribute += 'font-style: italic;';
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
    return `<h1 style="${styleAttribute}${textDecoration.trim()}">${content}</h1>`;
  });
};

const coolMessage = `
[T{font-style:"sui"}] To all of my friends:
**Live long and prosper!!!**
`;

console.log(Ornement(coolMessage));
