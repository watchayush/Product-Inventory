import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './Components/Navbar';
import Main from './Components/Main';
import SignIn from "./Components/SignIn";
import { Switch,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        {/* <h1>PRODUCT INVENTORY</h1> */}
      </header>
      {/* <Main/> */}
      <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/SignIn" component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
