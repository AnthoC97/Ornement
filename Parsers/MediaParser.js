import { getAttributesArray, colon_separator_regex } from "./Utils.js"

const media_tag_regex = /\[M{.*?}]\s*(.*?)\[\/M]/gim;

function getTagForMedia(url) {
    let media_type = ""
    const extension = url.split('.').pop().toLowerCase();

    // If the extension doesn't match any known types
    media_type = 'unknown';
    
    // Check for image types
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
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
        return "<video preload='none' controls/><source src='{}'></video>";
      case "audio":
        return "<audio preload='none' controls/><source src='{}'></audio>";
      default:
        return ""; 
  }
}

const generateHtmlMediaFromLine = (allLine) => {
  let mediaTag = ""
  let src = "";

  // getting all attributes for a line
  let attributes = getAttributesArray(allLine);

  // settings to set HTML code
  for (var i = 0; i < attributes.length; i++) {
    var [attribute, attribute_value] = attributes[i].split(colon_separator_regex);

    if (attribute === "src") {
      src = attribute_value.replace(/"/g, '');
    }
  }

  // adding style attribute to the tag containing the content
  if (src)
    mediaTag = getTagForMedia(src).replace("{}", src);

  return mediaTag;
};

export { media_tag_regex, generateHtmlMediaFromLine };