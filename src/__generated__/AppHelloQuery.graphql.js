/**
 * @flow
 * @relayHash ae5456054c7eb6edf9eea8f99db0787f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppHelloQueryVariables = {| |};
export type AppHelloQueryResponse = {|
  +hello: ?string,
|};
*/

/*
query AppHelloQuery {
  hello
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
    {
      kind: 'ScalarField',
      alias: null,
      name: 'hello',
      args: null,
      storageKey: null
    }
  ];
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'AppHelloQuery',
    id: null,
    text: 'query AppHelloQuery {\n  hello\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'AppHelloQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: [],
      selections: v0
    },
    operation: {
      kind: 'Operation',
      name: 'AppHelloQuery',
      argumentDefinitions: [],
      selections: v0
    }
  };
})();
node /*: any*/.hash = '48d6b504263572465edb4e9b19474bf3';
module.exports = node;
