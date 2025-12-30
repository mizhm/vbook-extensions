load("config.js");

function execute() {
  let text = fetch(`${BASE_URL}/danh-sach`, {
    headers: {
      "Next-Action": "7fc28d2e8b0a28e4d0bff175670927a84b049b31c5",
    },
    body: "[]",
    method: "POST",
  }).text();

  let lines = text.split("\n");

  let resultData = null;

  lines.forEach((line) => {
    if (line.startsWith("1:")) {
      let jsonString = line.substring(2);
      resultData = JSON.parse(jsonString);
    }
  });

  let list = resultData.map((genre) => {
    return {
      title: genre.name,
      input: `${BASE_URL}/danh-sach?cate=${genre.slugId}`,
    };
  });

  return Response.success(list);
}
