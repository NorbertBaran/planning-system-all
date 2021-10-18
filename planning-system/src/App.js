import './App.css';
import Head from "./components/Head/Head";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AuthPage from "./components/Auth/AuthPage";
import Panel from "./components/Panel/Panel";
import Redirect from "./components/Redirect/Redirect";

function App() {
  return (
    <div className='App'>
        <Router>
            <Route path='/' exact render={()=>(<Redirect to='/auth'/>)}/>
            <Route path='/auth' component={AuthPage}/>
            <Route path='/admin' component={Panel}/>
            <Route path='/employer' component={Panel}/>
        </Router>
    </div>
  );
}

export default App;
