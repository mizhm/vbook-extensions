function execute() {
    return Response.success([
        { title: "Mới cập nhật", input: "/nosort/", script: "search.js" },
        { title: "Hoàn thành", input: "/quanben/nosort/", script: "search.js" },
        { title: "Người lớn", input: "/nosort/11/", script: "search.js" },
        { title: "Nhục văn", input: "/nosort/12/", script: "search.js" }
    ]);
}
