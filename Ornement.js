const Ornement = (text) => {
  return text.replace(/^\[T(\{font-style:"([buis]+)"\})\] (.*$)/gim, (_, style, fontStyles, content) => {
    let styleAttribute = '';

    for (const char of fontStyles) {
      switch (char) {
        case 'b':
          styleAttribute += 'font-weight: bold;';
          break;
        case 'i':
          styleAttribute += 'font-style: italic;';
          break;
        case 's':
          styleAttribute += 'text-decoration: line-through;';
          break;
        case 'u':
          styleAttribute += 'text-decoration: underline;';
          break;
        // Add more cases if needed for other styles
      }
    }

    return `<h1 style="${styleAttribute}">${content}</h1>`;
  });
};

const coolMessage = `
[T{font-style:"ui"}] To all of my friends:
**Live long and prosper!!!**
`;

console.log(Ornement(coolMessage));