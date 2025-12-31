load("crypto.js");
load("tokendecode.js");

function execute(url) {
  const text = fetch(getUrl(url)).text();
  const base64String = text.match(/data:image\/svg\+xml;base64,([^"]+)"/)[1];
  const token = extractTokenFromSvg(base64String);

  if (!token) {
    return Response.error("Failed to extract token");
  }

  const PASSPHRASE = "z4x8vog2a13vz4x8vog2a13v124";

  const response = fetch(url, {
    headers: {
      "X-Chapter-Token": token,
      "user-agent": "vozer",
    },
  });

  console.log(token);
  if (!response.ok) {
    return Response.error("Failed to fetch chapter content");
  }

  const decodedText = CryptoJS.AES.decrypt(
    response.json().content,
    PASSPHRASE
  ).toString(CryptoJS.enc.Utf8);

  const lines = decodedText.split("\n");
  lines.reverse();
  const content = lines.join("<br>");
  return Response.success(content);
}

function getUrl(apiUrl) {
  let pageUrl = apiUrl.replace(/^(https?:\/\/)(api\.)/, "$1");

  pageUrl = pageUrl
    .replace("/api/novels/", "/truyen/")
    .replace("/chapter/", "/chuong/");

  pageUrl = pageUrl.replace(/\?.*$/, "");
  return pageUrl;
}
