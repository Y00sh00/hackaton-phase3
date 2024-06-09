export const WORLD_ADDRESS = '0x8dc9cab3e97da6df615a8a24cc07baf110d63071'
export const CONTRACT_NAMESPACE = 'kalb_v22'
export const MASCOT_MANAGER_SYSTEM_NAME = 'MascotManager'
// Chain configuration goes here
export const CHAIN = {
  id: 4541000,
  name: "EVE Testnet Game",
  network: "evetestnet1",
  nativeCurrency: {
    decimals: 18,
    name: "Gas",
    symbol: "GAS",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-game-sync.nursery.reitnorf.com"],
      webSocket: ["ws://testnet-game-sync.nursery.reitnorf.com:8546/"],
    },
    public: {
      http: ["https://testnet-game-sync.nursery.reitnorf.com"],
      webSocket: ["ws://archive-en1.devnet.dev-cluster.deusxvm.com:8546/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet-game-blockscout.nursery.reitnorf.com",
    },
  },
  contracts: {
    World: {
      address: "0x8dc9cab3e97da6df615a8a24cc07baf110d63071",
    },
    ERC721Proxy: {
      address: "",
    },
    ERC1155Proxy: {
      address: "",
    },
    EVEToken: {
      address: "0xec79573FAC3b9C103819beBBD00143dfD67059DA",
    },
    ERC2771Forwarder: {
      address: "0xdd70cebde1c639a069b47368feef137397df6b6e",
    },
  },
  sourceId: 4541000,
};
