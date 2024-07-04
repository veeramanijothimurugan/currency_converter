import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [amount,setAmount] = useState(1);
  const [from,setFrom]=useState("USD");
  const [to,setTo]=useState("INR");
  const [convertedAmount,SetConvertedAmount]=useState(null);
  const [exchangeRate, setExchangeRate]=useState(null);

useEffect(()=>{
  const getExchangeRate = async() => {
    try{
      let url = `https://api.exchangerate-api.com/v4/latest/${from}`;
      const response=await axios.get(url);
      //console.log(response);
      setExchangeRate(response.data.rates[to])
    }
    catch(error){
      console.error("Error fetching exchange rate:",error);
    }
  };
  getExchangeRate();
},[from,to]);

useEffect(()=>{
  if(exchangeRate!==null){
    SetConvertedAmount(amount*exchangeRate)
  }
},[amount,exchangeRate])

const handleAmountChange = (e) =>{
  const value = parseFloat(e.target.value);
  setAmount(value);
}

const handleFromCurrencyChange = (e) =>{
  setFrom(e.target.value);
}

const handleToCurrencyChange = (e) =>{
  setTo(e.target.value);
}

  return (
    <>
      <div className="container">
        <div>
          <div className="title">
            <img className="logo" src="./logo.png" alt="logo" />
            <h1>CURRENCY CONVERTER</h1>
          </div>
          <div className="input-feild">
            <p>Amount</p>
            <input type="number" className="amount" value={amount} onChange={handleAmountChange} />
            <p>From</p>
            <select id="from" value={from} onChange={handleFromCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
            <p>To</p>
            <select id="to" value={to} onChange={handleToCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="value">
            <p>{amount} {from} is equals to {convertedAmount} {to}</p>
          </div>
        </div>
      </div>
      <p className="sign">Designed by <a href="https://github.com/veeramanijothimurugan/">Veeramani</a></p>
    </>
  );
}

export default App;
