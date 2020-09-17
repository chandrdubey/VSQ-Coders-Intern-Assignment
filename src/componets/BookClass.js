import React, { Component } from "react";
import axios from "axios";
class BookClass extends Component {
  constructor() {
    super();
    this.state = {
      parentName: "",
      parentContactNo: "",
      email: "",
      nameOfChild: "",
      ageOfChild: "",
      apiData: [],
      courseData: {},
      courseSelect: "Select",
      x: -1,
      timeSlot: [],
      slotDate: "1999-02-23",
      slotTime: "Select",
      isLoading: true,
    };
  }

  componentDidMount() {
    let todayDate = new Date();
    let latestSlotDate = new Date();
    latestSlotDate.setHours(todayDate.getHours() + 4);
    const latestSlotDay = getDate(latestSlotDate);

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
          isLoading: false,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  //this function handle the changes in select course
  handleSelectChange = (event) => {
    this.setState({
      // courseData:this.state.apiData[event.target.value-1],
      x: event.target.value,
      courseData: this.state.apiData[event.target.value],
    });
    if(this.state.x !== -1)
    {
      this.setState({
        // courseData:this.state.apiData[event.target.value-1],
       courseSelect: this.state.apiData[event.target.value].course_name
      });
    }
    console.log(event.target.value);
    console.log(this.state.x);
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `${this.state.parentName} , ${this.state.parentContactNo}, ${this.state.email} ,
      ${this.state.ageOfChild}  ,${this.state.nameOfChild}, ${this.state.courseSelect},
      ${this.state.slotDate} , ${this.state.slotTime}`
    );
  };

  render() {
    console.log(Date.now());
    let todayDate = new Date();
    let timeSlots = [];
    const today = getDate(todayDate);
    //Getting last day of booking
    let lastDate = new Date();
    lastDate.setDate(todayDate.getDate() + 7);

    //converting in the format which we can use in html input type of date
    const lastDay = getDate(lastDate);
    console.log(this.state.courseData);

    //Checking if we got data from API
    if (this.state.courseData && this.state.courseData.slots) {
      //Getting time in hours and minutes
      let timeArr = getSlotInHours(this.state.courseData.slots);
      //Now checking if slot day is today. if it is then weill show the slot 4 hour after from now
      if (today === this.state.slotDate) {
        const hour = todayDate.getHours() + 4;

        timeSlots = timeArr.filter(
          (time) => parseInt(time.slotStart.substr(0, 2)) >= hour
        );
        console.log(`${timeSlots} hard`);
      }
      //if booking day is last then only slot will show which are before the present time
      else if (lastDay === this.state.slotDate) {
        const hour = lastDate.getHours();
        timeArr.map((time) =>
          console.log(parseInt(time.slotStart.substr(0, 2)))
        );
        timeSlots = timeArr.filter(
          (time) => parseInt(time.substr(0, 2)) <= hour
        );
      }
      //all slot will show
      else {
        timeSlots = timeArr;
      }
    }

    return this.state.isLoading ? (
      <div> Loadding</div>
    ) : (
      <div>
        <h2 className="text-center">Book a trial class </h2>
        <form className="mx-auto" onSubmit={this.handleSubmit}>
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Parent Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Parent Name"
              name="parentName"
              value={this.state.parentName}
              onChange={this.handleChange}
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
              name="parentContactNo"
              value={this.state.parentContactNo}
              onChange={this.handleChange}
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
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
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
              name="nameOfChild"
              value={this.state.nameOfChild}
              onChange={this.handleChange}
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
              name="ageOfChild"
              value={this.state.ageOfChild}
              onChange={this.handleChange}
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
              <option value="-1">Select</option>
              {this.state.apiData.length > 0 &&
                this.state.apiData.map((data, index) => (
                  <option value={index} key={data.course_id}>
                    {data.course_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group  course-select">
          <label htmlFor="exampleInputdate">Select Date</label>
            <input
              type="date"
              name="slotDate"
              id="exampleInputdate"
              className="form-control"
              value={this.state.slotDate}
              min={today}
              max={lastDay}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group  course-select">
            <label htmlFor="inputState">Book Trial Class</label>
            <select
              id="inputState"
              className="form-control"
              name="slotTime"
              value={this.state.slotTime}
              onChange={this.handleChange}
            >
              {timeSlots.length > 0 ? (
                timeSlots.map((slot, index) => (
                  <option
                    value={slot.slotStart + "-" + slot.slotEnd}
                    key={index}
                  >
                    {slot.slotStart + "-" + slot.slotEnd}
                  </option>
                ))
              ) : (
                <option value="select">No class available</option>
              )}
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
//it will give date in a format which use in html input type of date
const getDate = (todayDate) => {
  let dd = todayDate.getDate();
  let mm = todayDate.getMonth() + 1; //January is 0!
  let yyyy = todayDate.getFullYear();

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
//it will convert the tim stamp in houre and minutes
const getSlotInHours = (slots) => {
  let timeSlot = [];
  slots.forEach((slotInfo) => {
    let eachSlot = parseInt(slotInfo.slot);
    let date = new Date(eachSlot);
    // let endTime
    let hours = date.getHours();
    let slotEndHour = hours + 1;
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let slotEndTime = slotEndHour + ":" + minutes.substr(-2);
    // Will display time in 10:30:23 format
    let formattedTime = hours + ":" + minutes.substr(-2);
    //  console.log(formattedTime);
    timeSlot.push({ slotStart: formattedTime, slotEnd: slotEndTime });
  });
  timeSlot.sort();
  return timeSlot;
};
export default BookClass;
