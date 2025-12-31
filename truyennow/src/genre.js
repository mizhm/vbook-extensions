load("config.js");

function execute() {
  const html = fetch(BASE_URL).html();
  const list = html.select(".genre-dropdown a").map((e) => {
    return {
      title: e.text(),
      input: BASE_URL + e.attr("href"),
      script: "gen.js",
    };
  });
  return Response.success(list);
}
