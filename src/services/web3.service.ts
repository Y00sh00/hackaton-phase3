import {Injectable} from '@angular/core';
import {createPublicClient, createWalletClient, custom, http} from "viem";
import {CONTRACT_NAMESPACE, CHAIN, WORLD_ADDRESS} from "../config.test";
import {BehaviorSubject} from "rxjs";
import {Account} from "viem/_types/accounts/types";
import {Address} from "abitype";
import {getWindow} from "ssr-window";

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  // Subjects
  private isConnectedSource = new BehaviorSubject<string>('unknown');
  public isConnected$ = this.isConnectedSource.asObservable();

  isEveVaultInjected: boolean = false;
  isAutoConnect: boolean = false;
  account: Account | Address | undefined = undefined;

  // These are kinda hard to type currently as they use complex generics
  window: any | undefined = undefined;
  walletClient: any = undefined;
  publicClient: any = undefined;
  windowEthereum: any = undefined;

  constructor() {
  }


  /**
   * Will init the service and auto connect if possible
   * @returns {Promise<void>}
   */
  // Todo fix this type
  public async init(provider: any = null) {
    this.window = getWindow();
    this.isAutoConnect = this.window.localStorage?.getItem("eve-vault-autoconnect") === "true";
    this.isEveVaultInjected = this.window.$onekey !== undefined;
    this.windowEthereum = this.window.$onekey?.ethereum;

    // Auto connect to wallet if possible
    if (typeof this.window !== undefined && this.isEveVaultInjected && this.isAutoConnect) {
      try {
        await this.connect(provider);
      } catch (e) {
        // TODO: hook this into your error handling of whichever application you are using
        console.error(e);
        throw e;
      }
    } else {
      this.isConnectedSource.next('disconnected')
    }
  }


  /**
   * Will connect from your wallet
   * @returns {Promise<void>}
   */
  // TOdo fix this type
  public async connect(provider: any = null) {
    // We request the account
    const [account] = await this.window.$onekey?.ethereum.request({
      method: "eth_requestAccounts",
      params: [{eth_accounts: {}}],
    });


    // Client for interactions to write contracts
    if (provider) {
      this.walletClient = createWalletClient({
        account,
        transport: http(provider),
      });
    } else {
      this.walletClient = createWalletClient({
        account,
        chain: CHAIN,
        transport: custom(this.windowEthereum),
      });
    }
    this.account = this.walletClient.account;

    // Client for reading public data from chain
    if (provider) {
      this.publicClient = createPublicClient({
        batch: {
          multicall: true,
        },
        transport: http(provider),
      });
    } else {
      this.publicClient = createPublicClient({
        batch: {
          multicall: true,
        },
        chain: CHAIN,
        transport: http(),
      })
    }

    // After first time connecting force auto connect
    localStorage.setItem("eve-vault-autoconnect", "true");
    this.isConnectedSource.next('connected')
  }

  /**
   * Will disconnect from your wallet
   * @returns {Promise<void>}
   */
  public async disconnect() {
    // After first time connecting force auto connect
    localStorage.setItem("eve-vault-autoconnect", "false");
    this.isConnectedSource.next('disconnected')
  }

  /**
   * Will initiate a write contract to trigger a method in your contract
   * @param abi the Abi to call
   * @param functionName the function name to call
   * @param args the arguments of the function
   * @returns {Promise<void>}
   */
  public async writeContract(abi: any, functionName: string, args: Array<any>) {
    // Set the correct account;
    let accountToUse: Account | Address;
    if (!this.account) {
      throw new Error('Could not obtain account');
    }
    accountToUse = this.account;

    // First we simulate the client to see if the validation and checks go OK
    const {request} = await this.publicClient.simulateContract({
      address: WORLD_ADDRESS,
      abi: abi,
      functionName: functionName,
      args: args,
      account: accountToUse
    })
    // Then we execute the contract
    const transactionHash = await this.walletClient.writeContract(request)
    await this.getTransactionReceipt(transactionHash);
  }


  /**
   * Will monitor a transaction has and either throw an error or log completion
   * @param hash the hash to monitor, obtained from write contact
   * @returns {Promise<void>}
   */
  public async getTransactionReceipt(hash: `0x{string}`) {
    try {
      const transaction = await this.publicClient.waitForTransactionReceipt({hash: hash});
      // TODO you would hook this into your notification system to indicate that things completed
      console.log("Transaction success", transaction);
    } catch (e: any) {
      throw new Error("Error executing transaction on chain", e);
    }
  }

  /**
   * Initiate a read contract to obtain data from the blockchain
   * @param abi the Abi to call
   * @param functionName the function name to call
   * @param args the arguments of the function
   * @returns {Promise<any>} returns the data
   */
  public async readContract(abi: any, functionName: string, args: Array<any>) {
    return await this.publicClient.readContract({
      address: WORLD_ADDRESS,
      abi: abi,
      functionName: functionName,
      args: args,
    });
  }

  public async simulateContract(abi: any, functionName: string, args: Array<any>) {
    // Set the correct account;
    let accountToUse: Account | Address;
    if (!this.account) {
      throw new Error('Could not obtain account');
    }
    accountToUse = this.account;

    const response = await this.publicClient.simulateContract({
      address: WORLD_ADDRESS,
      abi: abi,
      functionName: functionName,
      args: args,
      account: accountToUse,
    });
    return response.result;
  }

  /**
   * Utility method to go from doThisAction to yournamespace_yoursystem_doThisAction
   * @param functionName The name of the function
   * @returns {string} the exact name to call your contract on including namespace
   */
  public withNameSpaceAndName(functionName: string) {
    return `${CONTRACT_NAMESPACE}__${functionName}`

  }
}
