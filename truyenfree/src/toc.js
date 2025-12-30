load("config.js");

function execute(url) {
  const html = fetch(url).html();
  const coverUrl = html.select("meta[property='og:image']").attr("content");
  const bookId = coverUrl.match(/\/cover\/([a-z0-9]+)\.jpg/)[1];

  const text = fetch(url, {
    headers: {
      Accept: "text/x-component",
      "Next-Action": "7fe3b0f3dabdb9f72db26b5237fd9755b6a8b6fdad",
    },
    body: `[{"bookId":"${bookId}","page":1,"limit":1000000000,"isNewest":false}]`,
    method: "POST",
  }).text();
  const lines = text.split("\n");

  let resultData = null;

  lines.forEach((line) => {
    if (line.startsWith("1:")) {
      const jsonString = line.substring(2);
      try {
        resultData = JSON.parse(jsonString);
      } catch (e) {
        console.error("Lỗi parse dòng này:", e);
      }
    }
  });

  const list = resultData.data.map((chap) => {
    return {
      name: chap.name,
      url: url + chap.slugId,
      host: BASE_URL,
    };
  });

  return Response.success(list);
}
