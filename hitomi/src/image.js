function execute(url) {
  console.log(url);
  let response = fetch(url, {
    headers: {
      Referer: "https://hitomi.la/",
    },
  });
  console.log(JSON.stringify(response));
  if (response.ok) {
    return Graphics.createImage(response.base64());
  }

  return null;
}
