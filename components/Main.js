import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import PokeMintNFTABI from "../PokeMintNFT.json";

const pokeMintContractAddress = "0xd4F60A6fFE9242109eF3903145Da8BCb6910e99b";

const Main = ({ currentAccount, isConnected }) => {
  useEffect(() => {
    getMintPrice();
  }, []);

  const [mintAmount, setMintAmount] = useState(1);
  const [mintPrice, setMintPrice] = useState(null);

  const getMintPrice = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const pokeMintContract = new ethers.Contract(
        pokeMintContractAddress,
        PokeMintNFTABI,
        provider
      );

      try {
        const rawMintPrice = await pokeMintContract.mintPrice();
        const mintPriceHex = rawMintPrice._hex;
        const formatterMintPrice = ethers.utils.formatEther(`${mintPriceHex}`);

        setMintPrice(formatterMintPrice);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const pokeMintContract = new ethers.Contract(
        pokeMintContractAddress,
        PokeMintNFTABI,
        signer
      );

      try {
        const mintTx = await pokeMintContract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((mintPrice * mintAmount).toString()),
        });
        await mintTx.wait();
      } catch (err) {
        console.log("err: ", err);
      }
    }
  };

  return (
    <div>
      <button onClick={handleMint}>Mint</button>
    </div>
  );
};

export default Main;
