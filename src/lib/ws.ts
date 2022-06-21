import { Client, TransactionStream } from 'xrpl';

/**
 * xrplSubscriptionToRegistryWS
 * Class for listening to a registry of addresses
 */
class xrplSubscriptionToRegistryWS {
  [index: string]: any;
  registry: string[] | undefined;
  registryAccounts: string[] | undefined;
  url: string | any;
  ws: Client | undefined;

  /**
   * Open a subsription stream with XRPLjs.
   * @param {string} url - The url to the server.
   * @param {string[]} registry - The subsription registry: List of XRPL addresses.
   */
  constructor(url: string, registry: string[]) {
    this.registry = registry;
    this.url = url;
    this.ws = undefined;
    this.registryAccounts = undefined;
    this._connect(url);
  }

  /**
   * Connect to client and initalize listeners
   * @param {string} url - The url to the server.
   */
  private _connect = (url: string): void => {
    this.ws = new Client(url);
    this.ws.connect();
    this.ws.on('connected', () => this._onOpen);
    this.ws.on('transaction', (evt: TransactionStream) => this._onTx(evt));
    this.ws.on('disconnected', (evt: number) => this._onClose(evt));
    this.ws.on('error', (evt: any[]) => this._onError(evt));
  };

  /**
   * Forceful disconnect from client
   */
  public disconnect = (): void => {
    this.ws?.disconnect();
  };

  /**
   * Event indication that the client is open
   *  Proceeds to subscribe to registry
   */
  private async _onOpen(): Promise<void> {
    console.log('open:');
    this.ws?.request({
      command: 'subscribe',
      accounts: this.registryAccounts || null,
      streams: ['transactions', 'ledger'],
    });
  }

  /**
   * Captured emitted event on transaction message
   */
  private async _onTx(event: any): Promise<void> {
    console.log(JSON.parse(event.data));
  }

  /**
   * Captured emitted event on error message
   */
  private _onError(event: any[]): void {
    console.log('error:', event);
    this.ws?.disconnect();
  }

  /**
   * Captured emitted event on close message
   */
  private _onClose(event: number): void {
    console.log('close:', event);
  }
}

export default xrplSubscriptionToRegistryWS;
