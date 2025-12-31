load("config.js");

function execute(url) {
  const html = fetch(url).html();
  const list = html.select(".chapter-item").map((e) => {
    return {
      name: e.select(".chapter-title-text").text(),
      url: BASE_URL + e.attr("href"),
      host: BASE_URL,
    };
  });
  return Response.success(list);
}
