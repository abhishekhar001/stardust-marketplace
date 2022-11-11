import logo from './logo.svg';
import './App.css';
import {useAuthContext} from "@stardust-platform/web-login";
import { useEffect } from 'react';
import {apikey} from "./data.js"
import CreateOrder from './components/CreateOrder';

function App() {
  
  const { user, handleOpenModal, isOpen, handleSignOut } = useAuthContext();

  const loaddata = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: apikey
      }
    };
    
    console.log(options);

    fetch('https://marketplace-api.stardust.gg/v1/balance/get', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

}


  useEffect(() => {

    console.log(user);
    if (user!==undefined){
      loaddata()
    }
  }, [user])
  
  return (
    <div >
      {/* <button onClick={() => handleOpenModal(!isOpen)}>Login</button> */}


      <CreateOrder />
     
    </div>
  );
}

export default App;
