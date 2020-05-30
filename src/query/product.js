import gql from 'graphql-tag';

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      categories {
        id
        name
        key
      }
      slug
      brand {
        id
        name
        key
      }
      price
      promoPrice
      description
      seoTitle
      seoDescription
      availability
      images {
        big
        small
      }
      attributes {
        attribute {
          id
          key
          name
          unit
        }
        value
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: ProductUpdateInput!) {
    updateProduct(input: $input) {
      id
      name
      categories {
        id
        name
        key
      }
      slug
      brand {
        id
        name
        key
      }
      price
      promoPrice
      description
      seoTitle
      seoDescription
      availability
      images {
        big
        small
      }
      attributes {
        attribute {
          id
          key
          name
          unit
        }
        value
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($from: Int, $to: Int, $slug: String) {
    getProducts(from: $from, to: $to, slug: $slug) {
      products {
        id
        name
        categories {
          id
          name
          key
        }
        path
        slug
        brand {
          id
          name
          key
        }
        price
        promoPrice
        description
        seoTitle
        seoDescription
        availability
        images {
          big
          small
        }
        attributes {
          attribute {
            id
            key
            name
            unit
          }
          value
        }
      }
      total
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: ID, $slug: String) {
    getProduct(id: $id, slug: $slug) {
      id
      name
      categories {
        id
        name
        key
      }
      slug
      brand {
        id
        name
        key
      }
      price
      promoPrice
      description
      seoTitle
      seoDescription
      availability
      images {
        big
        small
      }
      attributes {
        attribute {
          id
          key
          name
          unit
        }
        value
      }
    }
  }
`;
