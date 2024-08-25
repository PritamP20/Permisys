// scripts/deploy.js
// 0x2444E6A4D46aA26A959B237aabb898F39d115DB0
require('dotenv').config()
const { ethers } = require('hardhat');


async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.Sepolia_NETWORK_URL)

    const teacher = new ethers.Wallet(process.env.PRIVATE_KEY_TEACHER, provider);
    const mentor = new ethers.Wallet(process.env.PRIVATE_KEY_MENTOR, provider);
    const student = new ethers.Wallet(process.env.PRIVATE_KEY_STUDENT,provider)

    // const [teacher, mentor, student] = await ethers.getSigners();

    let Permission = await ethers.getContractFactory('Permission');
    let permission = await Permission.deploy(
        teacher.address,
        mentor.address,
        student.address,
        { gasLimit: 1000000 } 
    );
    console.log("Permission contract deployed to:", permission.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
