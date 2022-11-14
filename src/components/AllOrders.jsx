import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

export default function AllOrders({allOrders}) {
    
  return (
    <div>
        <h1>All orders: {allOrders.length}</h1>

        <div className="" style={{display:"flex",flexFlow:"wrap"}}>

        {allOrders.length !== 0 &&
        allOrders.map((order,key)=>{
            return(
                <Link to={`/game/${order.game.id}/item/${order.template.id}/order/${order.id}`}>
                <div className="" style={{border:"1px solid black",margin:"4px", padding:"2px",textAlign:"center"}}>
                    <img width="200px" height="200px"  src={order.template.image} alt="order image" />
                    <div className="">
                        <h5>id: {order.template.id}</h5>
                        <h3>{order.template.name}</h3>
                            <p>{order.game.name}</p>
                            <p>{order.currency}: {order.price}</p>
                        <button>Buy Now</button>
                    </div>
                </div>
                </Link>
                )
            })
        }
        </div>
    </div>
  )
}
