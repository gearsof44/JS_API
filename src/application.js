var React = require("react");
var ReactDOM = require("react-dom");
var UserForm = require("./components/UserForm");
var RecoverMessages = require("./components/RecoverMessages");
var DeleteMessage = require("./components/DeleteMessage");
var SendMessage = require("./components/SendMessage");

class MessyTp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          currentHours : new Date().getHours(),
          currentMinutes : ( new Date().getMinutes() < 10 ? "0" : "" ) + new Date().getMinutes(),
          currentSeconds : ( new Date().getSeconds() < 10 ? "0" : "" ) + new Date().getSeconds()
        };
        this.incrementTime = this.incrementTime.bind(this);
    }

    incrementTime() {
        this.setState({ currentHours: new Date().getHours() }, { currentMinutes: new Date().getHours() }, { currentSeconds: new Date().getHours() });
    }

    render() {
        return (
            <span>
              { this.state.currentHours } : { this.state.currentMinutes } : { this.state.currentSeconds }
            </span>
        );
    }

    componentDidMount() {
      setInterval(() => this.setState({ currentHours: new Date().getHours() }, { currentMinutes: new Date().getHours() }, { currentSeconds: new Date().getHours() }), 1000 )
    }
}

ReactDOM.render(<ClickableTitle title="Hello World"/>, document.getElementById("main"));
