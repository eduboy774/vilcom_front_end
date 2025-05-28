
import { gql } from '@apollo/client';

export const CREATE_VILCOM_SERVICES= gql 
`
mutation CreateVilcomServiceMutation($input: VilcomServiceInputObject) {
  createVilcomServiceMutation(input: $input) {
    response {
      id
      status
      code
      message
    }
    data {
      id
      uuid
      serviceName
      serviceDescription
      servicePhoto
      isActive
    }
  }
}
  `

export const  UPDATE_VILCOM_SERVICES  = gql
`
mutation UpdateVilcomServiceMutation($input: VilcomServiceInputObject) {
  updateVilcomServiceMutation(input: $input) {
    response {
      id
      status
      code
      message
    }
    data {
      id
      uuid
      serviceName
      serviceDescription
      servicePhoto
      isActive
    }
  }
}
`

export const ACTIVATE_OR_DEACTIVATE_VILCOM_SERVICES = gql
`
mutation ActivateOrDeactivateVilcomServiceMutation($uuid: String) {
  activateOrDeactivateVilcomServiceMutation(uuid: $uuid) {
    response {
      id
      status
      code
      message
    }
  }
}
`


export const CREATE_VILCOM_PACKAGE = gql
`
mutation CreateVilcomPackageMutation($input: VilcomPackageInputObject) {
  createVilcomPackageMutation(input: $input) {
    response {
      id
      status
      code
      message
    }
    data {
      id
      uuid
      packageName
      packageDescription
      packagePhoto
      isActive
    }
  }
}
`

export const UPDATE_VILCOM_PACKAGE= gql
`
mutation UpdateVilcomPackageMutation($input: VilcomPackageInputObject) {
  updateVilcomPackageMutation(input: $input) {
    response {
      id
      status
      code
      message
    }
    data {
      id
      uuid
      packageName
      packageDescription
      packagePhoto
      isActive
    }
  }
}
`


export const ACTIVATE_OR_DEACTIVATE_PACKAGE = gql
`
mutation DeleteVilcomPackageMutation($uuid: String) {
  deleteVilcomPackageMutation(uuid: $uuid) {
    response {
      id
      status
      code
      message
    }
  }
}
`