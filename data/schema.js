import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

function getSummoner() {
  return {
    name: "Hatkee"
  }
}

const GraphQLSummoner = new GraphQLObjectType({
  name: 'Summoner',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the Summoner',
    }
  })
});

export var Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      summoner: {
        type: GraphQLSummoner,
        resolve: () => getSummoner()
      }
    })
  })
});
