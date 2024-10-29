import React, { useContext } from 'react';
import ItemsContext from '../../context/ItemsContext';
import CartDetailItem from './CartDetailItem';
import CheckOut from '../Check/CheckOut';
import './Cart.css';

const CartDetail = () => {
    const { cart, limpiarCarrito } = useContext(ItemsContext);

    const handleClearCart = () => {
        limpiarCarrito();
    };

    return (
        <div className="cart-detail">
            <h2>Detalles del Carrito</h2>
            {cart && cart.length === 0 ? ( 
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    {cart.map(item => (
                        <CartDetailItem key={item.id} item={item} />
                    ))}
                    <button onClick={handleClearCart}>Limpiar Carrito</button>

                </>
            )}

            <CheckOut />
        </div>
    );
};

export default CartDetail;
