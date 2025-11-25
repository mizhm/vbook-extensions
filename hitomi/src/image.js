function execute(url) {
  let response = fetch(url, {
    headers: {
      Referer: "https://hitomi.la/",
    },
  });
  if (response.ok) {
    return "data:png;base64," + response.base64();
  }

  return null;
}
