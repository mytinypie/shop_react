import './checkout.styles.scss';
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = ()=>{
    const { cartItems, cartPrice } = useContext(CartContext);

    return(
        <div className='checkout-container'>

            {/*{cartItems.length > 0 ? (*/}

                <div className='checkout-header'>
                    <div className='header-block'>
                        <span>Product</span>
                    </div>
                    <div className='header-block'>
                        <span>Description</span>
                    </div>
                    <div className='header-block'>
                        <span>Quantity</span>
                    </div>
                    <div className='header-block'>
                        <span>Price</span>
                    </div>
                    <div className='header-block'>
                        <span>Remove</span>
                    </div>
                </div>


                    {cartItems.map((item)=>{
                        return <CheckoutItem key={item.id} cartItem={item} />
                    })}

                    <span className="total"> Total: {cartPrice}$</span>



            {/*) : 'no products in the cart'}*/}

        </div>
    )
}

export default Checkout;