import React, { createContext, useContext, useReducer } from 'react'
const  CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state,action)=>{
switch(action.type) {
    case "ADD":
        return [...state,{id:action.id , name:action.name , qty:action.qty , size:action.size , price:action.price}]
    
    case "REMOVE" :
        let newArr = [...state]
        newArr.splice(action.index,1)
        return newArr
    case "UPDATE":
            let arr = [...state]
            arr.find((item, index)=>{
                if (item.id === action.id) {
                    let newQty = parseInt(action.qty)
                    console.log(item.qty, parseInt(action.qty), action.price + item.price)
                     arr[index] = { ...item, qty:(newQty+ item.qty), price: (action.price + item.price) }
                     // return arr
                    }
                    })
            return arr 

    case "DROP":
        let empArr = []
        return empArr
   default :
        console.log("error in reducer")

}
}
export const CartProvider = ({children}) =>{
    const[state,dispatch] = useReducer(reducer,[]);
    return(
        <CartDispatchContext.Provider value ={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);