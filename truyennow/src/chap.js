load("config.js");

function execute(url) {
  const html = fetch(url).html();
  const content = html
    .select("#chapterContent")
    .html()
    .replace(/\n/gm, "<br>")
    .replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
    .replace(/(<br\s*\/?>( )?){2,}/g, "<br>")
    .replace(/<img[^>]*>/gi, "")
    .replace(/<\/?p[^>]*>/gi, "");
  return Response.success(content);
}
