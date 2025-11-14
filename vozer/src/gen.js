load("config.js");

function execute(url, page) {
  if (!page) page = "1";

  const response = fetch(url, {
    headers: {
      "User-Agent": BASE_UA,
    },
    queries: {
      page: page,
    },
  });

  if (response.ok) {
    const doc = response.html();
    const list = [];
    let next = doc.select(".my-5 nav a").last().attr("href").match(/\d+$/);
    if (next != null) {
      next = next[0];
    }
    doc.select(".container .mb-3 .mx-auto .transform").forEach((e) => {
      list.push({
        name: e.select("a").first().text(),
        link: e.select("a").attr("href"),
        cover: e.select("img").attr("src") || e.select("img").attr("src"),
        description: e.select("p a").first().text(),
        host: BASE_URL,
      });
    });
    return Response.success(list, next);
  }
  return Response.error("Failed to fetch data");
}
