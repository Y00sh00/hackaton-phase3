export const IMASCOT_CREATOR_ABI = [
  {
    "type": "function",
    "name": "kalb_v17__createMascot",
    "inputs": [
      {
        "name": "user",
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
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__createSlot",
    "inputs": [
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
        "name": "subSlotIds",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "properties",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "kalb_v17__createTrait",
    "inputs": [
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
        "name": "color",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  }
] as const
