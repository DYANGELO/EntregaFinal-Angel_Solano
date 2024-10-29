import ItemDetail from "./itemDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import ItemsContext from '../../context/ItemsContext';

const ItemDetailContainer = () => {
    const { productos, loading, agregarAlCarrito } = useContext(ItemsContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (productos.length > 0) {
            const product = productos.find(prod => prod.id === id);
            setProduct(product);
        }
    }, [productos, id]);

    const handleAddToCart = () => {
        if (product) {
            agregarAlCarrito(product);
        }
    };

    if (loading) {
        return <p>Cargando producto...</p>;
    }

    return (
        product ? (
            <>
                <ItemDetail product={product} />
                <button onClick={handleAddToCart}>Añadir al carrito</button>
            </>
        ) : <p>Producto no encontrado.</p>
    );
}

export default ItemDetailContainer;

