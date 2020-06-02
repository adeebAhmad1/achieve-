import ImageBox from "../utils/ImageBox";
import PostingBox from "../utils/PostingBox";
import { AuthContext } from "../../context/AuthContext";
import React, { Component } from "react";
import { DataContext } from "../../context/DataContext"
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../utils/Loader";
import { db } from "../../config/firebase";
import { Toast } from "materialize-css";
class Home extends Component {
  _isMounted = false
  static contextType = AuthContext
  state={
    chats: [],
    loading: true,
    users: []
  }
  componentDidMount() {
    this._isMounted = true
    db.collection("users").get().then(snapShot=>{
      const users = []
      snapShot.forEach(doc=>{
        const user = doc.data();
        users.push(user);
      });
      this.setState({users});
      db.collection("chat").onSnapshot(snapShot=>{
        const allchats = [];
        snapShot.forEach(doc=>{
          const chat = doc.data();
          chat.id = doc.id
          allchats.push(chat)
        });
        const chats = allchats.filter(chat=> chat.users.includes(this.context.user.uid));
        this.setState({chats,loading: false});
        window.timeout = setTimeout(() => {
          if (!this.context.isAuth) {
            this.props.history.push("/login");
          }
        }, 7000);
      })
    })
    
  }
  componentWillUnmount(){
    clearTimeout(window.timeout);
    this._isMounted = false
  }
  componentDidUpdate(){
    if(this._isMounted){
      this.state.chats.forEach(el=>{
        if(el.read) return;
        else{
          if(el.chatting[el.chatting.length -1].uid !== this.context.user.uid){
            const user = this.state.users.find(({uid})=> uid === el.chatting[el.chatting.length -1].uid)
            new Toast({html: `${user.name} : ${el.chatting[el.chatting.length -1].message}`,classes: "myColor"});
            db.collection("chat").doc(el.id).update({read: true})
          }
        }
      })
    }
  }
  render() {
    const links = [{text: "Profile", link: "/dashboard"},{text: "Logout", link: "/login"},{text: "Inbox", link: "/inbox"}]
    return (
      this.state.loading ? <Loader /> : <DataContext.Consumer>
      {(state)=>{
        const posts = [...state.posts,...state.events]
        posts.sort((a,b)=> b.date-a.date);
        return state.loading ? <Loader/> :
        <div>
          <Header links={links} history={this.props.history}/>
          <PostingBox history={this.props.history} />
          {posts.map((el,i) => {
            return (<ImageBox history={this.props.history} users={state.users} post={el} key={i} />)
          })}
          <Footer links={links} />
        </div>
      }}
    </DataContext.Consumer>
    );
  }
}

export default Home;
