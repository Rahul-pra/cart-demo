import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HeaderComponent from "./components/header.component";
import addProduct from "./pages/Products/addProduct.page";
import cartPage from "./pages/cart.page";
import { history } from "./helper/history";

function App() {
  return (
    <Router history={history}>
      <div className="App">

        <HeaderComponent />

        <Route exact path="/" component={addProduct} />
        <Route exact path="/products/add" component={addProduct} />
        <Route exact path="/cart" component={cartPage} />
      </div>

    </Router>
  );
}

export default App;
