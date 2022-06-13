import './App.css';
import React, {useState} from 'react';
import { ethers } from 'ethers';

function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const connectWalletHandler = () => {
    if(window.ethereum){
      console.log(window.ethereum);
      window.ethereum.request({method:'eth_requestAccounts'})
      .then(result=>{
        accountChangeHandler(result[0]);
      })
    }else{
      setErrorMessage('Install MetaMask')
    }
  }

  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  }

  const getUserBalance = (address) => {
    window.ethereum.request({method:'eth_getBalance',params:[address,'latest']}).then(balance=>{
      setUserBalance(ethers.utils.formatEther(balance));
    })
  }

  const chainChangedHandler = () => {
    window.location.reload();
  }

  window.ethereum.on('accountsChanged', accountChangeHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  return (
    <div className="App">
     <h4>Connection to MetaMask using window.ethereum method</h4>
     <button onClick={connectWalletHandler}>Connect Wallet</button>
     <p>Address:{defaultAccount}</p>
     <p>Balance:{userBalance}</p>
    </div>
  );
}

export default App;
