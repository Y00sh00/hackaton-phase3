import {Injectable} from '@angular/core';
import {Action, createSelector, Selector, State, StateContext, Store} from '@ngxs/store';
import {produce} from "immer";
import {Web3Service} from "../services/web3.service";
import {IMASCOT_MANAGER_ABI} from "../contracts/IMascotManager";
import {Mascot, SlotData, SlotsMappedBySlotType, TraitData, TraitMappedBySlot} from "../model/Mascot";

export class InitMascotState {
  static readonly type = '[MascotState] Init';
}

export class RevertTraitModifications {
  static readonly type = '[MascotState] Revert Trait Modifications';
}

export class RevertSlotModifications {
  static readonly type = '[MascotState] Revert Slot Modifications';
}


export class SelectMascot {
  static readonly type = '[MascotState] Select Mascot';

  constructor(public mascotId: number) {
  }
}

export class ResetLoaded {
  static readonly type = '[MascotState] Reset Loaded';

  constructor() {
  }
}

export class RevertLoaded {
  static readonly type = '[MascotState] Revert Loaded';

  constructor() {
  }
}

export class ResetState {
  static readonly type = '[MascotState] Rset State';

  constructor() {
  }
}

export class SyncActiveTraits {
  static readonly type = '[MascotState] Sync Active Traits';

  constructor() {
  }
}

export class ResetSelectedMascot {
  static readonly type = '[MascotState] Reset Mascot in Editor';

  constructor() {
  }
}

export class SyncActiveSlots {
  static readonly type = '[MascotState] Sync Active Slots';

  constructor() {
  }
}

export class SaveMascotTraits {
  static readonly type = '[MascotState] Save Mascot Traits';

  constructor() {
  }
}

export class SaveMascotSlots {
  static readonly type = '[MascotState] Save Slots';

  constructor() {
  }
}

export class UpdateTraitOnSelectedMascot {
  static readonly type = '[MascotState] Update Trait on selected';

  constructor(public traitSlot: string, public selectedId: number) {
  }
}

export class UpdateSlotOnSelectedMascot {
  static readonly type = '[MascotState] Update Slot';

  constructor(public slotName: string, public selectedId: number) {
  }
}

// Todo Obtainment
// Todo Add Hands
// Todo fix colors not loading
// Todo Testing
// Small:
// Bonus Todo Trait saving and Slot saving is independent, give warning when switching tab
// Bonus Todo Warning when clicking revert dialog and add a (i)
// Bonus: Todo History (atleast add a button)
// Bonus: Gift
// Bigger:
// Bonus: Todo Campaign / Store / Boxes / Unlocks / Quest /Collections and Scavenge Hunt
// Bonus: Todo All Mascots baord
// Bonus: Todo Mascot Editor
// Bonus: Todo Visual Selector on editor
// Biggest:
// Bonus: Todo Emote?
// Bonus: Todo Feed / Stats
// Bonus: Todo Color Picker

export interface IMascotStateModel {
  loaded: boolean
  mascots: Mascot[] // All mascots
  selectedMascot: Mascot | undefined, // the current mascot
  availableTraitsBySlotType: TraitMappedBySlot // Used to index all the available traits for choosing
  availableTraitSlots: string[] // Used to render the slots that are available
  selectedTraitValues: { [key: string]: number } // Used to keep track of selected options key = slotname value = id
  availableSlotsBySlotType: SlotsMappedBySlotType,
  availableSlotsOnMascot: string[],
  selectedSlotsValues: { [key: string]: number }
  traitChangedOnMascot: string[];
  slotChangedOnMascot: string[];
  allAvailableTraits: TraitData[],
  allAvailableSlots: SlotData[]
}

const defaultValues: IMascotStateModel = {
  loaded: false,
  mascots: [],
  selectedMascot: undefined,
  // Traits
  availableTraitsBySlotType: {},
  availableTraitSlots: [], // TODO raname to "OnMascot"
  selectedTraitValues: {},
  // Slots
  availableSlotsBySlotType: {},
  availableSlotsOnMascot: [],
  selectedSlotsValues: {},
  traitChangedOnMascot: [],
  slotChangedOnMascot: [],
  allAvailableTraits: [],
  allAvailableSlots: []
}

