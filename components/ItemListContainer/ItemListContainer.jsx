import './ItemListContainer.css';
import ItemList from './ItemList';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemsContext from '../../context/ItemsContext';

function ItemListContainer({ greeting }) {
    const { productos, loading } = useContext(ItemsContext);
    const { id } = useParams(); 
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        let productsToDisplay = productos;

        if (id) {
            productsToDisplay = productsToDisplay.filter(product => product.categoria === id);
        }

        if (filter) {
            productsToDisplay = productsToDisplay.filter(product =>
                product.nombre.toLowerCase().includes(filter.toLowerCase())
            );
        }

        setFilteredProducts(productsToDisplay);
    }, [id, productos, filter]);

    return (
        <div className="container">
            <h1 className="title-seccion">{greeting}</h1>
            <input
                type="text"
                placeholder="Buscar productos..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <ItemList products={filteredProducts} />
            )}
        </div>
    );
}

export default ItemListContainer;
