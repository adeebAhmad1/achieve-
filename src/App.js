import React, { useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/index";
import "materialize-css/dist/css/materialize.min.css";
import AuthContextProvider from "./context/AuthContext";
import Signup from "./components/Signup";
import Forgot from "./components/Forgot";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import CreatePost from "./components/Home/CreatePost";
import Comments from "./components/utils/Comments";
import DataContextProvider from "./context/DataContext";
function App() {
  useEffect(() => {
    window.addEventListener("load", () =>
      document.querySelector(".loader_wrapper").classList.add("done")
    );
  }, []);
  return (
    <DataContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <div className="App">
            <Route path="/home" component={Home}/>
            <Route path="/home/:postId/comments" component={Comments} />
            <Route exact path="/home/createPost" component={CreatePost} />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    </DataContextProvider>
  );
}

export default App;
