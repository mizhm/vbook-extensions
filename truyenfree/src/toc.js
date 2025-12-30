load("config.js");

function execute(url) {
  let html = fetch(url).html();
  let coverUrl = html.select("meta[property='og:image']").attr("content");
  let bookId = coverUrl.match(/\/cover\/([a-z0-9]+)\.jpg/)[1];

  let text = fetch(url, {
    headers: {
      Accept: "text/x-component",
      "Next-Action": "7fe3b0f3dabdb9f72db26b5237fd9755b6a8b6fdad",
    },
    body: `[{"bookId":"${bookId}","page":1,"limit":1000000000,"isNewest":false}]`,
    method: "POST",
  }).text();
  let lines = text.split("\n");

  let resultData = null;

  lines.forEach((line) => {
    if (line.startsWith("1:")) {
      let jsonString = line.substring(2);
      try {
        resultData = JSON.parse(jsonString);
      } catch (e) {
        console.error("Lỗi parse dòng này:", e);
      }
    }
  });

  let list = resultData.data.map((chap) => {
    return {
      name: chap.name,
      url: url + chap.slugId,
      host: BASE_URL,
    };
  });

  return Response.success(list);
}
