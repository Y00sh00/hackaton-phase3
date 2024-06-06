import {TraitData} from "./Mascot";

export interface Character {
  config: CharacterConfig
  slots: Slot[]
}

export interface Slot {
  id?: string;
  slotName: string;
  selectedComponent?: string;
  displayName?: string;
  x?: number
  y?: number
  // TODO replace all of this with primaryColor, secondaryColor etc
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  color5?: string;
  bodyColor?: string; // Trait
  hairColor?: string; // Potential future Trait
  beardColor?: string;
  mainColor?: string;
  beltColor?: string;
  slots?: Slot[];
  // When no zIndex is defined it will be set to zIndex 5 by the renderer, if null it will not be set by the renderer.
  zIndex?: number | null; // TODO zindex 0 should never be used, as its the default in the contract
}

export interface Trait {
  traitSlot: string;
  optionName: string;
  optionValue?: string;
}

export interface CharacterConfig {
  name: string // Name of the minted character
  mascotType: string;
  traits: Trait[] | TraitData[]; //TODO remove obsolete Trait when done refactoring
}
