import React, { Component } from "react";
import firebase, { storageRef, db } from "../../config/firebase";
import { DataContext } from "../../context/DataContext";
import { Toast } from "materialize-css";
import Loader from "../utils/Loader";
class UploadImage extends Component {
  static contextType = DataContext;
  state = {
    file: null,
    fileURL: null,
  };
  onChange = (e) => {
    const files = e.target.files;
    if (files.length < 1) {
      return this.setState({ file: null });
    }
    const file = e.target.files[0];
    this.setState({ file });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    setTimeout(() => {
      this.setState({ fileURL: fileReader.result });
      console.log(fileReader.result);
    }, 400);
  };
  showError = (error)=>{
    this.setState({loading: false});
    new Toast({html: error.message,classes: `red`})
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { file } = this.state;
    const { uid } = firebase.auth().currentUser;
    if(file){
      storageRef
      .child(`profile/${file.name}`)
      .put(file)
      .then((snapShot) => {
        snapShot.ref.getDownloadURL().then((image) => {
          const user = this.context.users.find((el) => el.uid === uid);
          db.collection("users").doc(user.id).update({ image }).then(()=>{
            this.props.history.push("/")
          }).catch(this.showError)
        }).catch(this.showError);
      }).catch(this.showError);
    } else{
      new Toast({html: "Please Select an image.",classes: `red`})
    }
  };
  render() {
    return this.context.loading ? (
      <Loader/>
    ) : (
      <form onSubmit={this.onSubmit} className="uploadImage">
        <div className="container">
          <h1>
            Acheve Church  Plus<small>Upload Image</small>
          </h1>
          <div className="avatar-upload">
            <div className="avatar-edit">
              <input
                type="file"
                id="imageUpload"
                onChange={this.onChange}
                accept="image/*"
              />
              <label for="imageUpload" className="material-icons">
                create
              </label>
            </div>
            <div className="avatar-preview">
              <div
                id="imagePreview"
                style={{ backgroundImage: `url(${this.state.fileURL})` }}
              ></div>
            </div>
          </div>
          <div className="container-login100-form-btn">
            <button
              disabled={!this.state.file}
              className="login100-form-btn"
              type="submit"
            >
              Upload Picture
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default UploadImage;