@State<IMascotStateModel>({
  name: 'characters',
  defaults: defaultValues
})
@Injectable()
export class MascotState {
  @Selector()
  static loaded(state: IMascotStateModel) {
    return state.loaded;
  }

  @Selector()
  static mascots(state: IMascotStateModel) {
    return state.mascots;
  }

  @Selector()
  static selectedMascot(state: IMascotStateModel) {
    return state.selectedMascot;
  }

  @Selector()
  static availableTraits(state: IMascotStateModel) {
    return state.availableTraitsBySlotType;
  }

  @Selector()
  static traitSlotsAvailableForSelectedMascot(state: IMascotStateModel) {
    return state.availableTraitSlots;
  }

  @Selector()
  static selectedTraitValues(state: IMascotStateModel) {
    return state.selectedTraitValues;
  }

  @Selector()
  static availableSlots(state: IMascotStateModel) {
    return state.availableSlotsBySlotType;
  }

  @Selector()
  static slotsAvailableForSelectedMascot(state: IMascotStateModel) {
    return state.availableSlotsOnMascot;
  }

  @Selector()
  static selectedSlotValues(state: IMascotStateModel) {
    return state.selectedSlotsValues;
  }

  @Selector()
  static ownedTraits(state: IMascotStateModel) {
    return state.allAvailableTraits.filter(item => item.owned);
  }

  @Selector()
  static allAvailableTraits(state: IMascotStateModel) {
    return state.allAvailableTraits;
  }

  @Selector()
  static allAvailableSlots(state: IMascotStateModel) {
    return state.allAvailableSlots;
  }

  @Selector()
  static hasMascotsOrLoading(state: IMascotStateModel) {
    if (state.loaded) {
      return state.mascots.length > 0;
    } else {
      return true;
    }
  }

  static traitsInInventory(showAll: boolean): any {
    return createSelector([MascotState.allAvailableTraits], (traits: TraitData[]) => {
      if (showAll) {
        return traits;
      } else {
        return traits.filter(item => item.owned);
      }
    });
  }

  static slotsInInventory(showAll: boolean, slot = "Empty"): any {
    return createSelector([MascotState.allAvailableSlots], (slots: SlotData[]) => {
      if (slot !== "Empty") {
        slots = slots.filter(item => item.slotName === slot);
      }

      if (showAll) {
        return slots.filter(item => !item.owned).sort((a, b) => a.slotName.localeCompare(b.slotName));
      } else {
        return slots.filter(item => item.owned).sort((a, b) => a.slotName.localeCompare(b.slotName));
      }
    });
  }

  constructor(private store: Store, private web3Service: Web3Service) {
    // tslint:disable-next-line:no-string-literal
    (window as any)['ngxs'] = store;
    // allows for window[0].ngxs.snapshot() or window.ngxs.snapshot() depending
  }

  @Action(SelectMascot)
  selectMascot(ctx: StateContext<IMascotStateModel>, {mascotId}: SelectMascot): void {
    ctx.setState(
      produce(draft => {
        draft.slotChangedOnMascot = [];
        draft.traitChangedOnMascot = [];
        draft.selectedMascot = draft.mascots.find(item => item.id === mascotId)
      })
    );
    this.store.dispatch([new SyncActiveTraits()]);
    this.store.dispatch([new SyncActiveSlots()]);
  }

  @Action(ResetLoaded)
  resetLoaded(ctx: StateContext<IMascotStateModel>, {}: ResetLoaded): void {
    ctx.setState(
      produce(draft => {
        draft.loaded = false
      })
    );
  }

  @Action(RevertLoaded)
  revertLoaded(ctx: StateContext<IMascotStateModel>, {}: RevertLoaded): void {
    ctx.setState(
      produce(draft => {
        draft.loaded = !draft.loaded
      })
    );
  }

  @Action(ResetState)
  resetState(ctx: StateContext<IMascotStateModel>, {}: RevertLoaded): void {
    ctx.setState({
      ...defaultValues
    })
  }


  @Action(ResetSelectedMascot)
  resetSelectedMascot(ctx: StateContext<IMascotStateModel>, {}: SelectMascot): void {
    ctx.setState(
      produce(draft => {
        draft.selectedMascot = undefined
      })
    );
  }

