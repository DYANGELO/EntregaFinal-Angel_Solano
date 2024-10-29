import { Link } from "react-router-dom";

const Item = ( { product } ) => {
    return (
        <div key={product.id} className="card">
            <h2>{product.nombre}</h2>
            <h1>{product.categoria}</h1>
            <p>${product.precio}</p>
            <Link to={`/detail/${product.id}`}>Ver Caracteristicas</Link>
        </div>    
    )
}

export default Item