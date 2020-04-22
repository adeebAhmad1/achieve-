import ImageBox from "../utils/ImageBox";
import PostingBox from "../utils/PostingBox";
import { AuthContext } from "../../context/AuthContext";
import React, { Component } from "react";
import { DataContext } from "../../context/DataContext"
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
    return (
      <DataContext.Consumer>
        {(state)=>{
          state.posts.sort((a,b)=> b-a)
          return state.loading ? <div className="loader_wrapper">
            <div className="loader"></div>
          </div> :
          <div>
            <h1>Archieve+</h1>
            <PostingBox history={this.props.history} />
            {state.posts.map((el,i) => {
              const { text, comments, likes, uid,image,id,date } = el;
              return (<ImageBox history={this.props.history} text={text} date={date} comments={comments} id={id} likes={likes} uid={uid} image={image} key={i} />)
            })}
          </div>
        }}
      </DataContext.Consumer>
    );
  }
}

export default Home;
