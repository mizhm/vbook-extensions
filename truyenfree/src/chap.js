load("config.js");

function execute(url) {
  let html = fetch(url).text();
  let regex = /self\.__next_f\.push\(\[1,"((?:\\.|[^"\\])*)"\]\)/g;

  let match;
  let content = "";
  let maxLength = 0;

  while ((match = regex.exec(html)) !== null) {
    let rawText = match[1];
    if (
      rawText.includes("static/") ||
      rawText.includes("null") ||
      rawText.includes('\\"$\\":') ||
      rawText.includes('\\"children\\":') ||
      /^\d+:\{/.test(rawText)
    ) {
      continue;
    }

    if (rawText.length > maxLength) {
      maxLength = rawText.length;
      content = rawText;
    }
  }

  if (content) {
    content = content
      .replace(/\\r/g, "")
      .replace(/\\t/g, "")
      .replace(/\\n/g, "<br>")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");

    if (/^\d+:T/.test(content)) {
      let firstComma = content.indexOf(",");
      if (firstComma !== -1 && firstComma < 20) {
        content = content.substring(firstComma + 1);
      }
    }
  }

  return Response.success(content);
}
