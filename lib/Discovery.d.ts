import { Device } from './';
import { IOptions } from './options';
/**
 * Class responsible for discovering Axis cameras on the network.
 */
export declare class Discovery {
    private readonly eventEmitter;
    private readonly options;
    private sockets?;
    /**
     * Initializes a new instance of the class.
     * @param options The SSDP discovery options.
     */
    constructor(options?: IOptions);
    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    start(): Promise<void>;
    /**
     * Stop listening for device advertisements.
     */
    stop(): Promise<void>;
    /**
     * Triggers a new search for devices on the network.
     */
    search(target?: string): Promise<void>;
    /**
     * Register a callback that is invoked when a device is found on the
     * network.
     */
    onHello(callback: (device: Device) => void): void;
    /**
     * Register a callback that is invoked when a device intentionally is
     * disconnecting from the network.
     */
    onGoodbye(callback: (device: Device) => void): void;
    private setup();
    private setupSocket(socket);
    private teardown();
    private teardownSocket(socket);
    private onHelloMessage(message);
    private onGoodbyeMessage(message);
    private requestRootDescription(remoteAddress, location);
}
