load("config.js");

function execute(url) {
  const data = fetch(`${url}&tab=小说`).json();
  const content = data.data.content.split("\n").join("<br>");
  return Response.success(content);
}
