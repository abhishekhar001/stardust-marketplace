import logo from './logo.svg';
import './App.css';
import {useAuthContext} from "@stardust-platform/web-login";


function App() {
  const { user, handleOpenModal, isOpen, handleSignOut } = useAuthContext();

  return (
    <div >
            <button onClick={() => handleOpenModal(!isOpen)}>Login</button>
     
    </div>
  );
}

export default App;
