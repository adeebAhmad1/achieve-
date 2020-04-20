import React from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/index";
import "materialize-css/dist/css/materialize.min.css";
import AuthContextProvider from "./context/AuthContext";
import Signup from "./components/Signup";
import Forgot from "./components/Forgot"
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="App">
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
