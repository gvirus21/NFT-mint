//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.11;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract PokeMintNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable withdrawWallet;
    mapping(address => uint256) walletMints;

    constructor( address _withdrawAddress ) payable ERC721( 'PokeMint', 'PKM') {
        mintPrice = 0.05 ether;
        totalSupply = 0;
        maxSupply = 10000;
        maxPerWallet = 3;
        withdrawWallet = payable(_withdrawAddress);

    }

    function setPublicMintEnabled( bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenURI(string calldata _baseTokenURI ) external onlyOwner {
        baseTokenUri = _baseTokenURI;
    }

    function tokenURI( uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "Token Doesn't exists");
        return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance}('');
        require(success, 'Withdraw unsuccessfull');
    }

    function mint( uint256 _quantity ) public payable {
        require(isPublicMintEnabled, 'Minting is not enabled');
        require(msg.value == _quantity * mintPrice, 'Wrong mint value');
        require(totalSupply + _quantity <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + _quantity <= maxPerWallet, "exceeded max wallet");

        for(uint256 i = 0; i < _quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}