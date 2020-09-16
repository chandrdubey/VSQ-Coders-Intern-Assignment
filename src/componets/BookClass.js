import React, { Component } from "react";
import axios from "axios";
class BookClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      courseData: {},
      courseStatus: false,
      courseMenu:"Select"
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://script.google.com/macros/s/AKfycbzJ8Nn2ytbGO8QOkGU1kfU9q50RjDHje4Ysphyesyh-osS76wep/exec"
      )
      .then((response) => {
        console.log(response);
        // handle success

        this.setState({
          apiData: response.data,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  handleSelectCourse = (course) => {
   
    console.log("hello")
      this.setState({
        courseData: course,
        courseStatus: true,
        courseMenu: course.course_name
      });
  };
  handleMenu = (event) =>{
    event.preventDefault();
  }
  handleSelectDefault = () => {
    this.setState({
      courseData: {},
      courseStatus: false,
    });
  };
  render() {
    return (
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
          <div className="dropdown">
            <button
              className="btn dropdown-toggle btn-dropdown"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={this.handleMenu}
            >
              {this.state.courseMenu}
            </button>
           
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.state.apiData.length > 0 &&
              this.state.apiData.map((course) => (
                <button
                className="dropdown-item"
                key={course.course_id}
                onClick={() => this.handleSelectCourse(course)}
              >
               {course.course_name}
              </button>

              ))}
            </div>
          </div>
          {/* <div className="form-group  course-select">
            <label htmlFor="inputState">Select Course</label>
            <select
              id="inputState"
              className="form-control"
              value="0"
              onChange={() => this.handleSelectCourse()}
            >
              <option value="0">Select</option>
              {this.state.apiData.length > 0 &&
                this.state.apiData.map((course) => (
                  <option key={course.course_id} value={course.course_id + 1}>
                    {course.course_name}
                  </option>
                ))}
            </select>
          </div> */}
          {this.courseStatus && (
            <>
              <input type="date" min="2013-10-01" max="2013-10-20" />
            </>
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default BookClass;
