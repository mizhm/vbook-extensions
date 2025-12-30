load("config.js");

function execute(url, page) {
  if (!page) page = 1;

  let html = fetch(url, {
    queries: { page: page.toString() },
  }).html();

  let total = parseInt(
    html.select("div.absolute span").first().text().replace("/", "").trim(),
    10
  );

  let next = page < total ? page + 1 : null;

  let list = html.select("div.flex-col.gap-5.w-full > div.w-full").map((e) => {
    return {
      name: e.select("span.line-clamp-2.font-semibold").text(),
      link: BASE_URL + e.select("a[href^=/truyen/]").first().attr("href"),
      host: BASE_URL,
      cover: e.select("img").first().attr("src"),
      description: e.select("span.line-clamp-2").first().text(),
    };
  });

  return Response.success(list, next);
}
