import React, { useEffect, useState } from 'react'

import {
    useParams
  } from "react-router-dom";

  import {apikey} from '../data';


  import {useAuthContext} from "@stardust-platform/web-login";


export default function NftDetail() {

    let { gameid, itemid,orderid } = useParams();
    const [itemData, setItemData] = useState(null);


    const buyButtonHandler = () => {

    }

    const loadItemData = async () => {

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: apikey
            }
          };
          
          fetch(`https://marketplace-api.stardust.gg/v1/order/search?gameId=${gameid}&templateId=${itemid}`, options)
            .then(response => response.json())
            .then(response => {

                const _arrayRes = response.results.filter((res)=>res.id.toString()===orderid.toString())[0];
                setItemData(_arrayRes);

            })
            .catch(err => console.error(err));


        console.log(gameid, itemid,orderid);
    }

    useEffect(() => {
        if (gameid && itemid &&orderid) {
            loadItemData()
        }
    }, [gameid, itemid,orderid])


    

    if (!itemData) {
        return
    }
  return (
    <div>


        
       <h1>
         NftDetail
        </h1>

        <div className="">
            <img src={itemData.template.image} height="500px" alt="" />

            <h3>{itemData.template.name}</h3>
                            <p>{itemData.game.name}</p>
                            <p>{itemData.currency}: {itemData.price}</p>

                            <p>Listedby : {itemData.seller.id}</p>
                            <p>available for sale: {itemData.token.amount}</p>
                        <button onClick={() => buyButtonHandler()}
                        >Buy Now</button>
        </div>

        <hr />

        <div className="">
            <h1>token details</h1>

            <p>token type: {itemData.template.type}</p>
            <p>blockchain: {itemData.game.blockchain}</p>
            <p>token id: {itemData.token.id}</p>
        </div>

        <hr />

        <div className="">
            <h1>Trading history</h1>

            <div className="" style={{display:"flex"}}>
                <p>event: </p>
                <p>price: </p>
                <p>quantity: </p>
                <p>user: </p>
            </div>
        </div>
        
    </div>

  )
}
