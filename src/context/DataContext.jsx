import React, { Component,createContext } from 'react'
import { db } from '../config/firebase';
import { AuthContext } from './AuthContext';
import { Toast } from 'materialize-css';
export const DataContext = createContext()
class DataContextProvider extends Component {
  static contextType = AuthContext;
  state={
    users: [],
    posts: [],
    loading: true,
    user: {},
    events: []
  }
  componentDidMount(){
    this.getData()
  }
  getData = ()=>{
    this.setState({loading: true})
    db.collection("users").onSnapshot(snapShot=>{
      const users = []
      snapShot.forEach(doc=>{
        const user = doc.data();
        user.id = doc.id;
        users.push(user);
      })
      const user = users.find(user=> user.uid === this.context.user.uid) || {};
      this.setState({user})
      this.setState({users});
      this.getPosts()
    })
  }
  getPosts = ()=>{
    db.collection("posts")
      .onSnapshot((snapShot) => {
        const posts = [];
        snapShot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          post.type= "post"
          posts.push(post);
        });
        this.setState({posts});
        this.getEvents()
      });
  }
  getEvents = ()=>{
    db.collection("events")
      .onSnapshot((snapShot) => {
        const events = [];
        snapShot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          post.type= "event"
          events.push(post);
        });
        this.setState({events,loading: false});
        console.log("HELLO")
      });
  }
  render () {
    return (
      <DataContext.Provider value={{...this.state,getData:this.getData}}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}

export default DataContextProvider