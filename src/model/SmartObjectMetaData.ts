export interface SmartObjectMetaData {
  objectData: {
    cardinality: number;
    owner: string;
    metadataURI: string;
  };
  position: {
    solarSystemId: string;
    position: {
      x: string;
      y: string;
      z: string;
    };
  };
  deployableData: {
    isSmartDeployable: boolean;
    state: number;
    name: string;
    description: string;
    dappURL: string;
  };
}
