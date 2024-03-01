const parser = require("./Parser")

const Ornement = (text) => {
  return text.replace(/^\[T(\{font-style:"([buis]+)"\})\] (.*$)/gim, (_, style, fontStyles, content) => {
    const styleAttribute = parser.parseFontStyles(fontStyles);
    return `<h1 style="${styleAttribute}">${content}</h1>`;
  });
};

const coolMessage = `
[T{font-style:"sui"}] To all of my friends:
**Live long and prosper!!!**
`;

console.log(Ornement(coolMessage));
