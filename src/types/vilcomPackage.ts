import { ResponseObject } from "./base";

export interface VilcomPackage {
   id: number;
  uuid: string;
  packageName: string;
  packageDescription: string;
  packagePhoto: string;
  isActive: boolean;
  __typename: string;
}

export interface VilcomPackageFilteringInputObject {
  uuid?: string | null;
  packageName?: string | null;
  packageDescription?: string | null;
}


export interface VilcomPackageInputObject {
  uuid?: string | null;
  packageName?: string | null;
  packageDescription?: string | null;
}

export interface CreatePackageVars {
  input: VilcomPackageInputObject;
}


interface VilcomPackageObject {
  id: number;
  uuid: string;
  packageName: string;
  packageDescription: string;
  packagePhoto: string;
  isActive: boolean;
  __typename: string;
}


export interface CreateVilcomPackageMutation {
  createVilcomPackageMutation: {
    response: ResponseObject;
    data: VilcomPackageObject;
    __typename: string;
  };
}

