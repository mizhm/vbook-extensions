load("config.js");
load("crypto.js");

function execute(url) {
  const text = fetch(getUrl(url)).text();
  console.log(text);
  const regex = /\\"ver\d*\\":\\"([a-f0-9]{32})\\"/;
  const match = text.match(regex);
  console.log(match[1]);

  const PASSPHRASE = "z4x8vog2a13vz4x8vog2a13v124";

  const response = fetch(url, {
    queries: {
      token: match[1],
    },
  });

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
