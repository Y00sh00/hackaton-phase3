export const IMASCOT_MANAGER_ABI = [
  {
    "type": "function",
    "name": "kalb_v17__addSlotToMascot",
    "inputs": [
      {
        "name": "mascotId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "slotId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__getAllSlots",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct OwnAbleSlotData[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "x",
            "type": "int256",
            "internalType": "int256"
          },
          {
            "name": "y",
            "type": "int256",
            "internalType": "int256"
          },
          {
            "name": "slotName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "selectedComponent",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "displayName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "slots",
            "type": "uint256[]",
            "internalType": "uint256[]"
          },
          {
            "name": "properties",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "owned",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__getAllTraits",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct OwnAbleTraitData[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "traitSlot",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "optionName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "optionValue",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "owned",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__getFullSlots",
    "inputs": [
      {
        "name": "sourceSlots",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct FullSlotData[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "x",
            "type": "int256",
            "internalType": "int256"
          },
          {
            "name": "y",
            "type": "int256",
            "internalType": "int256"
          },
          {
            "name": "slotName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "selectedComponent",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "displayName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "slots",
            "type": "uint256[]",
            "internalType": "uint256[]"
          },
          {
            "name": "properties",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__getFullUserMascots",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct FullMascotData[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "owner",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "mascotType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "slots",
            "type": "tuple[]",
            "internalType": "struct FullSlotData[]",
            "components": [
              {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "x",
                "type": "int256",
                "internalType": "int256"
              },
              {
                "name": "y",
                "type": "int256",
                "internalType": "int256"
              },
              {
                "name": "slotName",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "selectedComponent",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "displayName",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "slots",
                "type": "uint256[]",
                "internalType": "uint256[]"
              },
              {
                "name": "properties",
                "type": "string",
                "internalType": "string"
              }
            ]
          },
          {
            "name": "traits",
            "type": "tuple[]",
            "internalType": "struct TraitData[]",
            "components": [
              {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "traitSlot",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "optionName",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "optionValue",
                "type": "string",
                "internalType": "string"
              }
            ]
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__getMascot",
    "inputs": [
      {
        "name": "mascotId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct MascotData",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "owner",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "mascotType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "slots",
            "type": "uint256[]",
            "internalType": "uint256[]"
          },
          {
            "name": "traits",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__getSlot",
    "inputs": [
      {
        "name": "slotId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct SlotData",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "x",
            "type": "int256",
            "internalType": "int256"
          },
          {
            "name": "y",
            "type": "int256",
            "internalType": "int256"
          },
          {
            "name": "slotName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "selectedComponent",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "displayName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "slots",
            "type": "uint256[]",
            "internalType": "uint256[]"
          },
          {
            "name": "properties",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__getSlotChanges",
    "inputs": [
      {
        "name": "mascotId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "slotNames",
        "type": "string[]",
        "internalType": "string[]"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct SlotChange[]",
        "components": [
          {
            "name": "slotName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "selectedSlot",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__getTrait",
    "inputs": [
      {
        "name": "traitId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct TraitData",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "traitSlot",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "optionName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "optionValue",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__getTraitChanged",
    "inputs": [
      {
        "name": "mascotId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "traitSlot",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct MascotTraitChangesData",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "optionName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "optionValue",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__getUserMascots",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__removeSlotChanges",
    "inputs": [
      {
        "name": "mascotId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "slotNames",
        "type": "string[]",
        "internalType": "string[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__removeTraitChanges",
    "inputs": [
      {
        "name": "mascotId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "traitSlot",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__setup",
    "inputs": [],
    "outputs": [
      {
        "name": "table",
        "type": "tuple",
        "internalType": "struct MascotSystemSettingsData",
        "components": [
          {
            "name": "currentSlotId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "currentTraitId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "currentMascotId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "currentCosmeticSlotId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "currentCosmeticTraitId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "currentMascotIds",
            "type": "uint256[]",
            "internalType": "uint256[]"
          },
          {
            "name": "currentTraitIds",
            "type": "uint256[]",
            "internalType": "uint256[]"
          },
          {
            "name": "currentSlotIds",
            "type": "uint256[]",
            "internalType": "uint256[]"
          },
          {
            "name": "currentCosmeticSlotIds",
            "type": "uint256[]",
            "internalType": "uint256[]"
          },
          {
            "name": "currentCosmeticTraitIds",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__updateSlots",
    "inputs": [
      {
        "name": "mascotId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "slotNames",
        "type": "string[]",
        "internalType": "string[]"
      },
      {
        "name": "selectedSlotIds",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__updateTraits",
    "inputs": [
      {
        "name": "mascotId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "traitSlot",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "traitId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "optionName",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "optionValue",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
] as const
