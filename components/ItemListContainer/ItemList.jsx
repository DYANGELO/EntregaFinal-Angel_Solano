import Item from "./item"

const ItemList = ({products}) => {
    return (
        <div className="container">
            <div className="item-list">
                {products.map(product => <Item key={product.id} product={product}/>)}
            </div>
        </div>
    )
}

export default ItemList


