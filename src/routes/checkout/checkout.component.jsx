import {DivCheckoutContainer, DivCheckoutHeader, DivHeaderBlock, SpanTotal} from "./checkout.styles";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = ()=>{
    const { cartItems, cartPrice } = useContext(CartContext);

    return(
        <DivCheckoutContainer>

                <DivCheckoutHeader>
                    <DivHeaderBlock>
                        <span>Product</span>
                    </DivHeaderBlock>
                    <DivHeaderBlock>
                        <span>Description</span>
                    </DivHeaderBlock>
                    <DivHeaderBlock>
                        <span>Quantity</span>
                    </DivHeaderBlock>
                    <DivHeaderBlock>
                        <span>Price</span>
                    </DivHeaderBlock>
                    <DivHeaderBlock>
                        <span>Remove</span>
                    </DivHeaderBlock>
                </DivCheckoutHeader>


                    {cartItems.map((item)=>{
                        return <CheckoutItem key={item.id} cartItem={item} />
                    })}

                    <SpanTotal> Total: {cartPrice}$</SpanTotal>


        </DivCheckoutContainer>
    )
}

export default Checkout;