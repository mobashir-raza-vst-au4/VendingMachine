import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import vendingMachineContract from './../blockchain/vending';
import Web3 from 'web3';

const VendingMachine = () => {
  const [inventory, setInventory] = useState('');
  const [myDonutCount, setMyDonutCount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [vmContract, setVmContract] = useState(null);
  const [input, setInput] = useState(null);
  const [purchases, setPurchases] = useState(0);

  const connectWalletHandler = async () => {
    window.ethereum
      ? window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async accounts => {
          console.log(accounts);
          setAddress(accounts[0]);
          let w3 = new Web3(window.ethereum);
          setWeb3(w3);

          //create local contract copy
          const vm = vendingMachineContract(w3)
          setVmContract(vm)
        })
        .catch(err => console.log(err))
      : console.log('Please install MetaMask');
  };

  useEffect(() => {
    if (vmContract) getInventoryHandler();
    if (vmContract && address) getMyDonutCountHandler();
  }, [vmContract, address, purchases]);

  const getInventoryHandler = async () => {
    const inventory = await vmContract.methods
      .getVendingMachineBalances()
      .call();
    setInventory(inventory);
  };

  const getMyDonutCountHandler = async () => {
    const count = await vmContract.methods.donutBalances(address).call();
    setMyDonutCount(count);
  };

  const inputHandler = (e) => {
    setInput(e.target.value)
  }
  const buyDonutsHandler = async () => {
    setSuccessMsg("Ordering Donut...")
    try {
      await vmContract.methods.purchase(input).send({
        from: address,
        value: web3.utils.toWei('0.02', 'ether') * input
      })
      setPurchases(purchases + 1)
      setSuccessMsg(`Successfully purchased ${input} donuts`)
    } catch (error) {
      setErrorMsg(error.message)
    }

  };

  const resetMsg = () => {
    console.log("resetong")
    setErrorMsg('');
    setSuccessMsg('');
  }

  useEffect(() => {
    setTimeout(() => {
      resetMsg()
    }, 5000)
  }, [errorMsg, successMsg])

  return (
    <div className={styles.container}>
      <Head>
        <title>Vending Machine App</title>
        <meta name="description" content="A Blockchain Vending Machine App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex items-center">
            <img
              src="donut.svg"
              className="mr-3 h-6 sm:h-10"
              alt="Donut Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              VendingMachine
            </span>
          </a>
          <ul className="flex flex-col mt-4 md:mt-0 md:text-sm md:font-medium">
            <li className="bg-blue-700 px-3 py-2 rounded-md">
              <button onClick={connectWalletHandler} className="text-white">
                {address ? address : 'Connect Wallet'}
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <main className={styles.main}>
        <span className="text-red-700">{errorMsg}</span>
        <span className="text-green-700">{successMsg}</span>
        <h1>Vending Machine inventory: {inventory}</h1>
        <h1>My Donut: {myDonutCount}</h1>
        <div className="input">
          <div>
            <label
              for="buy_donut"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Buy Donuts
            </label>
            <input
              onChange={e => {
                inputHandler(e);
              }}
              type="text"
              id="buy_donut"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter amount..."
              required
            />
          </div>
          <button
            onClick={buyDonutsHandler}
            className="bg-blue-700 px-8 py-2 rounded-md mt-3 text-white"
          >
            Buy
          </button>
        </div>
      </main>
    </div>
  );
};

export default VendingMachine;
