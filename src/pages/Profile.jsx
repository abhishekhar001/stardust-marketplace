import React, { useEffect, useState } from 'react'

export default function Profile() {

    const [userInventory, setUserInventory] = useState([]);

    const [sellStatus, setsellStatus] = useState({"result":false,"message":""})

    const getUserData = () => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: localStorage.getItem("tokenid")
            }
          };
          
          fetch('https://marketplace-api.stardust.gg/v1/player/inventory-get', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setUserInventory(response)
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
      getUserData();
    }, []);


    const sellNft = (NftTokenid,amount,gameid) => {
        const _price = prompt("price in usdc")
        
        const _sell = window.confirm("Are you sure you want to sell this nft id");
        if (_sell) {
            console.log(NftTokenid,amount,gameid,_price);

            const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  Authorization: localStorage.getItem("tokenid")
                },
                body: JSON.stringify({
                  tokenObjects: [{tokenId: Number(NftTokenid), amount: amount.toString()}],
                  gameId: gameid.toString(),
                  currencyISOCode: 'USDC',
                  price: _price.toString()
                })
              };
              
              fetch('https://marketplace-api.stardust.gg/v1/order/create', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response);

                    if (response?.id) {
                        setsellStatus({result:true,message:`nft put on sell succefully with id ${response.id}`})
                    } else {
                        setsellStatus({result:true,message:response?.message})
                    }

                })
                .catch(err => console.error(err));
        }
    }
    
  return (
    <div>
        <h1>My Profile</h1>


        {sellStatus.result&&
        <div className="">

            <h1>----</h1>
            <p>{sellStatus.message}</p>
            <h1>----</h1>
        </div>
        }

        {userInventory.length >0&&
        <>
        <h3>User have nfts form {userInventory.length} games</h3>
        {
        userInventory.map((item,key)=>{
            return(
                <div className="" key={key}> 
                <hr />
                <img src="https://sd-game-assets.s3.amazonaws.com/game_566/Game/GameLogo.png" alt="" width="300px" height="300px"  />
                <h3>GameName: {item.name}</h3>
                <h3>GameId: {item.gameId}</h3>
                <h3>owner: {item.ownerId}</h3>

                <h2>Total nfts {item.inventory.length} user have</h2>
                <div className="" style={{display:"flex",flexFlow:"wrap"}}>
                {item.inventory.map((nft,key2)=>{
                    return(
                        <div className="" key={key2} style={{border:"1px solid black",margin:"4px", padding:"2px",textAlign:"center"}}>
                    <img width="100px" height="100px"  src={nft.token.props.inherited.image} alt="order image" />
                            <h4>quantity: {nft.token.quantity}</h4>
                            <h4>name: {nft.token.name}</h4>
                            <h4>tokenId: {nft.tokenId}</h4>

                            <button onClick={()=>sellNft(nft.tokenId,nft.token.quantity,item.gameId)}>SellNft</button>
                        </div>
                    )
                })}
                </div>

        </div>
            )
        })}
        </>
        }
    </div>
  )
}
