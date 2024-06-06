import {Injectable} from '@angular/core';
import {Character, Slot, Trait} from "../model/Character";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";
import {EditorService} from "./editor.service";

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private currentCharacterSubject = new BehaviorSubject<Character | undefined>(undefined);
  currentCharacter$ = this.currentCharacterSubject.asObservable();

  constructor(private http: HttpClient, private editorService: EditorService) {
    this.loadCharacter();
  }

  loadCharacter(): void {
    this.http.get<Character>('assets/character.json')
      .pipe(
        tap((character: Character) => {
          this.createSlots(character);
          this.createCharacterTraits(character);
          this.currentCharacterSubject.next(character)
        }),
      )
      .subscribe();
  }

  updateCharacter(slotToUpdate: string, slotToUpdateData: Slot): void {
    const currentCharacter = this.currentCharacterSubject.value;
    if (currentCharacter) {
      // Create a new character object with the updated slots
      const updatedCharacter = {
        ...currentCharacter,
        slots: this.updateSlotRecursively(currentCharacter.slots, slotToUpdate, slotToUpdateData)
      };
      // Emit the new character object
      this.currentCharacterSubject.next(updatedCharacter);
    }
  }

  updateCharacterTrait(traitToUpdate: string, traitToUpdateData: Trait): void {
    const currentCharacter = this.currentCharacterSubject.value;
    if (currentCharacter) {
      const updatedTraits = currentCharacter.config.traits.map(trait => {
        if (trait.traitSlot === traitToUpdate) {
          return {...trait, ...traitToUpdateData};
        }
        return trait;
      });

      const updatedCharacter = {
        ...currentCharacter,
        config: {
          ...currentCharacter.config,
          traits: updatedTraits
        }
      };

      this.currentCharacterSubject.next(updatedCharacter);
    }
  }


  private updateSlotRecursively(slots: Slot[], slotToUpdate: string, slotToUpdateData: Slot): Slot[] {
    return slots.map(slot => {
      if (slot.slotName === slotToUpdate) {
        return slotToUpdateData;
      } else if (slot.slots && slot.slots.length > 0) {
        return {...slot, slots: this.updateSlotRecursively(slot.slots, slotToUpdate, slotToUpdateData)};
      }
      return slot;
    });
  }

  createSlots(character: Character): void {
    this.recursivelyAddSlots(character.slots);
  }

  private recursivelyAddSlots(slots: Slot[]): void {
    slots.forEach(slot => {
      // Add the current slot to the SlotEditorService
      this.editorService.addSlot(slot.slotName, slot);

      // If the current slot has nested slots, recursively add them
      if (slot.slots && slot.slots.length > 0) {
        this.recursivelyAddSlots(slot.slots);
      }
    });
  }

  private createCharacterTraits(character: Character) {
    character.config.traits.forEach(item => {
      this.editorService.addCharacterTrait(item.traitSlot, item);
    });
  }
}
