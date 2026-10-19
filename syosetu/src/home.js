function execute() {
    return Response.success([
        { title: "Xếp hạng ngày", input: "order=dailypoint", script: "search.js" },
        { title: "Xếp hạng tuần", input: "order=weeklypoint", script: "search.js" },
        { title: "Xếp hạng tháng", input: "order=monthlypoint", script: "search.js" },
        { title: "Tổng điểm", input: "order=hyoka", script: "search.js" },
        { title: "Mới cập nhật", input: "order=new", script: "search.js" },
        { title: "Mới đăng", input: "order=ncodedesc", script: "search.js" }
    ]);
}
