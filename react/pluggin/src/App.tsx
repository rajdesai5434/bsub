import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

export const App = () => {
    const [url, setUrl] = useState<string>('');

    /**
     * Get current URL
     */
    useEffect(() => {
        const queryInfo = {active: true, lastFocusedWindow: true};

        const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
        const network = async () => {
          const result = await web3.eth.net.getNetworkType();
          console.log(result);
        }
        network().catch(err => console.error(err))
        //console.log("network:", network);

        const main = async () => {
          const blockNumber = await web3.eth.getBlockNumber()
          console.log({ blockNumber })}
        main().catch(err => console.error(err))

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url = tabs[0].url!;
            setUrl(url);
        });
    }, []);


    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>URL:</p>
                <p>
                    {url}
                </p>
            </header>
        </div>
    );
};

export default App;
