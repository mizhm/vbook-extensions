load("config.js");

function execute(url) {
  let html = fetch(url).text();

  let regex =
    /self\.__next_f\.push\(\[1,"((?:(?!(?:static\/chunks|meta|\$Sreact|children|name|null)).)*?)"\]\)/;

  const content = html
    .match(regex)[1]
    .replace(/\\r/g, "")
    .replace(/\\n/g, "<br>")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");

  return Response.success(content);
}
