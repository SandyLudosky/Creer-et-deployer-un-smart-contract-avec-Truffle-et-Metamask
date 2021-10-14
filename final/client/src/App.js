import React, {  useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

const App = () => {
  const [state, setState] = useState( { localValue: 0, storageValue: 0, web3: null, accounts: null, contract: null, transaction : null })

  const get = async () => {
    /* call get methods here */

    const { contract } = state 
    debugger
    const response = await contract?.methods.get().call()
    console.log(response)
    setState({...state, storageValue: response })
  };

  const set = async () => {
   /* set new value here */
   const { contract, accounts } = state 
   await contract?.methods.set(state.localValue).send({ from : accounts[0] });
   get()
  }

  useEffect(() => {
    (async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setState({ ...state, web3, accounts, contract: instance });
  
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    })()
  }, [])


  if (!state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
    
      <form onSubmit={(e) => {
        e.preventDefault()
        set()
      }}>
        <input type="number" value={state.localValue} onChange={(e) => setState({...state, localValue: e.target.value})}/>
      </form>
      <div>The stored value is: {state.storageValue}</div>
    </div>
  );
}

export default App;
