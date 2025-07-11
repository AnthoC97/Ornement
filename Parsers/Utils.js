const attributes_regex = /(?<=\[[T|M|L]\{)\s*\w+-*\w+\s*:\s*"[^"]*"\s*(?=,)|(?<=,)\s*\w+-*\w+\s*:\s*"[^"]*"\s*(?=,)|(?<=\[[T|M|L]\{)\s*\w+-*\w+\s*:\s*"[^"]*"\s*(?=})|(?<=,)\s*\w+-*\w+\s*:\s*"[^"]*"\s*(?=})/gim
const colon_separator_regex = /(?<!https):(?!\/\/)/gm

function getAttributesArray(line) {
  let matches = [];
  let match;

  while ((match = attributes_regex.exec(line)) !== null) {
    matches.push(match[0].replace(/\s/g,''));
  }

  return matches;
}

export { colon_separator_regex, getAttributesArray };