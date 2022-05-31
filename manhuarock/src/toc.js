function execute(url) {
  var doc = Http.get(url).html();

  var el = doc.select("ul.row-content-chapter li.a-h  a.chapter-name");
  const data = [];
  for (var i = el.size() - 1; i >= 0; i--) {
    var e = el.get(i);
    data.push({
      name: e.text(),
      url: `https://manhuarock.net/ajax/image/list/chap/${e.attr("data-chapter-id")}?mode=vertical&quality=high`,
      host: "https://manhuarock.net/",
    });
  }

  return Response.success(data);
}
