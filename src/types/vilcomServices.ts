export interface VilcomService {
  id: number;
  uuid: string;
  serviceName: string;
  serviceDescription: string;
  servicePhoto: string;
  isActive: boolean;
}

export interface VilcomServiceFilteringInputObject {
  uuid?: string | null;
  serviceName?: string | null;
}
