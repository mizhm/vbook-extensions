load("config.js");
load("crypto.js");

function execute(url) {
  var browser = Engine.newBrowser();
  browser.setUserAgent(UserAgent.android());
  browser.launch(getUrl(url), 30000);

  browser.waitUrl(
    ".*?api\\.truyendichmienphi\\.com.*?token=([a-f0-9]{32})",
    20000
  );

  const requestUrls = JSON.parse(browser.urls());
  browser.close();

  let targetApiUrl = "";

  requestUrls.forEach((reqUrl) => {
    if (
      reqUrl.indexOf("/api/novels/") >= 0 &&
      reqUrl.indexOf("/chapter/") >= 0 &&
      reqUrl.indexOf("token=") >= 0 &&
      reqUrl.indexOf("null") === -1
    ) {
      targetApiUrl = reqUrl;
    }
  });
  const PASSPHRASE = "z4x8vog2a13vz4x8vog2a13v124";

  const response = fetch(targetApiUrl);

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
