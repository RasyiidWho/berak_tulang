export function trimText(text, length) {
	if (text.length > length) {
	  return text.substring(0, length) + "...";
	}
	return text;
  }

export function trimTextAfterWord(str, word) {
    const index = str.indexOf(word);
    if (index === -1) {
      return str;
    } else {
      const trimmed = str.slice(0, index + word.length);
      return trimmed;
    }
  }