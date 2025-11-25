load("config.js");

function execute(url) {
  const id = url.match(/\/page\/(\d+)/)[1];
  const data = fetch(
    `https://fanqienovel.com/api/reader/directory/detail?bookId=${id}`
  ).json().data;
  const list = [];

  data.chapterListWithVolume.forEach((volume) => {
    volume.forEach((chapter) => {
      list.push({
        name: chapter.title,
        url: `${API_URL}/content?item_id=${chapter.itemId}`,
        host: BASE_URL,
      });
    });
  });

  return Response.success(list);
}
