import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";
import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {Link, useNavigate} from "react-router-dom";

const CartDropdown = () =>{
    const { cartItems, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = ()=>{
        setIsCartOpen(false);
        navigate('/checkout');
    }


    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map((item)=>(<CartItem key={item.id} cartItem={item} /> ))
                    ):(
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }

            </CartItems>
                <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;