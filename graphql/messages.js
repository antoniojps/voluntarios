import gql from 'graphql-tag';

export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessageToUser($userId: ID!, $input: MessageInput!){
    sendMessageToUser(userId: $userId, input: $input) {
      _id
      to {
        name
      }
      email
      name
      message
    }
  }
`;