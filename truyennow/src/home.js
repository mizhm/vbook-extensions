load("config.js");

function execute() {
  return Response.success([
    {
      title: "Truyện đề cử",
      input: `${BASE_URL}/danh-sach/de-cu`,
      script: "gen.js",
    },
    {
      title: "Mới cập nhật",
      input: `${BASE_URL}/danh-sach?sort=updated`,
      script: "gen.js",
    },
    {
      title: "Truyện full",
      input: `${BASE_URL}/danh-sach?status=completed`,
      script: "gen.js",
    },
  ]);
}
