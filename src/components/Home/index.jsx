import ImageBox from "../utils/ImageBox";
import PostingBox from "../utils/PostingBox";
import { AuthContext } from "../../context/AuthContext";
import React, { Component } from "react";
import { DataContext } from "../../context/DataContext"
import { Link } from "react-router-dom";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../utils/Loader";
class Home extends Component {
  static contextType = AuthContext
  state={
    posts: [],
  }
  componentDidMount() {
    setTimeout(() => {
      if (!this.context.isAuth) {
        this.props.history.push("/login");
      }
    }, 5000);
  }
  
  render() {
    const links = [{text: "Profile", link: "/dashboard"},{text: "Logout", link: "/login"},{text: "Inbox", link: "/inbox"}]
    return (
      <DataContext.Consumer>
        {(state)=>{
          state.posts.sort((a,b)=> b.date-a.date)
          return state.loading ? <Loader/> :
          <div>
            <Header links={links} history={this.props.history}/>
            <PostingBox history={this.props.history} />
            {state.posts.map((el,i) => {
              const { text, comments, likes, uid,image,id,date,video } = el;
              return (<ImageBox history={this.props.history} text={text} video={video} date={date} comments={comments} id={id} likes={likes} uid={uid} image={image} key={i} />)
            })}
            <Footer links={links} />
          </div>
        }}
      </DataContext.Consumer>
    );
  }
}

export default Home;
