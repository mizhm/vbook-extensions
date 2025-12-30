load("config.js");

function execute() {
  return Response.success([
    {
      title: "BTV đề cử",
      input: `${BASE_URL}/danh-sach/truyen-chon-loc`,
      script: "genrecontent.js",
    },
    {
      title: "Mới Hoàn Thành",
      input: `${BASE_URL}/danh-sach/truyen-full`,
      script: "genrecontent.js",
    },
    {
      title: "VỪA LÊN CHƯƠNG",
      input: `${BASE_URL}/danh-sach/truyen-moi`,
      script: "genrecontent.js",
    },
    {
      title: "TOP yêu thích",
      input: `${BASE_URL}/xep-hang/yeu-thich`,
      script: "homecontent.js",
    },
    {
      title: "Đọc nhiều tuần",
      input: `${BASE_URL}/xep-hang/luot-doc`,
      script: "homecontent.js",
    },
  ]);
}
