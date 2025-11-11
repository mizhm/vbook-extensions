function parseGg(ggJs) {
  const bMatch = ggJs.match(/b: '(\S+)'/);
  const ggB = bMatch ? bMatch[1] : null;

  const ggMSet = new Set();
  const regex = /case (\d+):/g;
  let match;

  while ((match = regex.exec(ggJs)) !== null) {
    ggMSet.add(parseInt(match[1], 10));
  }

  return { ggB: ggB, ggMSet: ggMSet };
}

function processGalleryInfo(galleryInfoText) {
  const jsonStart = galleryInfoText.indexOf("{");
  const jsonEnd = galleryInfoText.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("Failed to parse gallery info: Not a valid object.");
  }

  const jsonString = galleryInfoText.substring(jsonStart, jsonEnd + 1);

  let galleryinfo;
  try {
    galleryinfo = JSON.parse(jsonString);
  } catch (e) {
    throw new Error(`Failed to parse gallery JSON: ${e.message}`);
  }

  return galleryinfo;
}
