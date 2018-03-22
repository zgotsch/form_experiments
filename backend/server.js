var express = require("express");
var graphqlHTTP = require("express-graphql");
var {buildSchema, printSchema} = require("graphql");
var fs = require("fs");
var path = require("path");

function promiseWrite(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, function(err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

async function main() {
  // Construct a schema, using GraphQL schema language
  var schema = buildSchema(`
    type Query {
      id: ID
      person(id: ID!): Person
      people: [Person!]!
    }

    type Person {
      id: ID!
      name: String!
    }

    type Mutation {
      createPerson(input: PersonInput!): Person
    }

    input PersonInput {
      name: String!
    }
  `);

  await promiseWrite(
    path.join(__dirname, "schema.graphql"),
    printSchema(schema)
  );

  const people = new Map([["1", {id: 1, name: "Zach"}]]);

  // The root provides a resolver function for each API endpoint
  var root = {
    person: ({id}) => {
      if (people.has(id)) {
        return people.get(id);
      } else {
        return null;
      }
    },
    people: () => {
      return Array.from(people.values());
    },
    createPerson: ({input}) => {
      if (input.name == null) {
        throw new Error('missing name in "createPerson"');
      }

      const nextId =
        Math.max(Array.from(people.keys()).map(s => Number.parseInt(s, 10))) +
        1;
      people.set(nextId.toString(), {id: nextId.toString(), name: input.name});
      return people.get(nextId.toString());
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

main()
  .then()
  .catch(e => {
    throw e;
  });
