import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export const Card = (props) => {
    let data = useCart();
    let dispatch = useDispatchCart();
    let options = props.options || {}; 
    let priceOptions = Object.keys(options);
    const priceRef = useRef();
    const [qty,setQty] = useState(1);
    const [size , setSize] = useState("")
    let finalPrice = qty * parseInt(options[size]);

    const handleAddToCart = async() =>{
      
            let item =[]
            for (const i of data) {
                if (i.id === props.Box_items._id) {
                    item = i;
                    
                    break;
                }
            }
            
            if(item){
                
            if (item.size === size) {
                await dispatch({ type: "UPDATE", id: props.Box_items._id,  qty:qty ,price: finalPrice})
                alert("Item Updated Successfully");
                console.log("Size same so simply Update one more to the list")
                return
            }
            else if (item.size !== size) {
                await dispatch({ type: "ADD", id: props.Box_items._id, name: props.Box_items.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
                alert("Item added Successfully");
                console.log("Size different so simply ADD one more to the list")
                return
            }
            
            return 
        }
        
        else{

            await dispatch ({type:"ADD" , id:props.Box_items._id , name : props.Box_items.name , price : props.finalPrice , qty : qty, size:size})
            alert("last Item added Successfully");
            console.log(data)
            return
        }
        }
    
     useEffect(()=>{
        setSize(priceRef.current.value);
     },[])
    return (
        <div>
            <div>
                <div className="card mt-3 rounded bg-light border border-success" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src= {props.Box_items.img} className="card-img-top" alt="..."  style={{height:"120px",objectFit:"fill"}}/>
                    <div className="card-body">
                        <h5 className="card-title" >{props.Box_items.name}</h5>
                        <p className="card-text">{props.Box_items.description}</p>
                        <div className="container w-100">
                            <select className='m-2 h-100 bg-success rounded text-light' onChange={(e)=>setQty(e.target.value)}>{Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1} >{i + 1}</option>
                                )
                            })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded text-light' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                                {priceOptions.map((data)=>{
                                    return <option key = {data} value={data}>{data}</option>
                                })}
                            </select>

                            <div className="d-inline h-100">Rs.{finalPrice}/-</div>
                        </div>
                    </div>
                    <hr></hr>
                    <button className='btn btn-success justify-center mx-2' onClick={handleAddToCart}>Add to Cart</button>
                   
                </div>
            </div>
        </div>
    )
}
