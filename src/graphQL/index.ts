import { gql } from 'graphql-tag'

export const LOGIN_QUERY = gql`
  query LOGIN($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        email
      }
      access_token
      refresh_token
    }
  }
`

//mutations

export const SIGNUP = gql`
  mutation SignupMutation($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        email
      }
      position_name
      access_token
      refresh_token
    }
  }
`
