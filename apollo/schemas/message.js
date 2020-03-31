import gql from 'graphql-tag';
import Message from './../../models/message';
import { sendMessageEmail } from './../../services/email'
import { ApolloError } from 'apollo-server-micro';

export const typeDef = gql`
  type Message{
    _id: ID!
    to: User!
    email: EmailAddress!
    name: String!
    message: String!
    createdAt: DateTime!
  }

  input MessageInput {
    email: EmailAddress!
    name: String!
    message: String!
  }

  extend type Mutation {
    # Send user message
    sendMessageToUser(userId: ID!, input: MessageInput!): Message!
  }
`;

export const resolvers = {
  Mutation: {
    sendMessageToUser: async (root, { userId, input }) => {
      try {
        const { email, name, message: body } = input
        const newMessage = new Message({
            to: userId,
            email,
            name,
            message: body,
          })
        const message = await newMessage.save()
        await sendMessageEmail({ to: message.to.email, email, name, message: body })
        return message
      } catch (err) {
        if (process.env !== 'production') console.error(err.message)
        throw new ApolloError(err.message)
      }
      },
  },
};
