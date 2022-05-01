import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Main from "../components/Main";


export default function Home() {

const [currentAccount, setCurrentAccount] = useState();
const [isConnected, setIsConnected] = useState(false);
  
useEffect(() => {
    if (window.ethereum !== undefined) {
      window.ethereum.on("accountsChanged", (acc) => {
        setCurrentAccount(acc[0]);
      });
    }
  
  handleReload()
}, []);

const connectWallet = async () => {
  if (window.ethereum !== undefined) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts) {
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    }
  } else {
    alert("Please install Metamask");
  }
};
  
const handleReload = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts[0] != undefined) {
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    }
  }
};
  
  const style = {};

  return (
    <div className={style.container}>
      <Navbar
        currentAccount={currentAccount}
        isConnected={isConnected}
        connectWallet={connectWallet}
      />
      <Main />
    </div>
  );
}
