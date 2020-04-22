import React, { Component,createContext } from 'react'
import { db } from '../config/firebase';
export const DataContext = createContext()
class DataContextProvider extends Component {
  state={
    users: [],
    posts: [],
    loading: true
  }
  componentDidMount(){
    db.collection("users").get().then(snapShot=>{
      const users = []
      snapShot.forEach(doc=>{
        const user = doc.data();
        user.id = doc.id;
        users.push(user)
      })
      this.setState({users});
      this.getPosts();
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
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}

export default DataContextProvider