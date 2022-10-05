// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface ERC721 {
    function safeMint(address to, string memory uri) external;
}

contract Minter {

    ERC721 nft;

    constructor(address _nft){
        nft = ERC721(_nft);
    }

    function mintAll(address[] memory _minters,string[] memory _urls) external {
        require(_minters.length == _urls.length);
        for(uint tt = 0; tt < _minters.length;tt++){
            nft.safeMint(_minters[tt],_urls[tt]);
        }
    }

}