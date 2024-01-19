import React, { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Link } from 'react-router-dom'
export const MyOrder = () => {
    
    const [orderData, setorderData] = useState({})
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myorders", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, []);
    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container min-vh-100' style={{marginTop:"25px"}} >
                <div className='row'>

                    {orderData !== "" ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3 bg-light border border-success mb-2" style={{ width: "16rem", maxHeight: "360px" }}>
                                                          
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : <div className='min-vh-100 text-center p-5 '>
                                <h2 className='text-secondary mt-5'>No Orders Yet?</h2>
                                <Link to="/" className='mx-auto text-success fst-italic fs-5 mt-6'> Let's Add Some Wellness to Your Cart!</Link>
                                </div>
                        )
                    }) : ""}
                </div>

                </div>
                <div>
                    <Footer />
                </div>
            </div>
            )
}
