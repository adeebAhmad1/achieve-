import React, { Component } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../config/firebase";
class ImageBox extends Component {
  static contextType = AuthContext;
  state = {
    user: {},
    likes: 0
  };
  componentDidMount() {
    this.setState({ likes: this.props.likes });
    db.collection("users")
      .get()
      .then((snapShot) => {
        const users = [];
        snapShot.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          users.push(user);
        });
        const user = users.find((el) => el.uid === this.props.uid);
        this.setState({ user });
      });
    if (this.props.likes.includes(this.context.user.uid)) {
      this.refs.like.innerHTML = "favorite";
    }
  }
  componentWillReceiveProps(props) {
    this.setState({ likes: props.likes });
  }
  render() {
    const { text, image, likes, comments, id,date ,uid,video} = this.props;
    return (
      <div className="f-card">
        <div className="header">
          <div className="options">
            <i className="fa fa-chevron-down"></i>
          </div>
          <img className="co-logo" src="http://placehold.it/40x40" />
          <div className="co-name">
            <a href="/" onClick={(e) => e.preventDefault()}>
              {this.state.user.name}
            </a>
          </div>
          <div className="time">
            <a href="/" onClick={(e) => e.preventDefault()}>
              {new Date(date).toLocaleTimeString()}{" "}
              {new Date(date).toDateString()}
            </a>{" "}
            · <i className="fa fa-globe"></i>
          </div>
        </div>
        <div className="content">
          <p>{text}</p>
        </div>

        <div className="reference">
          {image ? <img className="reference-thumb" src={image} /> : ""}
          {video ? <video style={{width: `100%`}} src={video} controls={true}></video> : ""}
        </div>
        <span className="line" style={{ height: `1px` }}></span>
        <div className="" style={{ marginBottom: `30px` }}>
          <div className="left"> {likes.length} Likes </div>
          <div className="right"> {comments.length} Comments </div>
        </div>
        <div className="social">
          <div className="social-content"></div>
          <div className="social-buttons">
            <span
              data-fill="favorite"
              onClick={() => {
                const { like } = this.refs;
                const { uid } = this.context.user;
                if (!this.props.likes.includes(uid)) {
                  likes.unshift(uid);
                  db.collection("posts")
                    .doc(id)
                    .update({ likes })
                    .then(() => {
                      like.textContent = "favorite";
                    });
                } else {
                  const i = likes.indexOf(uid);
                  likes.splice(i, 1);
                  db.collection("posts")
                    .doc(id)
                    .update({ likes })
                    .then(() => {
                      like.textContent = "favorite_border";
                    });
                }
              }}
            >
              <i className="material-icons" ref="like" data-fill="favorite">
                favorite_border
              </i>
              Like
            </span>
            <span
              onClick={() => this.props.history.push(`/home/${id}/comments`)}
              onMouseEnter={() => {
                const { comment } = this.refs;
                comment.innerHTML = "chat";
              }}
              onMouseLeave={() => {
                const { comment } = this.refs;
                comment.innerHTML = "chat_bubble_outline";
              }}
            >
              <i className="material-icons" ref="comment">
                chat_bubble_outline
              </i>
              Comment
            </span>
            {this.context.user.uid === uid ? <span onClick={()=>{
              db.collection("posts").doc(id).delete().then(()=>{
                console.log("Deleted")
              })
            }}>
              <i className="material-icons">delete</i>Delete
            </span> : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageBox;
