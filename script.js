function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleBreak",










































    () => {
      //cleanup
      if (this.state.timerId) {
        document.getElementById("beep").volume = 0.2;
        document.getElementById("beep").play();
        clearInterval(this.state.timerId);
        this.setState({ elapsed: 0, timerId: 0 });
      }

      const breakId = setInterval(() => {
        //change to session timer
        if (
        this.state.elapsed > this.state.breakLength * 60 &&
        this.state.onBreak == true)

        this.handleCounter();

        //handle last iteration of timerInterval
        if (
        this.state.onBreak == false &&
        this.state.breakId == this.state.timerId)
        {
          this.setState({ onBreak: true });
        } else {
          //actual interval
          this.setState(state => ({
            elapsed: state.elapsed + 1,
            timeSec: Math.floor((state.breakLength * 60 - state.elapsed) % 60),
            timeMin: Math.floor((state.breakLength * 60 - state.elapsed) / 60) }));

        }
      }, 1000);
      this.setState({
        timerId: breakId,
        breakId: breakId });

    });_defineProperty(this, "handleCounter",

    () => {
      //cleanup
      if (this.state.timerId) {
        document.getElementById("beep").volume = 0.2;
        document.getElementById("beep").play();
        clearInterval(this.state.timerId);
        this.setState({
          elapsed: -1,
          timerId: 0,
          onBreak: false,
          timeSec: 0,
          timeMin: this.state.sessionLength });

      }
      //initial increase to skip one iteration
      this.setState(state => ({
        elapsed: state.elapsed + 1,
        timeSec: Math.floor(
        (this.state.sessionLength * 60 - this.state.elapsed) % 60),

        timeMin: Math.floor(
        (this.state.sessionLength * 60 - this.state.elapsed) / 60),

        onBreak: false }));


      const newTimerId = setInterval(() => {
        //switch to break
        if (
        this.state.elapsed >= this.state.sessionLength * 60 &&
        this.state.onBreak == false)
        {
          this.handleBreak();
        } else {
          if (this.state.onBreak == true && this.state.timerId)
          this.setState({ onBreak: false });
          //timerInterval
          this.setState(state => ({
            elapsed: this.state.elapsed + 1,
            timeSec: Math.floor(
            (this.state.sessionLength * 60 - this.state.elapsed) % 60),

            timeMin: Math.floor(
            (this.state.sessionLength * 60 - this.state.elapsed) / 60),

            onBreak: false }));

        }
      }, 1000);
      this.setState({ timerId: newTimerId });
    });_defineProperty(this, "handleClick",

    () => {
      this.setState(state => ({ running: !state.running }));
      if (this.state.timerId) {
        clearInterval(this.state.timerId);
        this.setState(state => ({ timerId: 0 }));
        return;
      }

      //go to last function
      if (this.state.onBreak == false) {
        this.handleCounter();
      }
      if (this.state.onBreak == true) {
        this.handleBreak();
      }
    });this.state = { breakLength: 5, sessionLength: 25, running: false, elapsed: 0, timerId: 0, breakId: 0, timeSec: 0, timeMin: 0, onBreak: false };this.decrement = this.decrement.bind(this);this.increment = this.increment.bind(this);this.reset = this.reset.bind(this);}increment(e, type) {if (this.state.running == false && this.state[type] < 60) this.setState(state => ({ [type]: state[type] + 1 }));}decrement(e, type) {if (this.state.running == false && this.state[type] > 1) this.setState(state => ({ [type]: state[type] - 1 }));}reset() {document.getElementById("beep").pause();document.getElementById("beep").currentTime = 0;clearInterval(this.state.timerId);this.setState({ breakLength: 5, sessionLength: 25, running: false, elapsed: 0, timerId: 0, timeSec: 0, timeMin: 0, onBreak: false });}

  render() {
    {
      /*display of minutes and seconds*/
    }
    var minutes;
    if (this.state.onBreak == false) {
      if (
      this.state.elapsed == 0 &&
      this.state.sessionLength < 10 &&
      !this.state.timerId)

      minutes = "0" + this.state.sessionLength;else
      if (
      this.state.elapsed == 0 &&
      this.state.sessionLength > 9 &&
      !this.state.timerId)

      minutes = this.state.sessionLength;else
      if (this.state.timeMin > 9) minutes = this.state.timeMin;else
      minutes = "0" + this.state.timeMin;
    } else if (this.state.onBreak == true) {
      if (this.state.elapsed == 0 && this.state.breakLength < 10)
      minutes = "0" + this.state.breakLength;else
      if (this.state.elapsed == 0 && this.state.breakLength > 9)
      minutes = this.state.breakLength;else
      if (this.state.timeMin > 9) minutes = this.state.timeMin;else
      minutes = "0" + this.state.timeMin;
    }

    const seconds =
    this.state.elapsed <= 0 && this.state.onBreak == false ?
    "00" :
    this.state.timeSec > 9 ?
    this.state.timeSec :
    "0" + this.state.timeSec;

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "display" }, /*#__PURE__*/
      React.createElement("div", { className: "controls" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("div", { className: "button" }, /*#__PURE__*/
      React.createElement("button", {
        onClick: e => this.decrement(e, "breakLength"),
        id: "break-decrement" }, /*#__PURE__*/

      React.createElement("i", { className: "fa-solid fa-angle-down" })), /*#__PURE__*/

      React.createElement("div", { id: "break-length" }, this.state.breakLength), /*#__PURE__*/
      React.createElement("button", {
        onClick: e => this.increment(e, "breakLength"),
        id: "break-increment" }, /*#__PURE__*/

      React.createElement("i", { className: "fa-solid fa-angle-up " })))), /*#__PURE__*/



      React.createElement("div", { className: "controls" }, /*#__PURE__*/
      React.createElement("div", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("div", { className: "button" }, /*#__PURE__*/
      React.createElement("button", {
        value: "sessionLength",
        onClick: e => this.decrement(e, "sessionLength"),
        id: "session-decrement" }, /*#__PURE__*/

      React.createElement("i", { className: "fa-solid fa-angle-down " })), /*#__PURE__*/

      React.createElement("div", { id: "session-length" }, this.state.sessionLength), /*#__PURE__*/
      React.createElement("button", {
        value: "sessionLength",
        onClick: e => this.increment(e, "sessionLength"),
        id: "session-increment" }, /*#__PURE__*/

      React.createElement("i", { className: "fa-solid fa-angle-up " }))))), /*#__PURE__*/




      React.createElement("div", { id: "timeCon" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, this.state.onBreak ? "Break" : "Timer"), /*#__PURE__*/
      React.createElement("div", { id: "time-left" },
      minutes, ":", seconds)), /*#__PURE__*/


      React.createElement("button", { id: "start_stop", onClick: this.handleClick },
      this.state.running == false ? /*#__PURE__*/
      React.createElement("i", { class: "fa-solid fa-play" }) : /*#__PURE__*/

      React.createElement("i", { class: "fa-solid fa-pause" })), /*#__PURE__*/


      React.createElement("button", { id: "reset", onClick: this.reset }, /*#__PURE__*/
      React.createElement("i", { className: "fa-solid fa-arrow-rotate-left" })), /*#__PURE__*/

      React.createElement("audio", {
        src:
        "https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Alarm%20Sounds/167[kb]space-hospital-alarm.wav.mp3",

        id: "beep" })));



  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("App"));