import React, { useContext } from 'react';
import ItemsContext from '../../context/ItemsContext';
import './Cart.css';

const CartDetailItem = ({ item }) => {
    const { eliminarDelCarrito, agregarAlCarrito } = useContext(ItemsContext);

    const handleIncrement = () => {
        agregarAlCarrito(item);
    };

    const handleDecrement = () => {
        eliminarDelCarrito(item.id);
    };

    return (
        <div className="cart-detail-item">
            <h3>{item.nombre}</h3>
            <p>Precio: ${item.precio}</p>
            <p>Cantidad: {item.quantity}</p>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
        </div>
    );
};

export default CartDetailItem;
