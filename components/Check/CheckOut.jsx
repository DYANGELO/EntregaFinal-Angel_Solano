// components/Check/CheckOut.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore'; 
import ItemsContext from '../../context/ItemsContext';
import Swal from 'sweetalert2';

const CheckOut = () => {
    const { cart, totalPrice, limpiarCarrito } = useContext(ItemsContext); 
    const [buyer, setBuyer] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const navigate = useNavigate();
    const db = getFirestore(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBuyer((prevBuyer) => ({
            ...prevBuyer,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!buyer.name || !buyer.email || !buyer.phone) {
            Swal.fire('Error', 'Por favor, completa todos los campos.', 'warning');
            return;
        }
    
        if (cart.length === 0) {
            Swal.fire('Error', 'El carrito está vacío.', 'warning');
            return;
        }
    
        const order = {
            buyer,
            date: Timestamp.fromDate(new Date()),
            items: cart.map(item => ({
                id: item.id,
                title: item.nombre,
                price: item.precio,
            })),
            total: totalPrice
        };
    
        try {
            const ordersCollection = collection(db, "ordenes");
            const docRef = await addDoc(ordersCollection, order);
    
            limpiarCarrito(); 
            navigate(`/checkout/${docRef.id}`);
            Swal.fire('Gracias por su Compra', 'Compra realizada con éxito', 'success');
        } catch (error) {
            console.error("Error al realizar la compra: ", error);
            Swal.fire('Error', 'Hubo un problema al procesar la compra.', 'error');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Check Out</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Nombre</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={buyer.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={buyer.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">Teléfono</label>
                    <div className="col-sm-10">
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={buyer.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-dark mt-3">Comprar</button>
            </form>
        </div>
    );
};

export default CheckOut;

