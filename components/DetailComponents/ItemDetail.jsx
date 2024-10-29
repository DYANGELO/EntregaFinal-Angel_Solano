const ItemDetail = ({ product }) => {
    return (
        <div className="card">
            <h2>Juego: {product.nombre}</h2>
            <p>Categoria: {product.categoria}</p>
            <p>${product.precio}</p>
            <p>Stock: {product.stock}</p>
            <p>{product.descripcion}</p>
        </div>
    );
};

export default ItemDetail;
