var React = require("react");
var render  = require("react-dom").default;
var AsyncButton = require("react-async-button").default;

class SignIn extends React.Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.connexion = this.connexion.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name] : event.target.value});
  }


  connexion(event){
    event.preventDefault();
    fetch('https://messy.now.sh/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password,
      })
    })
    .then(resultat => {return resultat.json()})
    .then(data => {this.props.onUserLogged(data);
    })
  }

   clickHandler(event) {
    return new Promise((resolve, reject) => {
      // some async stuff
      setTimeout(resolve, 1500);
      this.connexion(event);

    })
  }


  render(){
    return(
      //Display of different states of the connexion button
       <div className="wrapper">
        <form className="form-signin" onSubmit={this.connexion}>
        <h2 className="form-signin-heading">Connexion</h2>
          <label>
            Pseudo :
            <input className="check-form" type="text" name="name" placeholder="Pseudo" required=""  onChange={this.handleChange}/>
          </label>
          <label>
            Mot de passe :
            <input className="check-form" type="password" name="password" placeholder="Mot de passe"  required=""  onChange={this.handleChange}/>
          </label>
         <AsyncButton
          className="btn btn-lg btn-primary btn-block"
          text="Connection"
          pendingText="Connection"
          fulFilledText="Connection suceed"
          rejectedText="Impossible ! Try Again"
          loadingClass="isSaving"
          fulFilledClass="btn-primary"
          rejectedClass="btn-danger"
          onClick={this.clickHandler}
         />
         </form>
      </div>
      );
  }
}


module.exports = SignIn;
