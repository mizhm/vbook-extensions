load("config.js");

function execute(url) {
  let html = fetch(url).text();

  let regex = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;

  let match;
  let content = "";

  while ((match = regex.exec(html)) !== null) {
    let temp = match[1];
    if (
      !temp.includes("static/chunks") &&
      !temp.includes("meta") &&
      !temp.includes("$Sreact") &&
      !temp.includes("children")
    ) {
      content = temp;
      break;
    }
  }

  if (content) {
    content = content
      .replace(/\\n/g, "<br>")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }

  return Response.success(content);
}
