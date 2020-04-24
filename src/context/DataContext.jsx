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
    user: {}
  }
  componentDidMount(){
    this.getData()
  }
  componentDidUpdate(){
    if(this.state.user.uid){
      if(this.state.user.uid !== this.context.user.uid){
        console.log("MY Name is Adeeb")
      }
    }
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
          posts.push(post);
        });
        this.setState({posts,loading: false});
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