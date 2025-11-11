load("config.js");

function execute(url) {
  const regex = /-(\d+)\.html/;
  const id = url.match(regex)[1];
  return Response.success([
    { name: "Chap 1", url: `${BASE_URL}/reader/${id}.html`, host: BASE_URL },
  ]);
}
