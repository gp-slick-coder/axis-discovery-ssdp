import { BindOptions, createSocket, Socket } from 'dgram';
import { EventEmitter } from 'events';

import { SSDP_MULTICAST_ADDRESS, SSDP_PORT } from './Constants';
import { Device } from './Device';
import { MSearch } from './MessageTypes/MSearch';
import { MSearchResponse } from './MessageTypes/MSearchResponse';

/**
 * Class representing a SSDP socket.
 */
export class SsdpSocket extends EventEmitter {

	private socket: Socket;
	private uuidRegExp = /^uuid:\s*([^:\r]*)(::.*)*/i;

	/**
	 * Start listen for SSDP advertisements on specified network interface address.
	 * @address The network address to start listening for SSDP advertisements on.
	 */
	startOn(address: string) {
		if (this.socket != null) {
			throw 'Socket has already been started on an address'
		}

		this.socket = createSocket({ type: 'udp4', reuseAddr: true });

		this.socket.on('listening', () => {
			const address = this.socket.address();
      		console.log(`Socket is now listening on ${address.address}:${address.port}`);

			// Trigger a search when socket is ready
			this.search();
	    });

		this.socket.on('message', (message, remote) => {
			const response = new MSearchResponse(message, remote.address, remote.port, remote.family);
			const device = this.mapToDevice(response);

			this.emit('hello', device);
    	});

		this.socket.on('error', error => {
      		console.log('Socket error', error);
    	});

		this.socket.bind(undefined, address);
	}

	/**
	 * Starts a search for Axis cameras on the network by using HTTP method M-SEARCH.
	 */
	search() {
		const message = new MSearch().toBuffer();
		this.socket.send(message, 0, message.length, SSDP_PORT, SSDP_MULTICAST_ADDRESS);
	}

	private mapToDevice(response: MSearchResponse): Device {
		const usn = response.getHeaderValue('USN');
		if (usn ==  null) {
			throw 'M-SEARCH response does not contain parameter called USN.';
		}

		const uuidMatch = this.uuidRegExp.exec(usn);
		if (uuidMatch == null) {
			throw 'M-SEARCH parameter USN does not contain uuid.';
		}

		const start = uuidMatch[1].length - 12;
		const end = uuidMatch[1].length;
		const serialNumber = uuidMatch[1].slice(start, end).toUpperCase();
		
		return new Device(
			response.remoteAddress,
			serialNumber);
	}
}
