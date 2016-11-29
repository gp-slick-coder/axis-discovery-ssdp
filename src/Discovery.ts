import * as events from 'events';
import * as _ from 'lodash';

import { NetworkInterfaceMonitor } from './network-interfaces/NetworkInterfaceMonitor';
import { RootDescriptionRequest } from './root-description/RootDescriptionRequest';
import { MSearchSocket } from './sockets/MSearchSocket';
import { NotifySocket } from './sockets/NotifySocket';
import { Message } from './sockets/Message';
import { SocketBase } from './sockets/SocketBase';
import { DeviceMapper } from './DeviceMapper';
import { Device } from './Device';
import { Log } from './Log';

export class Discovery {

    private readonly sockets = new Array<SocketBase>();
    private readonly networkInterfaceMonitor = new NetworkInterfaceMonitor();
    private readonly deviceMapper = new DeviceMapper();
    private readonly eventEmitter = new events.EventEmitter();

    /**
     * Start listen for SSDP advertisements on all network interface addresses.
     */
    start() {
        const addresses = this.networkInterfaceMonitor.getIPv4Addresses();

        // Start passive SSDP
        this.startSocket(new NotifySocket(addresses));

        // Start active SSDP
        _.forEach(addresses, address => this.startSocket(new MSearchSocket(address)));
    }

    /**
     * Triggers a new SSDP search for devices on the network.
     */
    search() {
        _.chain(this.sockets)
            .filter(socket => socket instanceof MSearchSocket)
            .map(socket => <MSearchSocket>socket)
            .forEach(socket => socket.search());
    }

    /**
     * Register a callback that is invoked when a device is found on the network.
     */
    onHello(callback: (device: Device) => void) {
        this.eventEmitter.on('hello', (device: Device) => callback(device));
    }

    /**
     * Register a callback that is invoked when a device intentionally is disconnecting from the
     * network.
     */
    onGoodbye(callback: (device: Device) => void) {
        this.eventEmitter.on('goodbye', (device: Device) => callback(device));
    }

    private startSocket(socket: SocketBase) {
        this.sockets.push(socket);
        socket.on('hello', (message: Message) => this.onHelloMessage(message));
        socket.on('goodbye', (message: Message) => this.onGoodbyeMessage(message));
        socket.start();
    }

    private onHelloMessage(message: Message) {
        // Emit initial hello
        this.eventEmitter.emit('hello', this.deviceMapper.fromMessage(message));

        // Request root description
        this.requestRootDescriptionAsync(message.remoteAddress, message.location);
    }

    private onGoodbyeMessage(message: Message) {
        this.eventEmitter.emit('goodbye', this.deviceMapper.fromMessage(message));
    }

    private async requestRootDescriptionAsync(remoteAddress: string, location: string): Promise<void> {
        try {
            const request = new RootDescriptionRequest(remoteAddress, location);
            const rootDescription = await request.sendAsync();
            const device = await this.deviceMapper.fromRootDescriptionAsync(rootDescription);
            this.eventEmitter.emit('hello', device);
        } catch (e) {
            Log.write(`Unable to get root description. ${e}`);
        }
    }
}
