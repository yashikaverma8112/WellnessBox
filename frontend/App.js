
import './App.css';
import { Home } from './screen/Home';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Login } from './screen/Login';
import Signup from './screen/Signup.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import { MyOrder } from './screen/MyOrder.jsx';

function App() {
  return (
    <CartProvider>

    <Router>
    <div>
        <Routes>
           <Route exact path='/' element={<Home />}></Route>
           <Route exact path='/login' element={<Login />}></Route>
           <Route exact path='/createUser' element={<Signup />}></Route>
           <Route exact path='/myOrder' element={<MyOrder />}></Route>

        </Routes>
    </div>
    </Router>
    </CartProvider>
  );
  }

export default App;
