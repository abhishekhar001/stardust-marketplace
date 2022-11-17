import React, { useEffect, useRef, useState } from 'react';

import {
    Link
  } from "react-router-dom";

export default function Header() {

  const [balanceOfUser, setBalanceOfUser] = useState({"blockchain":"","curreny":"","balance":""});

  const tokneid = useRef(null);

  const storetokenId = () => {
    console.log(tokneid.current.value);
    localStorage.setItem("tokenid",tokneid.current.value);
  }


  const loadBalance = async () => {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: localStorage.getItem("tokenid")
      }
    };
    
    fetch('https://marketplace-api.stardust.gg/v1/balance/get', options)
      .then(response => response.json())
      .then(response => {  

        console.log(response);
        const bb = {
          "blockchain":response[0].amount.blockchain,
          "balance":response[0].amount.balances[1].balance,
          "currency":response[0].amount.balances[1].currency.name
        }
        setBalanceOfUser(bb);
      })
      .catch(err => console.error(err));
  }


  useEffect(() => {
    loadBalance()
  }, [localStorage.getItem("tokenid")])
  


  
  

  return (
    <div>
        <h4>User balance:: {balanceOfUser.blockchain} : {balanceOfUser.currency} : {balanceOfUser.balance}</h4>
        <div style={{display:"flex"}} className="">
          <input ref={tokneid} type="text" placeholder='enter tokenid'/> 
          <button onClick={storetokenId}>Store</button>
        </div>
        <div style={{display:"flex"}} className="">
        <Link to="/">
            <button>Home</button>
        </Link>

        <Link to="/login">
            <button>Login</button>
        </Link>

        <Link to="/profile">
            <button>Profile</button>
        </Link>
        </div>
    </div>
  )
}
