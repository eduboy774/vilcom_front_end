import { gql } from '@apollo/client';


export const GET_USER_PROFILE =gql `
query GetUserProfileAndRole {
  getUserProfileAndRole {
    response {
      id
      status
      code
      message
    }
    data {
      id
      userProfile {
        id
        profileUniqueId
        userFirstName
        userLastName
        userEmail
        profilePhone
        profileTitle
        profilePhoto
        profileIsActive
        profileType
        profileLevel
        profileGender
      }
      userRoles {
        id
        roleUniqueId
        roleName
        roleDescription
        rolePermissions {
          id
          permissionUniqueId
          permissionName
          permissionCode
        }
      }
    }
  }
}
`
;


export const GET_VILCOM_SERVICES = gql
`
query GetVilcomServices($filtering: VilcomServiceFilteringInputObject) {
  getVilcomServices(filtering: $filtering) {
    data {
      id
      uuid
      serviceName
      serviceDescription
      servicePhoto
      isActive
    }
    response {
      id
      status
      code
      message
    }
  }
}
`
export const  GET_VILCOM_FOODS= gql
`
query GetVilcomFoods($filtering: VilcomFoodFilteringInputObject) {
  getVilcomFoods(filtering: $filtering) {
    data {
      id
      uuid
      foodName
      foodDescription
      foodCategory
      foodPhoto
      foodPackage {
        id
        uuid
        packageName
        packageDescription
        packagePhoto
        isActive
      }
      foodSize
      foodQuantity
      foodPrice
      isActive
    }
    response {
      id
      status
      code
      message
    }
  }
}
`
;
export const GET_VILCOM_ORDERS = gql
`
query GetVilcomOrders($filtering: VilcomOrderFilteringInputObject) {
  getVilcomOrders(filtering: $filtering) {
    data {
      id
      uuid
      customer {
        id
        profileUniqueId
        userFirstName
        userLastName
        userEmail
        profilePhone
        profileTitle
        profilePhoto
        profileIsActive
        profileType
        profileLevel
        profileGender
      }
      status
      deliveryAddress
      notes
      isActive
    }
    response {
      id
      status
      code
      message
    }
  }
}
`

export const GET_VILCOM_PACKAGES= gql
`
query GetVilcomPackages($filtering: VilcomPackageFilteringInputObject) {
  getVilcomPackages(filtering: $filtering) {
    data {
      id
      uuid
      packageName
      packageDescription
      packagePhoto
      isActive
    }
    response {
      id
      status
      code
      message
    }
  }
}
`
