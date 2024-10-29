import Navbar from '../components/Navbar/Navbar'
import CartWidget from '../components/CartWidget/CartWidget'
import ItemListContainer from '../components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from '../components/DetailComponents/ItemDetailContainer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ItemsProvider } from '../context/ItemsContext'
import CartDetail from '../components/CartWidget/CartDetail'
import Page404 from '../components/ItemsToComp/Page404'
import CheckOut from '../components/Check/CheckOut'
import CheckOutDetail from '../components/Check/DetailCheckOut'


function App() {



  return (
    <>
        <BrowserRouter>
          <ItemsProvider>
          <Navbar/>
            <Routes>
              <Route path="/" element={<ItemListContainer greeting={"Todos los Productos"}/>} />
              <Route path="/category/:idCategory" element={<ItemListContainer greeting={"Todos los Productos"} />} />
              <Route path="/detail/:id" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<CartDetail />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/checkout/:orderId" element={<CheckOutDetail />} />
              <Route path="*" element={<Page404 />} />
            </Routes> 
          </ItemsProvider>
        </BrowserRouter>

    </>
  )
}

export default App
