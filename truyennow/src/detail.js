load("config.js");

function execute(url) {
  const html = fetch(url).html();
  const detail = html.select(".story-detail-card");
  return Response.success({
    name: detail.select(".story-detail-title").text(),
    cover: BASE_URL + detail.select("img").first().attr("src"),
    host: BASE_URL,
    author: detail.select("a[href*='/tac-gia/']").text(),
    description: html.select(".description-content").text(),
    ongoing: detail.select(".badge-ongoing") != null,
    genres: detail.select("a[href*='/the-loai/']").map((e) => {
      return {
        title: e.text(),
        input: BASE_URL + e.attr("href"),
        script: "gen.js",
      };
    }),
    // suggests: html.select(".related-stories-section")[
    //   { title: "title", input: "input", script: "suggest.js" }
    // ],
  });
}
