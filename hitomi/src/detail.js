load("config.js");
load("util.js");

function execute(url) {
  const regex = /-(\d+)\.html/;
  const id = url.match(regex)[1];

  const galleryInfoText = fetch(`${API_DOMAIN}/galleries/${id}.js`).text();

  const galleryinfo = processGalleryInfo(galleryInfoText);

  const file = galleryinfo.files[0];
  const hash = file.hash;
  const m1_path = hash.slice(-3, -1);
  const m2_path = hash.slice(-1);
  const path = `${m2_path}/${m1_path}/${hash}`;

  const dir = "avifsmallbigtn";
  const ext = "avif";

  const coverUrl = `https://atn.gold-usergeneratedcontent.net/${dir}/${path}.${ext}`;

  return Response.success({
    name: galleryinfo.title,
    cover: coverUrl,
    host: "https://hitomi.la",
    author: galleryinfo.artists.map((a) => a.artist).join(", "),
    detail: galleryinfo.tags
      .map(function (t) {
        if (t.female) {
          return `female: ${t.tag}`;
        } else if (t.male) {
          return `male: ${t.tag}`;
        } else {
          return `tag: ${t.tag}`;
        }
      })
      .join("<br>"),
    ongoing: false,
  });
}
