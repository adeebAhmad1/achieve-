import React, { Component, Fragment } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../config/firebase";
import { Toast } from "materialize-css";
import { Link } from "react-router-dom";
class ImageBox extends Component {
  static contextType = AuthContext;
  state = {
    likes: 0,
  };
  componentDidMount() {
    if(this.props.post.type === "post")this.setState({ likes: this.props.likes });
    if(this.props.post.type === "post"){
      if (this.props.post.likes.includes(this.context.user.uid)) {
        this.refs.like.innerHTML = "favorite";
        this.refs.like.parentNode.classList.add("liked")
      }
    }
  }
  componentWillReceiveProps(props) {
    if(props.post.type === "post")this.setState({ likes: props.post.likes });
  }
  render() {
    const {post: { text, image, likes, comments, id, date, uid, video,name,type,time, description },users,history} = this.props;
    const user = users.find((el) => el.uid === uid);
    return (
      <div className="f-card">
        <div className="header">
          <div className="options">
            <i className="fa fa-chevron-down"></i>
          </div>
          <img
            className="co-logo"
            src={
              user.image ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
            }
          />
          <div className="co-name">
            <Link to="/" onClick={(e)=>{
              e.preventDefault();
              let destination = `/inbox/${uid}`
              if(uid === this.context.user.uid){
                destination = `/dashboard`
              }
              history.push(destination)
            }}>
              {user.name}
            </Link>
          </div>
          <div className="time">
            <a href="/" onClick={(e) => e.preventDefault()}>
              {new Date(date).toLocaleTimeString()}{" "}
              {new Date(date).toDateString()}
            </a>{" "}
            · <i className="fa fa-globe"></i>
          </div>
        </div>
        {this.props.post.type === "post" ? <div>
        <div className="content">
          <p>{text}</p>
        </div>

        <div className="reference">
          {image ? <img className="reference-thumb" src={image} /> : ""}
          {video ? (
            <video
              style={{ width: `100%` }}
              src={video}
              controls={true}
            ></video>
          ) : (
            ""
          )}
        </div>
        </div>: <div>
          <p className="event"><span>Event Name: </span><span style={{fontWeight: `bold`}}> {name} </span></p>
          <p className="event"><span>Event Time:</span> <span style={{fontWeight: `bold`}}> {time} </span></p>
          <p className="event"><span>Event Description:</span> <span style={{fontWeight: `bold`}}> {description} </span></p>
          </div>}
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
                if (!likes.includes(uid)) {
                  likes.unshift(uid);
                  db.collection(type + "s")
                    .doc(id)
                    .update({ likes })
                    .then(() => {
                      like.textContent = "favorite";
                      this.refs.like.parentNode.classList.add("liked")
                    });
                } else {
                  const i = likes.indexOf(uid);
                  likes.splice(i, 1);
                  db.collection(type + "s")
                    .doc(id)
                    .update({ likes })
                    .then(() => {
                      like.textContent = "favorite_border";
                      this.refs.like.parentNode.classList.remove("liked")
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
              onClick={() => history.push(`/home/${id}/comments`)}
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
            {this.context.user.uid === uid ? (
              <span
                onClick={() => {
                  const file = image || video;
                  db.collection(type + "s")
                    .doc(id)
                    .delete()
                    .then(() => {
                      if(file){
                        storage.refFromURL(file).delete().then(()=>{
                          new Toast({html: "Post Deleted Successfully",classes: "green"})
                        }).catch((error) => {
                          new Toast({html: error.message,classes: "red"})
                        });
                      }
                    }).catch((error) => {
                      new Toast({html: error.message,classes: "red"})
                  });
                }}
              >
                <i className="material-icons">delete</i>Delete
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageBox;
