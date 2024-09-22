import { gql } from '@apollo/client'

export const TYPECOMPONENT = gql`
  type ComponentType {
    id: Int!
    title: String!
  }

  type Component {
    id: Int!
    title: String!
    componentType: ComponentType
  }
`

export const GETCOMPONENTTYPES = gql`
  query GetComponentTypes {
    getComponentTypes {
      id
      title
    }
  }
`

export const GETCOMPONENTS = gql`
  query GetComponents($componentTypeId: Int!) {
    getComponents(componentTypeId: $componentTypeId) {
      id
      title
    }
  }
`

export const GETCOMPONENT = gql`
  query GetComponent($id: Int!) {
    getComponent(id: $id) {
      id
      title
    }
  }
`
