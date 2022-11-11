import React from 'react'

import {gameId,apikey} from "../data"

export default function CreateOrder() {

    const createNewOrder = async () => {
    
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: apikey
            },
            body: JSON.stringify({
              tokenObjects: [{tokenId: 1, amount: '5'}],
              gameId: gameId,
              currencyISOCode: '1',
              price: '54'
            })
          };
          
          fetch('https://marketplace-api.stardust.gg/v1/order/create', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
  return (
    <div>
        <h1>CreateOrder</h1>

    </div>
  )
}
