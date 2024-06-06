import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Slot, Trait} from "../model/Character";
import {AssignedSlot} from "../model/AssignedSlot";


@Injectable({
  providedIn: 'root'
})
export class EditorService {
  // The active customizable slots
  private slotsSubject: BehaviorSubject<AssignedSlot[]> = new BehaviorSubject<AssignedSlot[]>([]);
  public slots$: Observable<AssignedSlot[]> = this.slotsSubject.asObservable();

  // The available cosmetic items for slots
  private availableItemsSubject: BehaviorSubject<{ [key: string]: Slot[] }> = new BehaviorSubject<{
    [key: string]: Slot[]
  }>({});
  public availableItems$: Observable<{ [key: string]: Slot[] }> = this.availableItemsSubject.asObservable();

  private characterTraitsSubject: BehaviorSubject<Trait[]> = new BehaviorSubject<Trait[]>([]);
  public characterTraits$: Observable<Trait[]> = this.characterTraitsSubject.asObservable();


  private availableCharacterTraitsSubject: BehaviorSubject<{ [key: string]: Trait[] }> = new BehaviorSubject<{
    [key: string]: Trait[]
  }>({});
  public availableCharacterTraits$: Observable<{
    [key: string]: Trait[]
  }> = this.availableCharacterTraitsSubject.asObservable();

  constructor() {
    // Traits
    this.configureTraits();

    // Slots
    this.configureBody();
    this.configureHeads();
    this.configureBelts();
    this.configureEyes();
    this.configureArms();
    this.configureNose();
    this.configureHorns();
    this.configureLegs();
    this.configurePants();
    this.configureHair();
    this.configureBeards();
    this.configureEars();
  }

  // Method to add a slot
  addSlot(slotName: string, slotData: Slot): void {
    if (slotName && !this.slotsSubject.value.find(slot => slot.slotName === slotName)) {
      const updatedSlots = [...this.slotsSubject.value, {slotName, slotData}];
      this.slotsSubject.next(updatedSlots);
    }
  }

  // Method to remove a slot
  removeSlot(slotName: string): void {
    const updatedSlots = this.slotsSubject.value.filter(slot => slot.slotName !== slotName);
    this.slotsSubject.next(updatedSlots);
  }

  // Method to get the current slots as an observable
  getSlots(): Observable<AssignedSlot[]> {
    return this.slots$;
  }

  // Method to add an available item
  addAvailableItem(slotKey: string, slot: Slot): void {
    const currentItems = this.availableItemsSubject.value;
    const updatedItems = {...currentItems};

    if (!updatedItems[slotKey]) {
      updatedItems[slotKey] = [];
    }

    updatedItems[slotKey] = [...updatedItems[slotKey], slot];
    this.availableItemsSubject.next(updatedItems);
  }

  // Method to get all available items as an observable
  getAvailableItems(): Observable<{ [key: string]: Slot[] }> {
    return this.availableItems$;
  }

  addCharacterTrait(name: string, traitValue: Trait): void {
    if (name && !this.characterTraitsSubject.value.find(trait => trait.traitSlot === name)) {
      const updatedSlots = [...this.characterTraitsSubject.value, {...traitValue}];
      this.characterTraitsSubject.next(updatedSlots);
    }
  }

  // Method to add an available character trait
  addAvailableCharacterTrait(traitKey: string, traitValue: Trait): void {
    const currentItems = this.availableCharacterTraitsSubject.value;
    const updatedItems = {...currentItems};

    if (!updatedItems[traitKey]) {
      updatedItems[traitKey] = [];
    }

    updatedItems[traitKey] = [...updatedItems[traitKey], traitValue];
    this.availableCharacterTraitsSubject.next(updatedItems);
  }

  // Method to get all available character traits as an observable
  getAvailableCharacterTraits(): Observable<{ [key: string]: Trait[] }> {
    return this.availableCharacterTraits$;
  }

  // Method to get all character traits as an observable
  getCharacterTraits(): Observable<Trait[]> {
    return this.characterTraits$;
  }

  private configureEyes() {
    this.addAvailableItem("Eyes", {
        "id": "70a675c7-88c5-4072-9898-4cbb84261223",
        "slotName": "Eyes",
        "displayName": "Angry",
        "selectedComponent": "mino-eye-1",
        "zIndex": 7
      }
    )

    this.addAvailableItem("Eyes", {
        "id": "70a675c7-88c5-4072-9898-4cbb84261222",
        "slotName": "Eyes",
        "displayName": "Eyes Hurt",
        "selectedComponent": "mino-eye-2",
        "zIndex": 7
      }
    )
  }

