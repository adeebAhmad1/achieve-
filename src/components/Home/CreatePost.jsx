import React, { Component } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db, storageRef } from "../../config/firebase";
import { DataContext } from "../../context/DataContext";
class CreatePost extends Component {
  static contextType = AuthContext;
  state = {
    post: "",
    file: null,
    loading: false,
    fileURL: null,
    video: null,
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { file, post, video } = this.state;
    this.setState({ loading: true });
    if (file) {
      storageRef
        .child(`Images/${file.name}`)
        .put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((image) => {
            db.collection("posts")
              .add({
                image,
                uid: this.context.user.uid,
                text: post,
                comments: [],
                likes: [],
                date: Date.now(),
              })
              .then(() => {
                this.setState({ loading: false });
                this.closePostWindow();
              });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (video) {
      storageRef
        .child(`Videos/${video.name}`)
        .put(video)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((video) => {
            db.collection("posts")
              .add({
                video,
                uid: this.context.user.uid,
                text: post,
                comments: [],
                likes: [],
                date: Date.now(),
              })
              .then(() => {
                this.setState({ loading: false });
                this.closePostWindow();
              });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      db.collection("posts")
        .add({
          uid: this.context.user.uid,
          text: post,
          comments: [],
          likes: [],
          date: Date.now(),
        })
        .then(() => {
          this.closePostWindow();
        });
    }
  };
  componentDidMount() {
    setTimeout(() => {
      if (!this.context.isAuth) {
        this.props.history.push("/login");
      }
    }, 5000);
  }
  closePostWindow = () => {
    this.props.history.push("/");
  };
  handleFileSelection = (e) => {
    const files = e.target.files;
    if (files.length < 1) {
      return this.setState({ [e.target.name]: null });
    }
    const file = e.target.files[0];
    console.log(files);
    this.setState({ [e.target.name]: file });
    if (e.target.name === "file") {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      setTimeout(() => {
        this.setState({ fileURL: fileReader.result });
        console.log(fileReader);
      }, 100);
    }
  };
  render() {
    return this.context.isAuth ? (
      <DataContext.Consumer>
        {(state) => {
          const user = state.users.find(
            (el) => el.uid === this.context.user.uid
          );
          return state.loading ? (
            <div className="loader_wrapper">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="new-post-outer">
              <div
                style={{
                  width: `100%`,
                  height: `100%`,
                  position: `absolute`,
                  zIndex: `-1`,
                }}
                onClick={this.closePostWindow}
              ></div>
              <div className="new-post-inner">
                <h3 className="center">
                  Create Post{" "}
                  <span
                    onClick={this.closePostWindow}
                    className="material-icons right icon-close"
                  >
                    close
                  </span>
                </h3>
                <span className="line"></span>
                <div className="user">
                  <img
                    src={
                      user.image ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                    }
                    alt=""
                    width="45"
                    height="45"
                  />
                  <span className="user_name"> {user.name} </span>
                </div>
                {this.state.loading ? (
                  <div className="loader_wrapper">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <form onSubmit={this.onSubmit}>
                    <div className="posting_box">
                      <textarea
                        name="post"
                        onChange={this.handleChange}
                        value={this.state.post}
                        className="posting_input browser-default"
                        placeholder="What's on your mind?"
                      ></textarea>
                    </div>
                    {this.state.fileURL ? (
                      <div className="image_wrapper">
                        <img
                          src={this.state.fileURL}
                          alt="ABC"
                          width="100"
                          style={{ borderRadius: 0 }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="posting_button_wrapper">
                      <button
                        disabled={
                          this.state.video
                            ? false
                            : this.state.file
                            ? false
                            : !this.state.post
                        }
                      >
                        Post
                      </button>
                    </div>
                    <div className="line"></div>
                    <div className="right" style={{ marginRight: `30px` }}>
                      {" "}
                      <input
                        accept="image/*"
                        onChange={this.handleFileSelection}
                        type="file"
                        name="file"
                        style={{ display: `none` }}
                        id="file"
                      />{" "}
                      <label
                        htmlFor="file"
                        style={{ cursor: `pointer` }}
                        className="material-icons"
                      >
                        photo_library
                      </label>
                    </div>
                    <div className="right" style={{ marginRight: `30px` }}>
                      {" "}
                      <input
                        accept="video/*"
                        name="video"
                        onChange={this.handleFileSelection}
                        type="file"
                        style={{ display: `none` }}
                        id="file2"
                      />{" "}
                      <label
                        htmlFor="file2"
                        style={{ cursor: `pointer` }}
                        className="material-icons"
                      >
                        videocam
                      </label>
                    </div>
                    <div className="line"></div>
                  </form>
                )}
              </div>
            </div>
          );
        }}
      </DataContext.Consumer>
    ) : (
      <div className="loader_wrapper">
        <div className="loader"></div>
      </div>
    );
  }
}

export default CreatePost;
