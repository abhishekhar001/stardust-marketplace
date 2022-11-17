import React, { useEffect , useState} from 'react';
import {useAuthContext} from "@stardust-platform/web-login";


export default function Login() {

  const { user, handleOpenModal, isOpen, handleSignOut } = useAuthContext();

  const [tokenid, setTokenid] = useState(null);

    useEffect(() => {

        if (user) {
          setTokenid(user.signInUserSession.idToken.jwtToken);
            localStorage.setItem("tokenid",user.signInUserSession.idToken.jwtToken)
        }

    }, [user])

  return (
    <div>
        <h1>Login and get your token</h1>
      <button onClick={() => handleOpenModal(!isOpen)}>Login</button>

      {tokenid&&
        <>
        <h3>tokenid: </h3>
        <h3>{tokenid}</h3>
        </>
      }
    </div>

    
  )
}