  @Action(UpdateSlotOnSelectedMascot)
  updateSlotOnSelectedMascot(ctx: StateContext<IMascotStateModel>, {
    slotName,
    selectedId
  }: UpdateSlotOnSelectedMascot): void {
    ctx.setState(
      produce(draft => {
        draft.slotChangedOnMascot.push(slotName);
        // Helper to map recursively
        const updateSlotRecursively = (slots: SlotData[], slotName: string, newSlot: SlotData): SlotData[] => {
          return slots.map(slot => {
            if (slot.slotName === slotName) {
              return {...newSlot};
            }

            if (slot.slots && slot.slots.length > 0) {
              return {
                ...slot,
                slots: updateSlotRecursively(slot.slots, slotName, newSlot)
              };
            }

            return slot;
          });
        };

        const newSlot = draft.availableSlotsBySlotType[slotName].find(item => item.id === selectedId)
        const currentMascot = ctx.getState().selectedMascot;
        if (draft.selectedMascot && currentMascot && currentMascot.slots && newSlot) {
          draft.selectedMascot.slots = currentMascot.slots.map(item => {
            if (item.slotName === slotName) {
              const newItem: SlotData = {
                ...newSlot
              };
              return newItem;
            }

            if (item.slots && item.slots.length > 0) {
              return {
                ...item,
                slots: updateSlotRecursively(item.slots, slotName, newSlot)
              };
            }

            return item;
          })
        } else {
          throw new Error('Could not set new Trait lacking a current mascot or traits');
        }
      })
    )
    this.store.dispatch([new SyncActiveSlots()]);
  }

  @Action(UpdateTraitOnSelectedMascot)
  updateTraitsOnSelectedMascot(ctx: StateContext<IMascotStateModel>, {
    traitSlot,
    selectedId
  }: UpdateTraitOnSelectedMascot): void {
    ctx.setState(
      produce(draft => {
        draft.traitChangedOnMascot.push(traitSlot);
        const newTrait = draft.availableTraitsBySlotType[traitSlot].find(item => item.id === selectedId)
        const currentMascot = ctx.getState().selectedMascot;
        if (draft.selectedMascot && currentMascot && currentMascot.traits && newTrait) {
          draft.selectedMascot.traits = currentMascot.traits.map(item => {
            if (item.traitSlot === traitSlot) {
              const newItem: TraitData = {
                traitSlot: traitSlot,
                id: newTrait.id,
                optionName: newTrait.optionName,
                optionValue: newTrait.optionValue
              };
              return newItem;
            }
            return item;
          })
        } else {
          throw new Error('Could not set new Trait lacking a current mascot or traits');
        }
      })
    )
    this.store.dispatch([new SyncActiveTraits()]);
  }

  @Action(SyncActiveTraits)
  syncActiveTraits(ctx: StateContext<IMascotStateModel>): void {
    let selectedTraitValues: { [key: string]: number } = {};

    // Syncing traitSlot as key and id as value to selectedTraitValues
    ctx.setState(
      produce(draft => {
        ctx.getState().selectedMascot?.traits.forEach(traitData => {
          selectedTraitValues[traitData.traitSlot] = traitData.id;
        });

        draft.selectedTraitValues = selectedTraitValues
      })
    );
  }

  @Action(RevertTraitModifications)
  async revertTraitMods(ctx: StateContext<IMascotStateModel>): Promise<void> {
    const mascot = ctx.getState().selectedMascot;
    await this.store.dispatch(new RevertLoaded());
    if (!mascot) return;
    try {
      const functionName = this.web3Service.withNameSpaceAndName('removeTraitChanges');
      await this.web3Service.writeContract(IMASCOT_MANAGER_ABI, functionName, [mascot.id, "bodyColor"]);
    } catch (e) {
      throw e;
    } finally {
      await this.store.dispatch([new RevertLoaded(), new InitMascotState()]).subscribe(() => {
        this.store.dispatch(new SelectMascot(mascot.id));
      })
    }
  }

  @Action(RevertSlotModifications)
  async revertSlotModifications(ctx: StateContext<IMascotStateModel>): Promise<void> {
    const mascot = ctx.getState().selectedMascot;
    const slotsOnMascot = ctx.getState().availableSlotsOnMascot;
    await this.store.dispatch(new RevertLoaded());
    if (!mascot) return;
    try {
      const functionName = this.web3Service.withNameSpaceAndName('removeSlotChanges');
      await this.web3Service.writeContract(IMASCOT_MANAGER_ABI, functionName, [mascot.id, slotsOnMascot]);
    } catch (e) {
      throw e;
    } finally {
      await this.store.dispatch([new RevertLoaded(), new InitMascotState()]).subscribe(() => {
        this.store.dispatch(new SelectMascot(mascot.id));
      })
    }
  }

