// scripts/deploy.js
// 0x5FbDB2315678afecb367f032d93F642f64180aa3
async function main() {
    const [teacher, mentor, student] = await ethers.getSigners();


    let Permission = await ethers.getContractFactory('Permission');
    let permission = await Permission.deploy(
            teacher.address,
            mentor.address,
            student.address
        );
    console.log("Permission contract deployed to:", permission.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