  private configureNose() {
    this.addAvailableItem("Nose_Accessory", {
        "id": "empty",
        "slotName": "Nose_Accessory",
        "displayName": "Empty",
        "selectedComponent": "body-empty",
        "zIndex": null
      },
    )

    this.addAvailableItem("Nose_Accessory", {
        "id": "a02a1199-412b-4966-8236-3463c22e81e6",
        "slotName": "Nose_Accessory",
        "displayName": "Nose Ring (Gold)",
        "selectedComponent": "mino-nosering-1",
        "zIndex": 8
      },
    )

    this.addAvailableItem("Nose_Accessory", {
        "id": "a02a1199-412b-4966-8236-3463c22e81e5",
        "slotName": "Nose_Accessory",
        "displayName": "Nose Ring (Silver)",
        "selectedComponent": "mino-nosering-1",
        "zIndex": 8,
        "color1": "grey"
      },
    )
  }

  private configureArms() {
    this.addAvailableItem("Arms", {
        "id": "1325aaaa-ffff-459d-aaaa-df013c09763d",
        "slotName": "Arms",
        "displayName": "Default",
        "selectedComponent": "mino-arms-1",
        "zIndex": null
      },
    )
    this.addAvailableItem("Arms", {
        "id": "1325a11a-ffff-459d-aaaa-df013c09763d",
        "slotName": "Arms",
        "displayName": "With wraps",
        "selectedComponent": "mino-arms-2",
        "zIndex": null
      },
    )

    this.addAvailableItem("Arms", {
        "id": "1325a21a-ffff-459d-aaaa-ef023c09763d",
        "slotName": "Arms",
        "displayName": "With wraps (Blue)",
        "selectedComponent": "mino-arms-2",
        "color1": "#0c2d59",
        "zIndex": null
      },
    )
  }

  private configureBeards() {
    this.addAvailableItem("Beard", {
        "id": "empty",
        "slotName": "Nose_Accessory",
        "displayName": "Empty",
        "selectedComponent": "body-empty",
        "zIndex": null
      },
    )

    this.addAvailableItem("Beard", {
        "id": "472a6b62-4092-4585-8cfe-2a67c6bc6b66",
        "slotName": "Beard",
        "displayName": "Small Gotee (Brown)",
        "selectedComponent": "mino-gotee-1",
        "zIndex": 8
      },
    )

    this.addAvailableItem("Beard", {
        "id": "472a6b62-4092-dkad-8cfe-2a67c6bc6b66",
        "slotName": "Beard",
        "displayName": "Small Gotee (Grey)",
        "selectedComponent": "mino-gotee-1",
        "beardColor": "grey",
        "zIndex": 8
      },
    )

  }

  private configureHorns() {
    this.addAvailableItem("Horns", {
        "id": "empty",
        "slotName": "Horns",
        "displayName": "Empty",
        "selectedComponent": "body-empty",
        "zIndex": null
      },
    )
    this.addAvailableItem("Horns", {
        "id": "1325e34a-fa02-459d-b8b6-df013c09763d",
        "slotName": "Horns",
        "displayName": "Default",
        "selectedComponent": "mino-horns-1",
        "zIndex": null
      }
    )
    this.addAvailableItem("Horns", {
        "id": "2325e34a-fa02-459d-b8b6-df013c09763c",
        "slotName": "Horns",
        "displayName": "Horns (Gold)",
        "selectedComponent": "mino-horns-1",
        "color1": "#dbb045",
        "zIndex": null
      }
    )
  }

  private configureLegs() {
    this.addAvailableItem("Legs", {
        "id": "1325e34a-ffff-459d-b8b6-df013c09763d",
        "slotName": "Legs",
        "displayName": "Default",
        "selectedComponent": "mino-legs-1",
        "zIndex": null
      }
    )
    this.addAvailableItem("Legs", {
        "id": "1325e34a-aaaa-459d-b8b6-df013c09763d",
        "slotName": "Legs",
        "displayName": "Golden Hoofs",
        "color1": "#dbb045",
        "selectedComponent": "mino-legs-1",
        "zIndex": null
      }
    )
  }

  private configurePants() {
    this.addAvailableItem("Pants", {
        "id": "955dec16-3519-43e7-ba53-8aacfa218c7d",
        "slotName": "Pants",
        "displayName": "Default",
        "selectedComponent": "mino-pants-1",
        "zIndex": 6
      }
    )

    this.addAvailableItem("Pants", {
        "id": "955dec16-s5a9-43a7-baA3-8cacfa218c7d",
        "slotName": "Pants",
        "displayName": "Pants (Blue)",
        "selectedComponent": "mino-pants-1",
        "mainColor": "#0c2d59",
        "zIndex": 6
      }
    )
  }

