(this["webpackJsonpvsq-intern-assignment"]=this["webpackJsonpvsq-intern-assignment"]||[]).push([[0],{18:function(e,t,a){e.exports=a(42)},23:function(e,t,a){},24:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(11),s=a.n(o),r=(a(23),a(24),a(12)),c=a(13),i=a(14),m=a(17),u=a(16),h=a(15),p=a.n(h),d=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).handleSelectChange=function(t){e.setState({x:t.target.value,courseData:e.state.apiData[t.target.value]}),-1!==e.state.x&&e.setState({courseSelect:e.state.apiData[t.target.value].course_name}),console.log(t.target.value),console.log(e.state.x)},e.handleChange=function(t){var a=t.target,n=a.name,l=a.value;e.setState(Object(r.a)({},n,l))},e.handleSubmit=function(t){t.preventDefault(),alert("".concat(e.state.parentName," , ").concat(e.state.parentContactNo,", ").concat(e.state.email," ,\n      ").concat(e.state.ageOfChild,"  ,").concat(e.state.nameOfChild,", ").concat(e.state.courseSelect,",\n      ").concat(e.state.slotDate," , ").concat(e.state.slotTime))},e.state={parentName:"",parentContactNo:"",email:"",nameOfChild:"",ageOfChild:"",apiData:[],courseData:{},courseSelect:"Select",x:-1,timeSlot:[],slotDate:"1999-02-23",slotTime:"Select",isLoading:!0},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=new Date,a=new Date;a.setHours(t.getHours()+4);var n=g(a);this.setState({slotDate:n}),p.a.get("https://script.google.com/macros/s/AKfycbzJ8Nn2ytbGO8QOkGU1kfU9q50RjDHje4Ysphyesyh-osS76wep/exec").then((function(t){console.log(t),e.setState({apiData:t.data,courseData:e.state.apiData[0],isLoading:!1})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){console.log(Date.now());var e=new Date,t=[],a=g(e),n=new Date;n.setDate(e.getDate()+7);var o=g(n);if(console.log(this.state.courseData),this.state.courseData&&this.state.courseData.slots){var s=f(this.state.courseData.slots);if(a===this.state.slotDate){var r=e.getHours()+4;t=s.filter((function(e){return parseInt(e.slotStart.substr(0,2))>=r})),console.log("".concat(t," hard"))}else if(o===this.state.slotDate){var c=n.getHours();s.map((function(e){return console.log(parseInt(e.slotStart.substr(0,2)))})),t=s.filter((function(e){return parseInt(e.substr(0,2))<=c}))}else t=s}return this.state.isLoading?l.a.createElement("div",null," Loadding"):l.a.createElement("div",null,l.a.createElement("h2",{className:"text-center"},"Book a trial class "),l.a.createElement("form",{className:"mx-auto",onSubmit:this.handleSubmit},l.a.createElement("div",{className:"form-group "},l.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Parent Name"),l.a.createElement("input",{type:"text",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Parent Name",name:"parentName",value:this.state.parentName,onChange:this.handleChange})),l.a.createElement("div",{className:"form-group "},l.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Parent Contact Number"),l.a.createElement("input",{type:"text",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Parent Contact Number",name:"parentContactNo",value:this.state.parentContactNo,onChange:this.handleChange})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Parent Email address"),l.a.createElement("input",{type:"email",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Enter email",name:"email",value:this.state.email,onChange:this.handleChange})),l.a.createElement("div",{className:"form-group "},l.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Name of Child"),l.a.createElement("input",{type:"text",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Child Name",name:"nameOfChild",value:this.state.nameOfChild,onChange:this.handleChange})),l.a.createElement("div",{className:"form-group "},l.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Age of Child"),l.a.createElement("input",{type:"text",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Age of Child",name:"ageOfChild",value:this.state.ageOfChild,onChange:this.handleChange})),l.a.createElement("div",{className:"form-group  course-select"},l.a.createElement("label",{htmlFor:"inputState"},"Select Course"),l.a.createElement("select",{id:"inputState",className:"form-control",value:this.state.x,onChange:this.handleSelectChange},l.a.createElement("option",{value:"-1"},"Select"),this.state.apiData.length>0&&this.state.apiData.map((function(e,t){return l.a.createElement("option",{value:t,key:e.course_id},e.course_name)})))),l.a.createElement("div",{className:"form-group  course-select"},l.a.createElement("label",{htmlFor:"exampleInputdate"},"Select Date"),l.a.createElement("input",{type:"date",name:"slotDate",id:"exampleInputdate",className:"form-control",value:this.state.slotDate,min:a,max:o,onChange:this.handleChange})),l.a.createElement("div",{className:"form-group  course-select"},l.a.createElement("label",{htmlFor:"inputState"},"Book Trial Class"),l.a.createElement("select",{id:"inputState",className:"form-control",name:"slotTime",value:this.state.slotTime,onChange:this.handleChange},t.length>0?t.map((function(e,t){return l.a.createElement("option",{value:e.slotStart+"-"+e.slotEnd,key:t},e.slotStart+"-"+e.slotEnd)})):l.a.createElement("option",{value:"select"},"No class available"))),l.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Submit")))}}]),a}(n.Component),g=function(e){var t=e.getDate(),a=e.getMonth()+1;return t<10&&(t="0"+t),a<10&&(a="0"+a),e.getFullYear()+"-"+a+"-"+t},f=function(e){var t=[];return e.forEach((function(e){var a=parseInt(e.slot),n=new Date(a),l=n.getHours(),o=l+1,s="0"+n.getMinutes(),r=o+":"+s.substr(-2),c=l+":"+s.substr(-2);t.push({slotStart:c,slotEnd:r})})),t.sort(),t},E=d;var v=function(){return l.a.createElement("div",{className:"App"},l.a.createElement(E,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.35e1c1d3.chunk.js.map