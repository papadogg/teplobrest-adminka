import gql from 'graphql-tag';

export const GET_ORDERS = gql`
  query getOrders {
    getOrders {
      id
      name
      phone
      address
      message
      products {
        product {
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
        count
      }
      totalPrice
      processed
    }
  }
`;

export const GET_ORDER = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      id
      name
      phone
      address
      message
      products {
        product {
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
        count
      }
      totalPrice
      processed
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($input: OrderUpdateInput!) {
    updateOrder(input: $input)
  }
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;