  @Action(SaveMascotTraits)
  async saveMascotTraits(ctx: StateContext<IMascotStateModel>): Promise<void> {
    const mascot = ctx.getState().selectedMascot;
    const traitsChangedOnMascot = ctx.getState().traitChangedOnMascot;
    // Traits to update
    if (mascot) {
      const traitsToUpdate = mascot.traits.filter(trait => traitsChangedOnMascot.includes(trait.traitSlot));
      if (traitsToUpdate.length > 0) {
        await this.store.dispatch(new RevertLoaded());
        try {
          for (const item of traitsToUpdate) {
            // TODO this is wrong, it will give you a popup for each trait. not an issue in current situation we only have one trait
            const functionName = this.web3Service.withNameSpaceAndName('updateTraits');
            await this.web3Service.writeContract(IMASCOT_MANAGER_ABI, functionName, [mascot.id, item.traitSlot, item.id, item.optionName, item.optionValue]);
          }
        } catch (e) {
          throw e;
        } finally {
          await this.store.dispatch([new RevertLoaded(), new InitMascotState()]).subscribe(() => {
            this.store.dispatch(new SelectMascot(mascot.id));
          })
        }
      }
    }
  }

  @Action(SaveMascotSlots)
  async saveMascotSlots(ctx: StateContext<IMascotStateModel>): Promise<void> {
    const mascot = ctx.getState().selectedMascot;
    const slotsChangedOnMascot = ctx.getState().slotChangedOnMascot;

    // Traits to update
    if (mascot) {
      const slotsToUpdate = this.getSlotsToUpdate(mascot.slots, slotsChangedOnMascot);
      const ids = slotsToUpdate.map(slot => slot.id);
      const slotNames = slotsToUpdate.map(slot => slot.slotName);

      if (slotsToUpdate.length > 0) {
        await this.store.dispatch(new RevertLoaded());
        try {
          const functionName = this.web3Service.withNameSpaceAndName('updateSlots');
          await this.web3Service.writeContract(IMASCOT_MANAGER_ABI, functionName, [mascot.id, slotNames, ids]);
        } catch (e) {
          throw e;
        } finally {
          await this.store.dispatch([new RevertLoaded(), new InitMascotState()]).subscribe(() => {
            this.store.dispatch(new SelectMascot(mascot.id));
          })
        }
      }
    }
  }

  @Action(SyncActiveSlots)
  syncActiveSlots(ctx: StateContext<IMascotStateModel>): void {

    ctx.setState(
      produce(draft => {
        // Syncing traitSlot as key and id as value to selectedTraitValues
        const selectedSlots = this.setSelectedSlots(ctx.getState().selectedMascot?.slots);

        draft.selectedSlotsValues = selectedSlots
      })
    );
  }