  private configureBelts() {
    this.addAvailableItem("Belt", {
        "id": "empty",
        "slotName": "Belt",
        "displayName": "Empty",
        "selectedComponent": "body-empty",
        "zIndex": null
      },
    )

    this.addAvailableItem("Belt", {
        "id": "c110b882-09af-4d8f-add8-8e57861663f6",
        "slotName": "Belt",
        "displayName": "Default",
        "selectedComponent": "mino-belt-1",
        "zIndex": 7
      }
    )

    this.addAvailableItem("Belt", {
        "id": "c110b882-08af-3d8f-add8-8e46861663f6",
        "slotName": "Belt",
        "displayName": "Belt (Yellow)",
        "selectedComponent": "mino-belt-1",
        "color1": "#faac22",
        "zIndex": 7
      }
    )
  }

  private configureEars() {
    this.addAvailableItem("Ears", {
        "id": "a16586fd-936a-4d0b-b2e6-57c23159186a",
        "slotName": "Ears",
        "displayName": "Ears Default",
        "selectedComponent": "mino-ear-1",
        "zIndex": 7
      }
    )
  }

  private configureHair() {
    this.addAvailableItem("Hair", {
        "id": "empty",
        "slotName": "Hair",
        "displayName": "Empty",
        "selectedComponent": "body-empty",
        "zIndex": null
      },
    )

    this.addAvailableItem("Hair", {
        "id": "4425e34a-ffff-459d-b8b6-df013c09763d",
        "slotName": "Hair",
        "displayName": "Default",
        "selectedComponent": "mino-hair-1"
      }
    );

    this.addAvailableItem("Hair", {
        "id": "4425e34a-ffff-459d-a8b6-df013c097633",
        "slotName": "Hair",
        "displayName": "Hair (Gold)",
        "selectedComponent": "mino-hair-1",
        "hairColor": "#faac22",
        "color1": "#444342"
      }
    )
  }

  private configureTraits() {
    this.addAvailableCharacterTrait("bodyColor", {traitSlot: 'bodyColor', optionName: 'light-grey', optionValue: 'grey'});
    this.addAvailableCharacterTrait("bodyColor", {traitSlot: 'bodyColor', optionName: 'brown', optionValue: '#724035'});
    this.addAvailableCharacterTrait("bodyColor", {traitSlot: 'bodyColor', optionName: 'dark-red', optionValue: '#942712'});
    this.addAvailableCharacterTrait("bodyColor", {traitSlot: 'bodyColor', optionName: 'yellow', optionValue: '#c29e0e'});
  }

  private configureBody() {
    this.addAvailableItem("MainBody", {
        "id": "bf53e703-0424-439c-8280-d542948d99fe",
        "slotName": "MainBody",
        "displayName": "Body (Default)",
        "selectedComponent": "mino-body-1"
      }
    )

  }

  private configureHeads() {
    const slots = [
      {
        "slotName": "Hair"
      },
      {
        "id": "70a675c7-88c5-4072-9898-4cbb84261223",
        "slotName": "Eyes",
        "displayName": "Angry",
        "selectedComponent": "mino-eye-1",
        "zIndex": 7
      },
      {
        "id": "a16586fd-936a-4d0b-b2e6-57c23159186a",
        "slotName": "Ears",
        "selectedComponent": "mino-ear-1",
        "zIndex": 7
      },
      {
        "id": "a256bdbd-3081-47d1-8742-fa692300141b",
        "slotName": "Mouth",
        "selectedComponent": "mino-mouth-1",
        "zIndex": 7,
        "slots": [
          {
            "slotName": "Nose_Accessory"
          },
          {
            "slotName": "Beard"
          }
        ]
      }
    ];

    const slotsChangedWithoutHair = [
      {
        "id": "70a675c7-88c5-4072-9898-4cbb84261223",
        "slotName": "Eyes",
        "displayName": "Angry",
        "selectedComponent": "mino-eye-1",
        "zIndex": 7
      },
      {
        "id": "a16586fd-936a-4d0b-b2e6-57c23159186a",
        "slotName": "Ears",
        "selectedComponent": "mino-ear-1",
        "zIndex": 7
      },
      {
        "id": "a256bdbd-3081-47d1-8742-fa692300141b",
        "slotName": "Mouth",
        "selectedComponent": "mino-mouth-1",
        "zIndex": 7,
        "slots": [
          {
            "slotName": "Nose_Accessory"
          },
          {
            "slotName": "Beard"
          }
        ]
      }
    ];

    this.addAvailableItem("Head", {
        "id": "90185ad6-5efe-4305-bd47-1c9a0033eec6",
        "slotName": "Head",
        "displayName": "Head (Default)",
        "selectedComponent": "mino-head-1",
        "zIndex": 6,
        "slots": slots
      }
    )

    this.addAvailableItem("Head", {
        "id": "90185ad6-5efe-4305-bd47-1c9a0033eeaa",
        "slotName": "Head",
        "displayName": "Test Head",
        "selectedComponent": "mino-head-1",
        "zIndex": 6,
        "slots": slotsChangedWithoutHair
      }
    )
  }
}
