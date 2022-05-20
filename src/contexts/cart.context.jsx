import {createContext, useEffect, useState} from "react";

const addCartItem = (cartItems, productToAdd) =>{


    const existingCartItem = cartItems.find((cartItem) =>
        cartItem.id === productToAdd.id
    );

    if(existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem.id === productToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    }

   return [...cartItems, {...productToAdd, quantity: 1}];
}
//
// const changeQuantityCartItem = (cartItems, productToChange, amount) =>{
//
//     const existingCartItem = cartItems.find((cartItem) =>
//         cartItem.id === productToChange.id
//     );
//
//     if(existingCartItem){
//
//         return cartItems.map((cartItem)=>
//             cartItem.id === productToChange.id ?
//                 {...cartItem, quantity: cartItem.quantity + amount}
//                 : cartItem
//         );
//     }
//
//     return [...cartItems];
// }

const removeCartItem = (cartItems, productToRemove) =>{


    const existingCartItem = cartItems.find((cartItem) =>
        cartItem.id === productToRemove.id
    );

    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem)=> cartItem.id !== productToRemove.id);
    }

    if(existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem.id === productToRemove.id ?
                {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
        );
    }

    return [...cartItems];
}

const clearCartItem = (cartItems, cartItemToCLear) =>{
    return cartItems.filter((cartItem)=> cartItem.id !== cartItemToCLear.id);
}

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen: ()=> {},
    cartItems : [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount : 0,
    cartPrice: 0
});


export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartPrice, setCartPrice] = useState(0);

    useEffect(()=>{
        let newCartCount = cartItems.reduce((count, item)=>{
            return count+item.quantity;
        },0);
        setCartCount(newCartCount);

        let newCartPrice = cartItems.reduce((price, item)=>{
            return price + item.quantity*item.price;
        },0);
        setCartPrice(newCartPrice);
    }, [cartItems]);

    const addItemToCart = (productToAdd)=>{
       setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemFromCart = (productToRemove)=>{
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart=(productToRemove)=>{
        setCartItems(clearCartItem(cartItems, productToRemove));
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartPrice };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

