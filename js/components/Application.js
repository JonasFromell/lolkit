import React, {Component} from 'react';
import Relay from 'react-relay';

class App extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.summoner.name}</h1>
      </div>
    )
  }
}

export default Relay.createContainer(App, {
  fragments: {
    summoner: () => Relay.QL`
      fragment on Summoner {
        name
      }
    `
  }
});
