load("config.js");

function parseNozomiBinaryArrayBuffer(binaryString) {
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i) & 0xff;
  }

  const ids = [];
  const dv = new DataView(bytes.buffer);

  for (let i = 0; i < bytes.length / 4; i++) {
    ids.push(dv.getUint32(i * 4, false));
  }

  return ids;
}

function getTotalItems(headers) {
  const rangeHeader = headers["content-range"];
  if (rangeHeader) {
    const totalSize = rangeHeader.split("/")[1];
    if (totalSize) {
      return parseInt(totalSize, 10) / 4;
    }
  }
  return 0;
}

function execute(url, page) {
  if (!page) page = 1;

  const galleries_per_page = 25;

  const start_byte = (page - 1) * galleries_per_page * 4;
  const end_byte = start_byte + galleries_per_page * 4 - 1;
  const res = fetch(API_DOMAIN + "/index-all.nozomi", {
    headers: {
      Range: "bytes=" + start_byte.toString() + "-" + end_byte.toString(),
    },
  });

  if (!res.ok) {
    return Response.error("Failed to fetch nozomi: " + res.status);
  }

  const binaryString = res.text("latin1");
  const ids = parseNozomiBinaryArrayBuffer(binaryString);

  const totalItems = getTotalItems(res.headers);
  const totalPages = Math.ceil(totalItems / galleries_per_page);
  const next = page < totalPages ? page + 1 : null;

  const galleryBlocks = [];

  ids.forEach(function (id) {
    const blockUrl = `${API_DOMAIN}/galleryblock/${id}.html`;
    const blockRes = fetch(blockUrl, {
      headers: {
        Referer: BASE_URL,
      },
    });
    if (blockRes.ok) {
      const htmlContent = blockRes.html();
      const linkElement = htmlContent.select("h1 a").first();
      const imgElement = htmlContent.select("img").first();

      galleryBlocks.push({
        name: linkElement.text(),
        link: `${BASE_URL}${linkElement.attr("href")}`,
        host: BASE_URL,
        cover: "https:" + imgElement.attr("data-src"),
      });
    }
  });

  return Response.success(galleryBlocks, next);
}
