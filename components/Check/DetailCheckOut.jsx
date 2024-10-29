// components/Check/DetailCheckOut.js
import React, { useEffect, useState, useContext } from 'react';
import ItemsContext from '../../context/ItemsContext';
import { useParams } from 'react-router-dom';

const DetailCheckOut = () => {
    const { fetchOrderById } = useContext(ItemsContext);
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderData = await fetchOrderById(orderId);
                setOrder(orderData);
            } catch (error) {
                console.error("Error al obtener la orden: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId, fetchOrderById]);

    if (loading) return <p>Cargando...</p>;

    return (
        <div>
            <h2>Detalle de la Orden</h2>
            {order ? (
                <div>
                    <p>Nombre: {order.buyer.nombre}</p>
                    <p>Email: {order.buyer.email}</p>
                    <p>Teléfono: {order.buyer.telefono}</p>
                    <h3>Productos:</h3>
                    <ul>
                        {order.items.map((item) => (
                            <li key={item.id}>
                                {item.title} - ${item.price}
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${order.total}</p>
                </div>
            ) : (
                <p>No se encontró la orden.</p>
            )}
        </div>
    );
};

export default DetailCheckOut;
