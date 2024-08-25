const {expect} = require("chai")
const {ethers} = require("hardhat")

describe("Permisys",()=>{
    let student, teacher, mentor;
    let permission;

    beforeEach(async()=>{
        [student, teacher,mentor] = await ethers.getSigners()
        let Permission = await ethers.getContractFactory('Permission');
        permission = await Permission.deploy(
            teacher.address,
            mentor.address,
            student.address
        );
    })

    it("Teacher Approval",async ()=>{
        let transaction = await permission.connect(teacher).TeacherApproval(1, true);
        let receipt = await transaction.wait()
    })

    it("Mentor approval", async()=>{
        let tracnsaction = await permission.connect(mentor).MentorApproval(1, false);
        await tracnsaction.wait()
    })
    it("Final check", async () => {
        await permission.connect(teacher).TeacherApproval(1, true);
        const status = await permission.getRequestStatus(1);
        console.log(status.toString())
        // const statusMap = {
        //     0: 'Pending',
        //     1: 'Approved',
        //     2: 'Rejected by Teacher',
        //     3: 'Rejected by Mentor',
        //     4: 'Reject by both'
        // };
        
        // console.log("Request Status:", statusMap[status.toString()]);
    });
})