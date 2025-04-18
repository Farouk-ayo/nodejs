const { buildSchema } = require("graphql");

module.exports = buildSchema(`  
    type Query {    
        getAllFeeds: [Feed!]!
        getFeed(id: ID!): Feed!
    }
    type Mutation {
        createFeed(title: String!, content: String!, imageUrl: String!): Feed!
        updateFeed(id: ID!, title: String, content: String, imageUrl: String): Feed!
        deleteFeed(id: ID!): Feed!
    }
    type Feed {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        createdAt: String!
        updatedAt: String!
    }
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        createdAt: String!
        updatedAt: String!
    }       
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }
    type Subscription {
        feedCreated: Feed!
    }
    type RootQuery {
        login(email: String!, password: String!): AuthData!
    }
    type RootMutation {
        createUser(name: String!, email: String!, password: String!): User!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
