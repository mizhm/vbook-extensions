load("config.js");

function execute(url) {
  const html = fetch(url).html();

  const genreList = [];
  html.select("ul.flex.flex-wrap a[href^='/danh-sach/']").forEach((e) => {
    genreList.push({
      title: e.text(),
      input: BASE_URL + e.attr("href"),
      script: "genrecontent.js",
    });
  });

  return Response.success({
    name: html.select("h1.font-bold").text(),
    cover: html.select("meta[property='og:image']").attr("content"),
    host: BASE_URL,
    author: html.select("a[href^='/tac-gia/']").text(),
    description: html.select("div.prose").html(),
    ongoing: !html.select("div.text-green-500").text().includes("Hoàn thành"),
    genres: genreList,
  });
}
