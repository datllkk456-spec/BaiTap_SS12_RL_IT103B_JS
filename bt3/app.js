
let choice = "1";

switch (choice) {
    case "1":
        let name = "Nguyen Van An";
        let plan = "PERSONAL";
        console.log("Them thue bao:", name, plan);
        break;

    case "2":
        console.log("Hien thi danh sach thue bao");
        break;

    case "3":
        let subscriptionId = "SUB_001";
        let newPlan = "FAMILY";
        console.log("Cap nhat:", subscriptionId, newPlan);
        break;

    case "4":
        console.log("Huy thue bao");
        break;

    default:
        console.log("Lua chon khong hop le");
}
