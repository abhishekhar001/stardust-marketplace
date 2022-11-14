import logo from './logo.svg';
import './App.css';
import {useAuthContext} from "@stardust-platform/web-login";
import { useEffect, useState } from 'react';
import {apikey} from "./data.js"
import CreateOrder from './components/CreateOrder';
import AllOrders from './components/AllOrders';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NftDetail from './components/NftDetail';


function App() {
  const { user, handleOpenModal, isOpen, handleSignOut } = useAuthContext();

  const [allOrders, setAllOrders] = useState([]);

  const loadAllOders = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: apikey
      }
    };
    
    fetch('https://marketplace-api.stardust.gg/v1/order/search', options)
      .then(response => response.json())
      .then(response => {
        setAllOrders(response.results)
        // console.log(response.results);
      })
      .catch(err => console.error(err));

}


  useEffect(() => {

    console.log(user);
    if (user!==undefined){
      loadAllOders()
    }
  }, [user])
  
  return (
    <Router>
      <button onClick={() => handleOpenModal(!isOpen)}>Login</button>


      <Routes>
          <Route exact path="/" element={<AllOrders allOrders={allOrders} />}/>
          <Route exact path="/createorder" element={<CreateOrder />} />
          <Route path="/game/:gameid/item/:itemid/order/:orderid" element={<NftDetail />} />
        </Routes>
     
      </Router>
  );
}

export default App;
