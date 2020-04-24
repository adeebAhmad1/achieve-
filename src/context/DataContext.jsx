import React, { Component,createContext } from 'react'
import { db } from '../config/firebase';
import { AuthContext } from './AuthContext';
export const DataContext = createContext()
class DataContextProvider extends Component {
  static contextType = AuthContext;
  state={
    users: [],
    posts: [],
    chat: [],
    loading: true
  }
  componentDidMount(){
    db.collection("users").onSnapshot(snapShot=>{
      const users = []
      snapShot.forEach(doc=>{
        const user = doc.data();
        user.id = doc.id;
        users.push(user)
      })
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
          posts.push(post);
        });
        this.getChat()
        this.setState({posts});
      });
  }
  getChat = ()=>{
    db.collection("chat")
      .onSnapshot((snapShot) => {
        const chats = [];
        snapShot.forEach((doc) => {
          const oneChat = doc.data();
          oneChat.id = doc.id;
          chats.push(oneChat);
        });
        const chat = chats.filter(el=> el.users.includes(this.context.user.uid));
        this.setState({chat,loading: false});
      });
  }
  render () {
    return (
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}

export default DataContextProvider