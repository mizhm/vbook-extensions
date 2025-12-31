load("config.js");
function execute(url) {
  let data = [];
  let doc = fetch(url, {
    headers: {
      "User-Agent": BASE_UA,
    },
  }).html();

  const numberOfChaps = doc.toString().match(/"numberOfPages"\s*:\s*(\d+)/)[1];
  const lastNumber = Math.ceil(parseInt(numberOfChaps, 10) / 50);
  for (let i = 1; i <= lastNumber; i++) {
    data.push(url + "?pagechap=" + i);
  }
  return Response.success(data);
}
