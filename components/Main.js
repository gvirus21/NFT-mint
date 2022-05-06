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
          console.log(`amount: ${mintAmount}, price: ${mintPrice}, totalPrice: ${mintPrice * mintAmount}`)

        const mintTx = await pokeMintContract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((mintPrice * mintAmount).toString()),
        });
        await mintTx.wait();
      } catch (err) {
        console.log("err: ", err);
      }
    }
  };

  const handleDecrement = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1);
    }
  };
  const handleIncrement = () => {
    if (mintAmount < 2) {
      setMintAmount(mintAmount + 1);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-tr from-violet-500 via-pink-700 to-pink-600 flex-col justify-center items-center">
      <div className="flex flex-col justify-between items-center pt-32">
        <h1 className="text-white text-6xl font-bold my-5 font-mono">PokeMint</h1>
        <p className="text-white w-4/6 my-5 text-center font-mono font-semibold">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
          nihil molestiae iste. Doloremque rerum culpa laudantium optio voluptas
          ut debitis.
        </p>
        {isConnected ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center mt-10">
              <button
                onClick={handleDecrement}
                className="bg-pink-800 hover:bg-pink-900 text-white mx-3 h-10 w-10 rounded-md border-0 outline-none text-xl"
              >
                -
              </button>
              <input
                type="number"
                value={mintAmount}
                className="h-14 rounded-lg w-20 text-center focus:outline-none bg-slate-100 text-3xl text-pink-800"
              />
              <button
                onClick={handleIncrement}
                className="bg-pink-800 hover:bg-pink-900 text-white font-bold mx-3 h-10 w-10 rounded-md border-0 outline-none text-xl"
              >
                +
              </button>
            </div>
            <button
              onClick={handleMint}
              className="bg-pink-800 my-7 h-10 w-32 rounded-md text-white tracking-wider hover:bg-pink-900"
            >
              {" "}
              Mint{" "}
            </button>
          </div>
        ) : (
          <div>
            <h1>Please Connect your wallet to continue </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
