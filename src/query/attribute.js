import gql from 'graphql-tag';

export const GET_ATTRIBUTES = gql`
  query getAttributes {
    getAttributes {
      id
      name
      key
      unit
    }
  }
`;

export const CREATE_ATTRIBUTE = gql`
  mutation createAttribute($input: AttributeInput!) {
    createAttribute(input: $input) {
      id
      name
      key
      unit
    }
  }
`;

export const UPDATE_ATTRIBUTE = gql`
  mutation updateAttribute($input: AttributeUpdateInput!) {
    updateAttribute(input: $input) {
      id
      name
      key
      unit
    }
  }
`;

export const DELETE_ATTRIBUTE = gql`
  mutation deleteAttribute($id: ID!) {
    deleteAttribute(id: $id)
  }
`;
