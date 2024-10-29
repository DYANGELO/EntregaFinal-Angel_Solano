import { HiMiniShoppingCart } from "react-icons/hi2";
import { useContext } from 'react';
import ItemsContext from '../../context/ItemsContext';
function CartWidget() {
  const { cartCount } = useContext(ItemsContext); 

  return (
    <div className='Carrito-C'>
      <HiMiniShoppingCart size="50px" />
      <span className='Cart-Count'>{cartCount}</span> 
    </div>
  );
}

export default CartWidget;

