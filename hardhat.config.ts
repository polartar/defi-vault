import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';

import { hardhatBaseConfig } from '@balancer-labs/v2-common';
import { name } from './package.json';

import { task } from 'hardhat/config';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import overrideQueryFunctions from '@balancer-labs/v2-helpers/plugins/overrideQueryFunctions';

task(TASK_COMPILE).setAction(overrideQueryFunctions);

export default {
  solidity: {
    compilers: hardhatBaseConfig.compilers,
    overrides: { ...hardhatBaseConfig.overrides(name) },
  },
  networks: {
    test: {
      allowUnlimitedContractSize: true,
      url: 'https://alfajores-forno.celo-testnet.org',
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      chainId: 44787,
      gasPrice: 2000000000,
    },
    celo: {
      allowUnlimitedContractSize: true,
      url: 'https://forno.celo.org',
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      chainId: 42220,
      gasPrice: 2000000000,
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
};
