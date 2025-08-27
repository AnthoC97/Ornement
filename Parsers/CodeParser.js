const code_tag_regex = /\[C][\r\n]([\s\S]+?)[\r\n]\[\/C\]/;

const generateHtmlCodeFromLine = (content) => {
  let tags = `<pre>${content}</pre>`;

   return tags;
};

export { code_tag_regex, generateHtmlCodeFromLine };