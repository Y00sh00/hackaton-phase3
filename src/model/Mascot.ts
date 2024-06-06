export  interface TraitData {
  id: number;
  traitSlot: string;
  optionName: string;
  optionValue: string;
  owned?: boolean;
}

export interface SlotData {
  id: number;
  zIndex: number | null;
  x: number;
  y: number;
  slotName: string;
  selectedComponent: string;
  displayName: string;
  slots: SlotData[];
  // comma separate values coming from blockchain contract that we process into the specific fields
  // ZIndex Specific info
  // we use a string here to do the following:
  // -1000 - 1000 we can use for rendering
  // 'null' means we do not set a z-index at all, important for composed components
  // 'default' means we set it to the default zIndex of 5
  // zIndex,color1,color2,color3,color4,color5
  properties?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  color5?: string;
  owned?: boolean;
}

export interface Mascot {
  id: number;
  owner: string;
  name: string;
  mascotType: string;
  slots: SlotData[];
  traits: TraitData[];
}

// Used to keep track of available Traits so we can easily get them based on slot
export interface TraitMappedBySlot {
  [key: string]: { id: number, optionName: string, optionValue: string, owned?: boolean }[];
}
export interface SlotsMappedBySlotType {
  [key: string]: SlotData[];
}
