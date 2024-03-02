const attributes_regex = /(?<=\[T\{)\s*\w+-*\w+:"[^"]*"\s*(?=,)|(?<=,)\s*\w+-*\w+:"[^"]*"\s*(?=,)|(?<=\[T\{)\s*\w+-*\w+:"[^"]*"\s*(?=})|(?<=,)\s*\w+-*\w+:"[^"]*"\s*(?=})/gim

function getAttributesArray(line) {
  let matches = [];
  let match;

  while ((match = attributes_regex.exec(line)) !== null) {
    matches.push(match[0].trim());
  }

  return matches;
}

module.exports = { getAttributesArray };