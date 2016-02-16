import path from 'path';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { Schema } from './data/schema';

const CLIENT_PORT = 3000;
const SERVER_PORT = 8080;

// GraphQL Endpoint
const graphQLServer = express();

graphQLServer.use('/', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema
}));

graphQLServer.listen(SERVER_PORT, () => console.log(
  `GraphQL server is now running on http://localhost:${SERVER_PORT}`
));

// Client Relay application
const compiler = webpack({
  entry: {
    app: path.resolve(__dirname, 'js', 'index.js'),
    vendor: ['react', 'react-dom', 'react-relay', 'graphql', 'graphql-relay']
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/
      }
    ]
  },
  output: {
    filename: 'app.js',
    path: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ]
});

const application = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {
    '/graphql': `http://localhost:${SERVER_PORT}`
  },
  publicPath: '/assets/js/',
  stats: {
    colors: true
  }
});

application.use('/', express.static(path.resolve(__dirname, 'public')));
application.listen(CLIENT_PORT, () => console.log(
  `Application is now running on http://localhost:${CLIENT_PORT}`
));
