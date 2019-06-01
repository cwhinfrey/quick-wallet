import TruffleContract from 'truffle-contract';
import Web3 from 'web3';
import QuickWalletFactory from '../../build/contracts/QuickWalletFactory.json';
import QuickWallet from '../../build/contracts/QuickWallet.json';
import ERC20Mock from '../../build/contracts/ERC20Mock.json';

export const web3 = new Web3('http://localhost:8545', undefined, { transactionConfirmationBlocks: 1 });
export const zeroAddress = '0x0000000000000000000000000000000000000000';

export const getAccounts = async () => {
  return web3.eth.getAccounts();
};
const provider = new Web3.providers.HttpProvider('http://localhost:8545');

let txOptions;

export const getContractWithProvider = (metadata) => {
  let contract = new TruffleContract(metadata);
  contract.setProvider(provider);
  return contract;
};

export const deployQuickWalletFactory = async () => {
  const factoryContract = await new web3.eth.Contract(QuickWalletFactory.abi);
  const accounts = await getAccounts();
  const factory = await factoryContract.deploy({
    data: QuickWalletFactory.bytecode,
    arguments: [QuickWallet.bytecode]
  }).send({from: accounts[0], gasPrice: 1, gasLimit: 4700000});
  return factory;
};

export const deployERC20Mock = async (account, initialBalance) => {
  const tokenContract = await new web3.eth.Contract(ERC20Mock.abi);
  const accounts = await getAccounts();
  const token = await tokenContract.deploy({
    data: ERC20Mock.bytecode,
    arguments: [account, initialBalance]
  }).send({from: accounts[0], gasPrice: 1, gasLimit: 4700000});
  return token;
};