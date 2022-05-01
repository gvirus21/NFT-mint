
const hre = require("hardhat");

async function main() {

  const PokeMintNFT = await hre.ethers.getContractFactory("PokeMintNFT");
  const pokeMintNFT = await PokeMintNFT.deploy();

  await pokeMintNFT.deployed();

  console.log("PokemintNFT deployed to:", pokeMintNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
