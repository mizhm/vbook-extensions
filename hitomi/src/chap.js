load("config.js");
load("util.js");

function execute(url) {
  const idMatch = url.match(/reader\/(\d+)\.html/);
  if (!idMatch) {
    return Response.error(`Invalid URL: ${url}`);
  }
  const id = idMatch[1];

  const ggJs = fetch(`${API_DOMAIN}/gg.js`, {
    headers: {
      Pragma: "no-cache",
    },
  }).text();
  const { ggB, ggMSet } = parseGg(ggJs);

  if (!ggB || ggMSet.size === 0) {
    return Response.error("Failed to parse gg.js");
  }

  const galleryInfoText = fetch(`${API_DOMAIN}/galleries/${id}.js`).text();
  if (!galleryInfoText) {
    return Response.error("Failed to fetch gallery info");
  }

  const galleryinfo = processGalleryInfo(galleryInfoText);

  const imgs = [];

  galleryinfo.files.forEach(function (file) {
    const hash = file.hash;
    const hasavif = file.hasavif;

    const m1 = hash.slice(-3, -1);
    const m2 = hash.slice(-1);
    const g = parseInt(m2 + m1, 16);

    const subNum = ggMSet.has(g) ? 1 : 0;
    const subdomainNum = 1 + subNum;

    const prefix = hasavif ? "a" : "w";
    const extension = hasavif ? "avif" : "webp";
    const subdomain = prefix + subdomainNum;

    const pathComponent = g.toString();
    const path = ggB + pathComponent + "/" + hash;
    const imgUrl = `https://${subdomain}.gold-usergeneratedcontent.net/${path}.${extension}`;

    imgs.push(imgUrl);
  });

  return Response.success(imgs, {
    headers: {
      Referer: "https://hitomi.la/",
    },
  });
}
