import React, { useEffect } from 'react';
import { Datepicker } from 'materialize-css';

const EventDate = ({setDate,onKeyUp,date}) => {
  useEffect(()=>{
    Datepicker.init(document.querySelector(".datepicker"), {
      yearRange: [1900, 2030],defaultDate: new Date("07/07/2020")
    });
    window.interval = setInterval(() => {
      if(document.querySelector(".datepicker"))setDate(document.querySelector(".datepicker").value);
    }, 1000);
    return ()=>{
      clearInterval(window.interval)
    }
  },[])
  return (
    <div className="wrap-input100" style={{marginTop: `45px`}}>
      <input type="text" name="date" maxLength="100" onFocus={() => document.querySelector(".datepicker-done").addEventListener("click", () =>document.querySelector(".datepicker").classList.add("has-val"))} className="input100 datepicker browser-default" required id="id_username" onKeyUp={onKeyUp} value={date}/>
      <span className="focus-input100" data-placeholder="Event Date"></span>
    </div>
  );
};

export default EventDate;