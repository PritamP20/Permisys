import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import PermissionABI from './abi/Permission.json';

function App() {
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState(null);
    const contractAddress = '0x2444E6A4D46aA26A959B237aabb898F39d115DB0';

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request user permission to connect to MetaMask
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                console.log(await provider.getNetwork())
                const signer = provider.getSigner();
                setSigner(signer);
                const contract = new ethers.Contract(contractAddress, PermissionABI, provider);
                console.log(contract)
                setContract(contract); 
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        };
        init();
    }, []);

    const checkRequestStatus = async (id) => {
        if (contract) {
            try {
                const tx = await contract.connect(signer).TeacherApproval(1, true);
                const status = await contract.getRequestStatus(id);
                console.log("Request Status:", status.toString());

            } catch (error) {
                console.error("Error sending transaction or fetching status:", error);
            }
        }
    };

    return (
        <div>
            <h1>Permission Dapp</h1>
            <button onClick={() => checkRequestStatus(1)}>Check Request Status</button>
        </div>
    );
}

export default App;
