var express = require("express");
var graphqlHTTP = require("express-graphql");
var {buildSchema, printSchema} = require("graphql");
var fs = require("fs");
var path = require("path");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    id: ID
    hello: String
    goodbye: String
  }
`);

fs.writeFile(
  path.join(__dirname, "schema.graphql"),
  printSchema(schema),
  function(err) {
    // The root provides a resolver function for each API endpoint
    var root = {
      hello: () => {
        return "Hello world!";
      },
    };

    var app = express();

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
      })
    );
    app.listen(4000);
    console.log("Running a GraphQL API server at localhost:4000/graphql");
  }
);
