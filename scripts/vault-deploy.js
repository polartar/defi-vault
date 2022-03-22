// import hardhat from 'hardhat';

// const { ethers } = hardhat;

const { ethers } = require('hardhat');
async function main() {
  const Vault = await ethers.getContractFactory('Vault');
  const vault = await Vault.deploy(
    '0xD96B7563027968b2BB8D946eC6Fad7735B10F8c1',
    '0x56f1F6e41A49C256aE2B37c3DC7f97E0CD7915c2',
    90,
    30
  );

  await vault.deployed();
  console.log('Vault deployed to:', vault.address);
  //0x0F7B97b09eefe4170aeC0Ed81f85Ea2919DEBAf3 -- testnet
  //0xA29c5B0CB7EDeA13E14aC8170688a89d4D7eD717 -- mainnet
}

main()
  // eslint-disable-next-line no-undef
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
