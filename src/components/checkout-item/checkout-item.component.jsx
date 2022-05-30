import {CheckoutItemContainer, BaseSpan , Arrow, ImageContainer, Value, Quantity, RemoveButton} from "./chechout-item.styles";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CheckoutItem = ({cartItem}) =>{
    const {name, imageUrl, price, quantity} = cartItem;
    const {removeItemFromCart, addItemToCart, clearItemFromCart} = useContext(CartContext);
    const decreaseAmount = ()=> removeItemFromCart(cartItem);
    const increaseAmount = ()=> addItemToCart(cartItem);
    const removeProduct = ()=> clearItemFromCart(cartItem);

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={decreaseAmount}>&lt;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={increaseAmount}>&gt;</Arrow>
            </Quantity>
            <BaseSpan>{price*quantity}</BaseSpan>
            <RemoveButton onClick={removeProduct}>&#10005;</RemoveButton>

        </CheckoutItemContainer>

    )
}

export default CheckoutItem;