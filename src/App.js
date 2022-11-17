import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import AllOrders from './pages/AllOrders';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NftDetail from './pages/NftDetail';
import Header from './components/Header';
import Login from './pages/Login';
import Profile from './pages/Profile';


function App() {
  const [allOrders, setAllOrders] = useState([]);



  const loadAllOders = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: localStorage.getItem("tokenid")
      }
    };
    
    fetch('https://marketplace-api.stardust.gg/v1/order/search?currency=USDC&blockchain=polygon', options)
      .then(response => response.json())
      .then(response => {
        setAllOrders(response.results)
        // console.log(response.results);
      })
      .catch(err => console.error(err));

}

  useEffect(() => {

    if (localStorage.getItem("tokenid")){
      loadAllOders();
    }
  }, [localStorage.getItem("tokenid")])
  
  return (
    <Router>

      <Header/>
      <Routes>
          <Route exact path="/" element={<AllOrders allOrders={allOrders} />}/>
          <Route exact path="/login" element={<Login/> } />
          <Route exact path="/profile" element={<Profile/>}/>
          <Route path="/game/:gameid/item/:itemid/order/:orderid" element={<NftDetail />} />
        </Routes>
     
      </Router>
  );
}

export default App;
