import React, { Component } from "react";
import { db } from "../../config/firebase";
import { DataContext } from "../../context/DataContext";
import Loader from "./Loader";
import { AuthContext } from "../../context/AuthContext";
import EventDate from "./Date";
import { Toast } from "materialize-css";

class Event extends Component {
  static contextType = AuthContext;
  state={
    name: "",
    date: "",
    description: "",
    loading: false
  }
  closePostWindow = () => {
    this.props.history.push("/");
  };
  onSubmit= (e)=>{
    e.preventDefault();
    const {name ,date: time , description} = this.state;
    const date = Date.now();
    const { uid } = this.context.user;

    const event = {name,date,time,description,likes: [], comments: [],uid}
    this.setState({loading: true});
    db.collection("events").add(event).then(this.closePostWindow).catch(error=>{
      this.setState({loading: false})
      new Toast({html: error.message});
    })
  }
  setDate=(date)=> this.setState({date})
  onKeyUp=(e)=>e.target.value.length>0?e.target.classList.add("has-val"):e.target.classList.remove("has-val");
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <DataContext.Consumer>
        {(state)=>{
          return state.loading ? <Loader/> : this.state.loading ? <Loader/> : <div className="new-post-outer">
          <div style={{width: `100%`,height: `100%`,position: `absolute`,zIndex: `-1`,}} onClick={this.closePostWindow}></div>
          <div className="new-post-inner">
            <div className="outer_box">
              <h3>Create Event<span onClick={this.closePostWindow} className="material-icons right icon-close">close</span>
              </h3>
              <form action="" onSubmit={this.onSubmit}>
                <div className="wrap-input100" style={{marginTop: `45px`}}>
                  <input type="text" name="name" maxLength="100" className="input100 browser-default" required id="id_username" onKeyUp={this.onKeyUp} value={this.state.name} onChange={this.handleChange} />
                  <span className="focus-input100" data-placeholder="Event Name"></span>
                </div>
                <EventDate setDate={this.setDate} onKeyUp={this.onKeyUp} date={this.state.date} />
                <div className="wrap-input100" style={{marginTop: `45px`}}>
                  <textarea type="text" rows="5" style={{height: `100px`}} name="description" maxLength="100" className="input100 browser-default" required id="id_username" onKeyUp={this.onKeyUp} value={this.state.description} onChange={this.handleChange} ></textarea>
                  <span className="focus-input100" data-placeholder="Event Description"></span>
                </div>
                <div className="container-login100-form-btn">
                  <button disabled={!this.state.name || !this.state.date || !this.state.description} type="submit" className="login100-form-btn">
                    Add Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        }}
      </DataContext.Consumer>
    );
  }
}

export default Event;
