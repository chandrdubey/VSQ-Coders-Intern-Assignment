import React, { Component } from "react";
import axios from "axios";
class BookClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      courseData: {},
      courseStatus: false,
      courseMenu: "Select",
      x: 1,
      timeSlot: [],
      slotDate: "1999-02-23",
      slotTime: "Select",
      isLoading:true
    };
  }

  componentDidMount() {
    let todayDate = new Date();
    let latestSlotDate = new Date();
    latestSlotDate.setHours(todayDate.getHours() + 4);
    const latestSlotDay = getDate(latestSlotDate);
    // console.log(`hell ${latestSlotDay}`)
    this.setState({
      slotDate: latestSlotDay,
    });
    axios
      .get(
        "https://script.google.com/macros/s/AKfycbzJ8Nn2ytbGO8QOkGU1kfU9q50RjDHje4Ysphyesyh-osS76wep/exec"
      )
      .then((response) => {
        console.log(response);
        // handle success

        this.setState({
          apiData: response.data,
          courseData: this.state.apiData[0],
          isLoading:false
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  handleSelectChange = (event) => {
    this.setState({
      // courseData:this.state.apiData[event.target.value-1],
      x: event.target.value,
      courseData: this.state.apiData[event.target.value - 1],
    });
    console.log(event.target.value);
    console.log(this.state.x);

   // console.log(this.state.courseData);

    //   this.setState({
    //     courseData: course,
    //     courseStatus: true,
    //     courseMenu: course.course_name
    //   });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleMenu = (event) => {
    event.preventDefault();
  };
  handleSelectDefault = () => {
    this.setState({
      courseData: {},
      courseStatus: false,
    });
  };
  render() {
    console.log(Date.now());
    let todayDate = new Date();

    const today = getDate(todayDate);
    //  console.log(today)
    let lastDate = new Date();
    lastDate.setDate(todayDate.getDate() + 7);
    //  console.log(lastDate);
    const lastDay = getDate(lastDate);
    console.log(this.state.courseData);
    let timeSlots;
    //   console.log(lastDay);
    if (this.state.courseData && this.state.courseData.slots) {
      let timeArr = getSlotInHours(this.state.courseData.slots);
      
      console.log(`${today} = ${this.state.slotDate}`)
      if(today === this.state.slotDate)
      {
        const hour = todayDate.getHours()+4;
        timeArr.map(time => console.log( parseInt(time.substr(0,2))))
       
        timeSlots = timeArr.filter(time => parseInt(time.substr(0,2)) >= hour )
        console.log(`${timeSlots} hard`);
      }
     
    }

    return this.state.isLoading ?(<div> Loadding</div>) : (
      <div>
        <h2 className="text-center">Book your trial class today </h2>
        <form className="mx-auto">
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Parent Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Parent Name"
            />
          </div>
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Parent Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Parent Contact Number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Parent Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Name of Child</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Child Name"
            />
          </div>

          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Age of Child</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Age of Child"
            />
          </div>
          <div className="form-group  course-select">
            <label htmlFor="inputState">Select Course</label>
            <select
              id="inputState"
              className="form-control"
              value={this.state.x}
              onChange={this.handleSelectChange}
            >
              <option value="1">Scratch Junior</option>
              <option value="2">Game Development</option>
              <option value="3">App Development</option>
              <option value="4">Web Development</option>
            </select>
          </div>
          <div className="form-group ">
            <input
              type="date"
              name="slotDate"
              value={this.state.slotDate}
              min={today}
              max={lastDay}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group  course-select">
            <label htmlFor="inputState">Select Course</label>
            <select
              id="inputState"
              className="form-control"
              value={this.state.slotTime}
              onChange={this.handleSelectChange}
            >
             
             { timeSlots ? timeSlots.map((slot,index) =>( <option value={slot} key={index} >{slot}</option>)
             
             ) :  <option value="select">No class available</option>}
              
            
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const getDate = (todayDate) => {
  let dd = todayDate.getDate();
  let mm = todayDate.getMonth() + 1; //January is 0!
  let yyyy = todayDate.getFullYear();
  console.log(todayDate.toString());
  // let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  let today = yyyy + "-" + mm + "-" + dd;
  return today;
};

const getSlotInHours = (slots) => {
  let timeSlot = [];
  slots.forEach((slotInfo) => {
    let eachSlot = parseInt(slotInfo.slot);
    let date = new Date(eachSlot);
    // let endTime
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp

    // Will display time in 10:30:23 format
    let formattedTime = hours + ":" + minutes.substr(-2);
  //  console.log(formattedTime);
    
    //console.log(date);
     timeSlot.push(formattedTime);
  });
  return timeSlot;
};
export default BookClass;
