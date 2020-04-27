import React, { Component } from "react";
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
import UploadImage from "./components/Signup/UploadImage";
import Chat from "./components/Chat";
import Inbox from "./components/Chat/Inbox";
import Event from "./components/utils/Event";

class App extends Component {
  componentDidMount() {
    document.querySelector(".loader_wrapper").classList.add("done");
  }
  render() {
    return (
      <AuthContextProvider>
        <DataContextProvider>
          <BrowserRouter>
            <div className="App">
              <Route path="/home" component={Home} />
              <Route path="/home/:postId/comments" component={Comments} />
              <Route exact path="/home/createPost" component={CreatePost} />
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/inbox/:reciverId"
                component={Chat}
              />
              <Route
                exact
                path="/inbox"
                component={Inbox}
              />
              <Route path="/home/event" component={Event} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/addpicture" component={UploadImage} />
              <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
          </BrowserRouter>
        </DataContextProvider>
      </AuthContextProvider>
    );
  }
}

export default App;
