
import React, { Component } from 'react';

export default class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // not required as this component has no forms or user entry
  // isValidated() {}

  render() {
    return (
      <div className="step step1 funnel-container">
      <div >
        <div className="row ">
       

<div className="wallet wallet-container">
   <div className="wallet-description ">You must have an ERC20-compatible ETH wallet to receive your tokens!  Do not enter or pay from an exchange address!</div>
   <div className="wallet-address-input-container ">
      <div className="form-group"><label>Your receiving ETH (ERC20) wallet address</label>
      <input type="text" id="receiving-wallet" name="receiving-wallet" className="" autoComplete="cc-number" value=""/></div>
   </div>
   <div className="wallet-description ">The addresses you enter below must be exactly the same as the addresses you will send your payment from.</div>
   <div className="wallet-warnings ">
      <div className="wallet-description">Do not enter or pay from an exchange address!</div>
      <ul className="warnings">
         <li>Exchange addresses will not work (e.g. Coinbase, Kraken, Binance, etc.)</li>
         <li>Only personal wallet address will work (e.g. MEW, MetaMask, MIST, etc.)</li>
      </ul>
   </div>
   <div className="sending-wallets ">
      <div className="modal-wrapper ">
         <div className="wallet-modal-title">You are about to save your sending  wallet address.
            Once saved this address cannot be modified.
         </div>
         <div className="wallet-modal-content">
            <div className="wallet-modal-content-row">Make sure to enter correct wallet addresses which you will send your payment from.</div>
            <div className="wallet-modal-content-row">Do not enter or pay from an exchange address!</div>
         </div>
        
      </div>
      <div className="form-group"><label >Your sending ETH wallet address</label>
      <input type="text" id="sending-ETH-wallet" name="sending-ETH-wallet" className="" autoComplete="cc-number" value=""/></div>
     
   </div>
   <div className="wallet-footer ">
      <div className="form-group"><button onClick={() => this.props.jumpToStep(1)}> Continue </button></div>
   </div>
</div>
        </div>
      </div>
    </div>
     
    )
  }
}