  @Action(InitMascotState)
  async initCharacterState(ctx: StateContext<IMascotStateModel>) {
    // @ts-ignore TODO sort out type issues look at weird definition from phase 2
    const currentUserAddress = this.web3Service?.account?.address;

    // Traits Retrieval
    const allTraitsFunction = this.web3Service.withNameSpaceAndName('getAllTraits');
    const traitsResponse = await this.web3Service.simulateContract(IMASCOT_MANAGER_ABI, allTraitsFunction, []) as TraitData[];
    const traitsToAssign = await this.postProcessTraits(traitsResponse)
    const traitsKeyedBySlot = await this.mapTraitsBySlot(traitsToAssign);
    const traitSlotsAvailableOnMascot = this.getDistinctTraitSlots(traitsToAssign);

    // Slots Retrieval
    const allSlotsFunction = this.web3Service.withNameSpaceAndName('getAllSlots');
    const slotsResponse = await this.web3Service.simulateContract(IMASCOT_MANAGER_ABI, allSlotsFunction, []) as SlotData[];
    console.log(slotsResponse);
    const slotsToAssign = await this.postProcessSlot(slotsResponse);
    const slotsKeyedBySlotType = await this.mapSlotsBySlotType(slotsToAssign);
    const slotsAvailableOnMascot = this.getDistinctSlotTypes(slotsToAssign);

    // Mascot Retrieval
    const allUserMascotsFunction = this.web3Service.withNameSpaceAndName('getFullUserMascots');
    const mascotsResponse = await this.web3Service.simulateContract(IMASCOT_MANAGER_ABI, allUserMascotsFunction, [currentUserAddress]) as Mascot[];
    const mascotsToAsssign = await this.postProcessMascots(mascotsResponse, slotsAvailableOnMascot, slotsToAssign);

    // We sync to get the changes synced to the selected model (todo probably is a better way)
    this.store.dispatch([new SyncActiveTraits(), new SyncActiveSlots()]);

    ctx.setState(
      produce(draft => {
        draft.loaded = true,
          draft.mascots = mascotsToAsssign,
          draft.availableTraitsBySlotType = traitsKeyedBySlot,
          draft.availableTraitSlots = traitSlotsAvailableOnMascot,
          draft.availableSlotsBySlotType = slotsKeyedBySlotType,
          draft.availableSlotsOnMascot = slotsAvailableOnMascot,
          draft.allAvailableSlots = slotsToAssign,
          draft.allAvailableTraits = traitsToAssign
      })
    );
  }

  private async patchSlotModifications(slots: SlotData[], mascotId: number, slotsAvailableOnMascot: string[], slotsToAssign: SlotData[]) {
    const allSlots = slotsToAssign;
    const slotStrings = slotsAvailableOnMascot;

    // We get the changes made to the slots
    const functionName = this.web3Service.withNameSpaceAndName('getSlotChanges');
    const response = await this.web3Service.simulateContract(IMASCOT_MANAGER_ABI, functionName, [mascotId, slotStrings]) as {
      slotName: string,
      selectedSlot: BigInt
    }[];
    if (response) {
      return this.updateSlotsHelper(slots, response, allSlots)
    }

    return slots;
  }

  private async patchTraitModifications(traits: TraitData[], mascotId: number) {
    // We get the changes made to the traits
    const functionName = this.web3Service.withNameSpaceAndName('getTraitChanged');
    const response = await this.web3Service.simulateContract(IMASCOT_MANAGER_ABI, functionName, [mascotId, 'bodyColor']);
    if (response) {
      traits.map(item => {
        if (response.optionName.length > 0) {
          item.id = response.id;
          item.optionValue = response.optionValue;
          item.optionName = response.optionName;
        }
        return item;
      })
    }

    return traits;
  }

  private async postProcessTraits(traits: TraitData[]) {
    const postProcessed = traits.map(item => {
      return {
        ...item,
        id: Number(item.id)
      }
    });

    return postProcessed;
  }

  private async mapSlotsBySlotType(slots: SlotData[]) {
    let result: SlotsMappedBySlotType = {}
    slots.forEach(obj => {
      const {slotName: key, ...rest} = obj;
      const slotDataWithKey = {slotName: key, ...rest};
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(slotDataWithKey);
    });

    return result;
  }

  private async mapTraitsBySlot(traits: TraitData[]) {
    let result: TraitMappedBySlot = {}
    traits.forEach(obj => {
      const {traitSlot: key, ...rest} = obj;
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(rest);
    });

    return result;
  }

  private async postProcessMascots(mascots: Mascot[], slotsAvailableOnMascot: string[], slotsToAssign: SlotData[]): Promise<Mascot[]> {
    return await Promise.all(mascots.map(async (item) => {
      let loadedSlots = await this.postProcessSlot(item.slots);
      let loadedTraits = await this.postProcessTraits(item.traits);
      // We load the changes
      loadedTraits = await this.patchTraitModifications(loadedTraits, item.id);
      loadedSlots = await this.patchSlotModifications(loadedSlots, item.id, slotsAvailableOnMascot, slotsToAssign);
      return {
        ...item,
        id: Number(item.id),
        slots: loadedSlots,
        traits: loadedTraits
      }
    }));
  }


