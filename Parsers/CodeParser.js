const code_tag_regex = /\[C]\n(.+)\n\[\/C\]/gms;

const generateHtmlCodeFromLine = (content) => {
  let tags = `<pre>${content}</pre>`;

   return tags;
};

module.exports = { code_tag_regex, generateHtmlCodeFromLine };