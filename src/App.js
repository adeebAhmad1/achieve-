import React,{useEffect} from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/index";
import "materialize-css/dist/css/materialize.min.css";
import AuthContextProvider from "./context/AuthContext";
import Signup from "./components/Signup";
import Forgot from "./components/Forgot"
import Dashboard from "./components/Dashboard";
function App() {
  useEffect(()=>{
    window.addEventListener("load",()=> document.querySelector(".loader_wrapper").classList.add("done"))
  },[])
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
