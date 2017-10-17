var React = require("react");
var ReactDOM = require("react-dom");
var UserForm = require("./components/UserForm");
var SignIn = require("./components/SignIn");
var RecupMessage = require("./components/RecupMessage");
var EnvoiMessage = require("./components/EnvoiMessage");
var SupMessage = require("./components/SupMessage");
var render  = require("react-dom").default;
var AsyncButton = require("react-async-button").default;

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: sessionStorage.getItem('idUser'),
      token: sessionStorage.getItem('token')
    }
    this.registerConnection = this.registerConnection.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  disconnect(event){
    sessionStorage.clear();
    console.log(sessionStorage);
  }

  registerConnection(user) {
    console.log(user);
    sessionStorage.setItem('token', user.token);
    sessionStorage.setItem('idUser', user.user.id);
    this.setState({idUser: user.user.id})
    this.setState({token: user.token})

  }

   clickHandler(event) {
    return new Promise((resolve, reject) => {
      // some async stuff
      setTimeout(resolve, 500);
      this.disconnect(event);

    })
  }

  render() {
    if(!this.state.token){
      return (
        <div id="Connect">
          <UserForm onUserCreated={this.registerConnection}/>
          <SignIn onUserLogged={this.registerConnection}/>
        </div>
        )
    }
    else {
      return (
        <div>
          <RecupMessage idUser={this.state.idUser} token={this.state.token}/>
          <EnvoiMessage token={this.state.token}/>
          <form onSubmit={this.disconnect}>
            <input className ="btn btn-primary" type="submit" value="Se déconnecter" />
          </form>
        </div>
      )
    }
    return <div>rien</div>
  }
}

ReactDOM.render(<Application />, document.getElementById("main"));
