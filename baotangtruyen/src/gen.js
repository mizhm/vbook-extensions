function execute(url, page) {
  if (!page) page = "1";
  const doc = fetch(url, {
      method: "GET",
      queries: {
          page: page
      }
  }).html();
  Console.log(doc)

  var next = doc.select(".pagination").select("li.active + li").text();

  const el = doc.select(".items .item");

  const data = [];
  for (var i = 0; i < el.size(); i++) {
    var e = el.get(i);
    var coverImg = e.select(".image img").first().attr("data-src");
    if (coverImg.startsWith("//")) {
      coverImg = "https:" + coverImg;
    }
    data.push({
      name: e.select("h3 a").first().text(),
      link: e.select("h3 a").first().attr("href"),
      cover: coverImg,
      description: e.select(".chapter a").first().text(),
      host: "https://baotangtruyenmoi.com",
    });
  }

  return Response.success(data, next);
}
