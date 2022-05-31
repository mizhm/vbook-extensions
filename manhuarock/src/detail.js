function execute(url) {
  const doc = Http.get(url).html();
  var coverImg = doc.select(".summary_image img").first().attr("src");
  if (coverImg.startsWith("//")) {
    coverImg = "https:" + coverImg;
  }
  return Response.success({
    name: doc.select(".post-title h1").first().text(),
    cover: coverImg,
    author: doc.select(".author-content a").first().text(),
    description: doc.select(".panel-story-description p").html(),
    detail: "",
    host: "https://manhuarock.net/",
    ongoing: doc.select(".post-status .summary-content").html().indexOf("Đang tiến hành") >= 0,
  });
}
