import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      name
      key
      level
      parentId
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      name
      id
      key
      level
      parentId
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($input: CategoryUpdateInput!) {
    updateCategory(input: $input) {
      name
      id
      key
      level
      parentId
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
