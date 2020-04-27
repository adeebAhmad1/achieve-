import React, { Component } from "react";
import { Link } from "react-router-dom";
class PostingBox extends Component {
  onFocus = (e) => {
    this.props.history.push("/home/createPost")
    e.target.blur();
  };
  render() {
    return (
      <div>
        <div className="fbComponent" style={{width: `40%`,margin: `20px auto`,border: `1px solid #777`,paddingTop: `20px`}}>
          <div className="row">
            <div className="col s12 m10 l10" style={{margin: `0 auto`}}>
              <input
                placeholder="What's on your mind?"
                id="post"
                type="text"
                onFocus={this.onFocus}
                className="validate form-input"
                style={{
                  border: `1px solid #777`,
                  borderRadius: `100rem`,
                  padding: `0 20px`,
                  cursor: `pointer`,
                  width: `100%`
                }}
              />
            </div>
            <div className="row" style={{marginBottom: `0`}}>
              <div className="col s6" style={{textAlign: `center`,
                  cursor: `pointer`,}}>
                <Link to="/home/event">
                <i className="material-icons">location_on</i>
                Add Event
                </Link>
              </div>
              <div className="col s6" style={{textAlign: `center`,
                  cursor: `pointer`,}}>
                <Link to="/home/createPost">
                <i className="material-icons">question_answer</i>
                Create Post
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// accept="audio/*"
export default PostingBox;
