import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    summoner: () => Relay.QL`
      query {
        summoner
      }
    `
  };

  static routeName = 'HomeRoute';
}
