const { ApolloServer, gql } = require('apollo-server-lambda');
const Query = require('./query-resolvers.js');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  enum AssetType {
    Locomotive
  }

  type Asset {
    id: ID!
    assetType: AssetType!
    description: String!
  }

  type Query {
    hello: String

    assets: [Asset!]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    ...Query,
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});