load("config.js");

function execute() {
  const data = fetch(`${BASE_URL}/danh-sach`).html();
  console.log(data);
  const list = data[1].map((genre) => {
    return {
      title: genre.name,
      input: `${BASE_URL}/danh-sach?cate=${genre.slugId}`,
    };
  });

  return Response.success(list);
}
