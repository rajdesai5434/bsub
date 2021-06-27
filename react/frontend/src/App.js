import React, {Component} from 'react';
import './App.css';
import Web3 from 'web3'
import { SUBS_ABI, SUBS_ADDRESS } from './config';
import CompanySubsTable from './CompanySubsTable';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      account:'',
      compCount:0,
      compRows:[]
    }
  }

  componentDidMount(){
    this.loadBlockchainData()
  }

  async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider || "http//localhost:7545")
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()
    this.setState({
      account: accounts[0]
    })
    console.log("network:", network)
    console.log("account:", accounts[0])

    const compSubs = new web3.eth.Contract(SUBS_ABI,SUBS_ADDRESS)
    this.setState({compSubs})
    console.log("compSubs",compSubs)

    const compCount = await compSubs.methods.allSubscriptionCount().call()
    console.log("compCount",compCount)
    this.setState({compCount})

    var compRows = [];
    for (var i = 1; i <= compCount; i++) {
        var temp = await compSubs.methods.companySubscriptions(i).call()
        compRows.push(temp);
    }
    console.log(compRows)
    this.setState({compRows})
  }

  render(){
    if (this.state.compRows.length > 0 && this.state.compCount > 0){
      return (
        <CompanySubsTable
            compSubs={this.state.compSubs}
            compCount={this.state.compCount}
            compRows={this.state.compRows}
            account={this.state.account}
        />
      )
    } else{
      return (<h1>Loading...</h1>)
    }
  }
}

export default App;
