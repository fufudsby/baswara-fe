import { gql } from '@apollo/client'

export const INPUTPRODUCT = gql`
  input GetProductsInput {
    productTypeId: Int!
    limit: Int!
    page: Int!
  }

  input GetAllProductsInput {
    limit: Int!
    search: String
  }
`

export const TYPEPRODUCT = gql`
  type productType {
    id: Int!
    title: String!
  }

  type Product {
    id: Int!
    title: String!
    priceDpp: Int!
    unit: Component
    description: String!
  }

  type ProductList {
    id: Int!
    title: String!
    priceDpp: Int!
    unit: Component
    description: String!
    productType: productType
  }

  type Products {
    data: [Product]
    isFirstPage: Boolean!
    isLastPage: Int!
    currentPage: Int!
    previousPage: Int
    nextPage: Int
    pageCount: Int!
    totalCount: Int!
  }
`

export const GETPRODUCTTYPES = gql`
  query GetProductTypes {
    getProductTypes {
      id
      title
    }
  }
`

export const GETALLPRODUCTS = gql`
  query GetAllProducts($input: GetAllProductsInput!) {
    getAllProducts(getAllProductsInput: $input) {
      id
      title
      priceDpp
      description
      unit {
        title
      }
      productType {
        title
      }
    }
  }
`

export const GETPRODUCTS = gql`
  query GetProducts($input: GetProductsInput!) {
    getProducts(getProductsInput: $input) {
      data {
        id
        title
        priceDpp
        description
        unit {
          title
        }
      }
      totalCount
      currentPage
      isFirstPage
      isLastPage
      nextPage
      previousPage
      pageCount
    }
  }
`

export const GETPRODUCT = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
      id
      title
      description
    	priceDpp
    	area
    	unit {
        id
        title
      }
    	hpp {
        id
        title
        HPPType {
          id
          title
        }
      }
    }
  }
`
