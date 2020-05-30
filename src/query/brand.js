import gql from 'graphql-tag';

export const GET_BRANDS = gql`
  query getBrands {
    getBrands {
      id
      name
      key
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation createBrand($input: BrandInput!) {
    createBrand(input: $input) {
      name
      id
      key
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation deleteBrand($id: ID!) {
    deleteBrand(id: $id)
  }
`;
