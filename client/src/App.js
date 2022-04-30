import React, { Component } from "react";
import PTToken from "./contracts/PTToken.json";
import PTTokenSale from "./contracts/PTTokenSale.json";
import KycSale from "./contracts/KYCSale.json"
import getWeb3 from "./getWeb3";

import "./App.css";
import { use } from "chai";

class App extends Component {
  state = { loaded: false , kycAddress: "0x123", PTTokenSaleAddress: "", userTokens: 0};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      

      this.instance = new this.web3.eth.Contract(
        PTToken.abi,
        PTToken.networks[this.networkId] && PTToken.networks[this.networkId].address,
      );

      this.saleInstance = new this.web3.eth.Contract(
        PTTokenSale.abi,
        PTTokenSale.networks[this.networkId] && PTTokenSale.networks[this.networkId].address,
      );

      this.kycInstance = new this.web3.eth.Contract(
        KycSale.abi,
        KycSale.networks[this.networkId] && KycSale.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();

      this.setState({loaded: true, PTTokenSaleAddress: this.saleInstance._address}, this.updateUserTokens); // PTTokenSale.networks[this.networkId].address
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  updateUserTokens = async() => {
    let userTokens = await this.instance.methods.balanceOf(this.accounts[0]).call();
    this.setState({userTokens: userTokens});
  }

  listenToTokenTransfer = async() => {
    this.instance.events.Transfer({to: this.accounts[0]}).on("data", this.updateUserTokens);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  };

  handleKeySubmit = async() => {
    const {kycAddress} = this.state;
    await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]});
    alert ("Account "+kycAddress+" is now Whitelisted" );
  };

  handleBuyTokens = async() => {
    await this.saleInstance.methods.buyTokens(this.accounts[0]).send({from:this.accounts[0], value: this.web3.utils.toWei("1","wei")});
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Premium Watches Tokens</h1>
        <p>Get Your token Today!!!</p>
        <h2>Register of KYC (Whitelist Yourself)</h2>
        Address: <input type="text" name="kycAddress" value = {this.state.kycAddress} onChange = {this.handleInputChange} />
        <button type="button" onClick={this.handleKeySubmit}> Whitelist Address </button>
        <h2>Buy Tokens</h2>
        <p>Place your order by sending ether @: {this.state.PTTokenSaleAddress}</p>
        <p>Token Balance: {this.state.userTokens} PWT Tokens</p>
        <button type = "button" onClick={this.handleBuyTokens}>Buy Tokens</button>
      </div>
    );
  }
}

export default App;
