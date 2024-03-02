const utils = require("./Utils");

const list_tag_regex = /\[L{.*}]\n(#\s*.+;\n)+\[\/L\]/gmis;
const items_in_content = /#\s*([^;]+);/g;

function getItemsList(content) {
    let li_list = "";
    let match;

    while ((match = items_in_content.exec(content)) !== null) {
      li_list += "<li>"+match[1].trim()+"</li>";
    }

    return li_list;
}


function getTagForMedia(url) {
    let media_type = ""
    const extension = url.split('.').pop().toLowerCase();

    // If the extension doesn't match any known types
    media_type = 'unknown';
    
    // Check for image types
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    if (imageExtensions.includes(extension)) {
        media_type = 'image';
    }

    // Check for audio (sound) types
    const audioExtensions = ['mp3', 'wav', 'ogg', 'aac'];
    if (audioExtensions.includes(extension)) {
        media_type = 'audio';
    }

    // Check for video types
    const videoExtensions = ['mp4', 'webm', 'avi', 'mkv'];
    if (videoExtensions.includes(extension)) {
        media_type = 'video';
    }

    switch (media_type) {
      case "image":
        return "<img src='{}'/>";
      case "video":
        return "<video src='{}' preload='none' controls/>";
      case "audio":
        return "<audio src='{}' preload='none' controls/>";
      default:
        return ""; 
  }
}

const generateHtmlListFromLine = (allLine, content) => {
  let tags;
  let type = "";
  let items = getItemsList(content);

  // getting all attributes for a line
  let attributes = utils.getAttributesArray(allLine);

  // settings to set HTML code
  for (var i = 0; i < attributes.length; i++) {
    var [attribute, attribute_value] = attributes[i].split(utils.colon_separator_regex);

    if (attribute === "type") {
      type = attribute_value.replace(/"/g, '');
    }
  }

  // choosing the list type
  console.log("type : "+type);
  if (type === "b") {
    tags = `<ul>${items}</ul>`;
  } else if (type === "n"){
    tags = `<ol>${items}</ol>`;
  } else {
    tags = `<ul>${items}</ul>`;
  }

   return tags;
};

module.exports = { list_tag_regex, generateHtmlListFromLine };