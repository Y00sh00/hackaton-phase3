export enum SmartDeployableState {
  NULL = "NULL",
  UNANCHORED = "UNANCHORED",
  ANCHORED = "ANCHORED", // Anchored + offline
  ONLINE = "ONLINE", // Anchored + online
  DESTROYED = "DESTROYED",
}
