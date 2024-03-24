import { Routes, Route } from 'react-router-dom';
import PizzaDetails from './pages/PizzaDetails';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Parent from './components/ParentLayout';

import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Parent />}>
        <Route index path="/" element={<Home />} />
        <Route index path="/cart" element={<Cart />} />
        <Route index path="/pizza/:id" element={<PizzaDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
