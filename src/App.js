import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import PermissionABI from './abi/Permission.json';

function App() {
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState(null);
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request user permission to connect to MetaMask
                const provider = new ethers.providers.Web3Provider(window.ethereum);
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
                // Sending a transaction (if MentorApproval changes the blockchain state)
                const tx = await contract.connect(signer).MentorApproval(1, true);
                await tx.wait(); // Wait for the transaction to be mined
                // Fetching the request status (if getRequestStatus is a view function)
                const status = await contract.getRequestStatus(1);
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
