import { createContext, useState, useEffect } from "react"
import { getFirestore, collection, getDocs } from "firebase/firestore"
import { addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXhSPsRliWphHpDyoy-neYWj0EFgAMfy4",
  authDomain: "dyangels-45d6e.firebaseapp.com",
  projectId: "dyangels-45d6e",
  storageBucket: "dyangels-45d6e.appspot.com",
  messagingSenderId: "53986663185",
  appId: "1:53986663185:web:0536299a80f7e641034ab0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]); 

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const productosCollection = collection(db, "items");
                const snapshot = await getDocs(productosCollection);
                const productosData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    stock: doc.data().stock || 0 
                }));
                setProductos(productosData);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener productos: ", error);
            }
        };
        obtenerProductos();
    }, []);

    const agregarAlCarrito = (producto) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === producto.id);
        
            if (existingProduct) {
                if (existingProduct.quantity < producto.stock) {
          
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto agregado',
                        text: `Se ha añadido una unidad de ${producto.nombre} al carrito.`,
                        confirmButtonText: 'Aceptar'
                    });
                    return prevCart.map(item =>
                        item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                } else {
   
                    Swal.fire({
                        icon: 'warning',
                        title: 'Stock máximo alcanzado',
                        text: `No puedes agregar más de ${producto.stock} unidades de ${producto.nombre}.`,
                        confirmButtonText: 'Aceptar'
                    });
                    return prevCart; 
                }
            } else {
                
                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado',
                    text: `${producto.nombre} ha sido agregado al carrito.`,
                    confirmButtonText: 'Aceptar'
                });
                return [...prevCart, { ...producto, quantity: 1 }];
            }
        });
    };

    const totalPrice = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

    const createOrder = async (buyer) => {
        const items = cart.map(item => ({
            id: item.id,
            price: item.precio,
            title: item.nombre,
        }));

        const order = {
            buyer,
            items,
            total: totalPrice,
            date: serverTimestamp()
        };

        try {
            const docRef = await addDoc(collection(db, 'ordenes'), order);
            console.log("Orden creada con ID: ", docRef.id);
            limpiarCarrito(); // Limpia el carrito después de crear la orden
        } catch (error) {
            console.error("Error al crear la orden: ", error);
        }
    };

    const fetchOrderById = async (orderId) => {
        try {
            const orderRef = doc(db, "ordenes", orderId);
            const orderSnap = await getDoc(orderRef);
            if (orderSnap.exists()) {
                return orderSnap.data();
            } else {
                throw new Error("No se encontró la orden");
            }
        } catch (error) {
            console.error("Error fetching order: ", error);
            throw error;
        }
    };
    
    const eliminarDelCarrito = (id) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === id);
            
            if (existingProduct && existingProduct.quantity > 1) {
                return prevCart.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                return prevCart.filter(item => item.id !== id); 
            }
        });
    };

    const limpiarCarrito = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0); 

    return (
        <ItemsContext.Provider value={{ 
            productos, 
            loading, 
            agregarAlCarrito, 
            eliminarDelCarrito, 
            limpiarCarrito, 
            cartCount, 
            cart, 
            fetchOrderById, 
            createOrder, 
            totalPrice 
        }}>
            {children}
        </ItemsContext.Provider>
    );
};

export default ItemsContext;


