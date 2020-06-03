import React from 'react';
import ReactDOM from 'react-dom';

import { useState } from 'react';




import Web3 from 'web3';

const App = () =>{



  const [account,updateAccount] = useState({
    address:'',
    balance:'',
    netId:''
  })

  if(window.ethereum!=='undefined'){
  window.ethereum.on('accountsChanged', function () {
  // Time to reload your interface with accounts[0]!
    web3stuff()
  })
}
  //web3.eth.getBlock().then(console.log)

  const web3stuff = async () =>{
    try{
    if (typeof window.ethereum.selectedAddress !== 'undefined'){
    window.ethereum.enable() 
    // console.log(window.ethereum)
    // let test = await web3.eth.getBalance(window.ethereum.selectedAddress)
    // console.log(test)
    var web3 = new Web3(window.ethereum)
    if (typeof window.ethereum.selectedAddress !== 'undefined'){

    let bal = await web3.eth.getBalance(window.ethereum.selectedAddress)
    updateAccount({address:window.ethereum.selectedAddress,balance:(await web3.utils.fromWei(bal,'ether')+" Ether"),netId:window.ethereum.networkVersion})
    } else {
      window.confirm("Please Login to metamask")
    }
  } else {
    // window.confirm("Please use a web3 enabled browser!")
  }}catch(e){
       window.confirm("Please Login to metamask")
  }

  }

 
  
  return (
    <div>
      <button className='btn btn-outline-success text-center' onClick={web3stuff}>
      Connect to wallet
      </button>
      <h1 className='display-4'>Address : {account.address}</h1>
      <h1 className='display-4'>Balance : {account.balance}</h1>
      <h1 className='display-4'>Network : {account.netId}</h1>
      

    </div>
  );
}

ReactDOM.render(<App/>,document.getElementById('root'))