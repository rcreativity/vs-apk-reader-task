import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import HeaderSection from './components/nav'
import FormSection from './components/form'
import ShowAllApk from './components/showApk'

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderSection />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <FormSection />
            </Route>
            <Route exact path="/show-all">
              <ShowAllApk />
            </Route>
          </Switch>
        </div>
      </Router>
      
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
