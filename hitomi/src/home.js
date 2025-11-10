load("config.js");

function execute() {
  return Response.success([
    {
      title: "Latest",
      input: BASE_URL + "/index-all.nozomi",
      script: "homecontent.js",
    },
  ]);
}
