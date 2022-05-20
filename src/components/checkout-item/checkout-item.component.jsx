import "./chechout-item.styles.scss"
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CheckoutItem = ({cartItem}) =>{
    const {name, imageUrl, price, quantity} = cartItem;
    const {removeItemFromCart, addItemToCart, clearItemFromCart} = useContext(CartContext);
    const decreaseAmount = ()=> removeItemFromCart(cartItem);
    const increaseAmount = ()=> addItemToCart(cartItem);
    const removeProduct = ()=> clearItemFromCart(cartItem);

    return(
        <div className="checkout-item-container" >
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <span className="arrow" onClick={decreaseAmount}>&lt;</span>
                <span className="value">{quantity}</span>
                <span className="arrow" onClick={increaseAmount}>&gt;</span>
            </span>
            <span className="price">{price*quantity}</span>
            <div className='remove-button' onClick={removeProduct}>&#10005;</div>

        </div>

    )
}

export default CheckoutItem;