function execute() {
    return Response.success([
        { title: "Xếp hạng tuần", input: "order=weeklypoint", script: "search.js" },
        { title: "Nocturne", input: "nocgenre=1&order=weeklypoint", script: "search.js" },
        { title: "Moonlight", input: "nocgenre=2&order=weeklypoint", script: "search.js" },
        { title: "Moonlight BL", input: "nocgenre=3&order=weeklypoint", script: "search.js" },
        { title: "Midnight", input: "nocgenre=4&order=weeklypoint", script: "search.js" },
        { title: "Mới cập nhật", input: "order=new", script: "search.js" }
    ]);
}