  private async postProcessSlot(slots: SlotData[]): Promise<SlotData[]> {
    // Check if we still need to obtain the slots
    // Todo we can remove this logic in favor of getting it from our AvailableSlots data saves a calls
    if (this.isBigIntArray(slots)) {
      const functionName = this.web3Service.withNameSpaceAndName('getFullSlots');
      // @ts-ignore
      slots = await this.web3Service.simulateContract(IMASCOT_MANAGER_ABI, functionName, [slots]) as SlotData[];
    }

    // Post process the slots
    return await Promise.all(slots.map(async (item) => {
      item.zIndex = Number(item.zIndex);
      item.id = Number(item.id);
      item.x = Number(item.x);
      item.y = Number(item.y);

      // We expand the colors from a CSV to the typed colors
      item = this.parseProperties(item);

      item.slots = await this.postProcessSlot(item.slots);

      return item;
    }));
  }

  private parseProperties(item: SlotData) {
    if (item.properties) {
      const properties = item.properties.split(',');
      if (properties.length > 0) {
        if (properties[0] === 'null') {
          item.zIndex = null;
        } else if (properties[0] === 'default') {
          item.zIndex = 5
        } else {
          item.zIndex = Number(properties[0]);
        }
      }
      if (properties.length > 1) {
        item.color1 = properties[1];
      }
      if (properties.length > 2) {
        item.color2 = properties[2];
      }
      if (properties.length > 3) {
        item.color3 = properties[3];
      }
      if (properties.length > 4) {
        item.color4 = properties[4];
      }
      if (properties.length > 5) {
        item.color5 = properties[5];
      }

    }
    delete item.properties;
    return item;
  }

  private isBigIntArray(obj: object) {
    // Check if obj is an array
    if (!Array.isArray(obj)) return false;

    // Check if all elements in the array are BigInts
    for (let element of obj) {
      if (typeof element !== 'bigint') return false;
    }

    // If all checks passed, return true
    return true;
  }

  private getDistinctSlotTypes(slots: SlotData[]) {
    let distinctSlots: string[] = [];

    // Loop over the array of TraitData objects
    slots.forEach(data => {
      // Check if the traitSlot value already exists in the distinctTraitSlots array
      if (!distinctSlots.includes(data.slotName)) {
        // If not, add it to the array
        distinctSlots.push(data.slotName);
      }
    });

    return distinctSlots;
  }

  private getDistinctTraitSlots(traits: TraitData[]) {
    let distinctTraitSlots: string[] = [];

    // Loop over the array of TraitData objects
    traits.forEach(data => {
      // Check if the traitSlot value already exists in the distinctTraitSlots array
      if (!distinctTraitSlots.includes(data.traitSlot)) {
        // If not, add it to the array
        distinctTraitSlots.push(data.traitSlot);
      }
    });

    return distinctTraitSlots;
  }

  private setSelectedSlots(slots: SlotData[] | undefined): { [key: string]: number } {
    let selectedSlots: { [key: string]: number } = {};

    const resolveSlots = (slots: SlotData[] | undefined) => {
      if (slots) {
        slots.forEach(slot => {
          selectedSlots[slot.slotName] = slot.id;
          if (slot.slots && slot.slots.length > 0) {
            resolveSlots(slot.slots);
          }
        });
      }
    };

    resolveSlots(slots);
    return selectedSlots;
  }

  private getSlotsToUpdate(slots: SlotData[], slotsChangedOnMascot: string[]): SlotData[] {
    let slotsToUpdate: SlotData[] = [];

    function traverse(slot: SlotData) {
      if (slotsChangedOnMascot.includes(slot.slotName)) {
        slotsToUpdate.push(slot);
      }
      if (slot.slots) {
        slot.slots.forEach(traverse);
      }
    }

    slots.forEach(traverse);
    return slotsToUpdate;
  }

  private updateSlotsHelper(slots: SlotData[], response: {
    slotName: string,
    selectedSlot: BigInt
  }[], allSlots: SlotData[]): SlotData[] {
    return slots.map(item => {
      const newItem = response.find(responseItem => item.slotName === responseItem.slotName);
      if (newItem && Number(newItem.selectedSlot) > 0) {
        // Set the new slot
        const newSlot = allSlots.find(allSlotsItem => allSlotsItem.id === Number(newItem.selectedSlot));
        if (newSlot) {
          item = {...newSlot};
        }
      }

      // Recursively update nested slots
      if (item.slots && item.slots.length > 0) {
        item.slots = this.updateSlotsHelper(item.slots, response, allSlots);
      }

      return item;
    });

  }
}

