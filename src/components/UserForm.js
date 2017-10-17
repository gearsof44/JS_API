var React = require("react");
var render  = require("react-dom").default;
var AsyncButton = require("react-async-button").default;


class UserForm extends React.Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name] : event.target.value});
  }


  handleSubmit(event){
    event.preventDefault();

    fetch('https://messy.now.sh/join', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password,
        image: this.state.image,
      })
    })
    .then(results =>{return results.json();})
    .then(data => {this.setState({token: data});this.props.onUserCreated(data);})
  }

  clickHandler(event) {
      return new Promise((resolve, reject) => {
        // some async stuff
        setTimeout(resolve, 1500);
        this.handleSubmit(event);

      })
    }

  render(){
    return(
      //Display of different states of the inscription button
      <div className="wrapper">
      <form className="form-signin">
        <h2 className="form-signin-heading">Inscription</h2>
        <label>
        Pseudo :
        <input id="pseudo "className="check-form" type="text" name="name" placeholder="Pseudo" required="" onChange={this.handleChange} />
        </label>
        <label>
        Url image :
        <input className="check-form" type="url" name="image" placeholder="Url" required="" onChange={this.handleChange}  />
        </label>
        <label>
        Mot de passe :
        <input className="check-form" type="password" name="password" placeholder="Mot de passe"  required="" onChange={this.handleChange} />
        </label>
         <AsyncButton
          className="btn btn-lg btn-primary btn-block"
          text="Register"
          pendingText="Registration in progress"
          fulFilledText="Registration suceed"
          rejectedText="Impossible ! Try Again"
          loadingClass="isSaving"
          fulFilledClass="btn-primary"
          rejectedClass="btn-danger"
          onClick={this.clickHandler}
         />
        </form>
        <br/>
      </div>
    )
  }
}


module.exports = UserForm;
