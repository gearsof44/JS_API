var React = require("react");

class SupMessage extends React.Component {
  
  constructor(props){
    super(props);
    this.supMessage = this.supMessage.bind(this);
  }

  supMessage(event){
    event.preventDefault();
    fetch(`https://messy.now.sh/u/timeline/${this.props.idMessage}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer:"+sessionStorage.getItem("token"),
      }
    })
  }

  render(){
    if(this.props.idUser == this.props.idUserMessage ){
      return (
        <form onSubmit={this.supMessage}>
          <input className ="btn btn-primary" type="submit" value="Supprimer"/>
        </form>
      );
    }else{
      return null
    }
  }

}

module.exports = SupMessage;
