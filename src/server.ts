import { setTimeout } from 'timers';
import { Device, Discovery } from './';

const discovery = new Discovery();

discovery.onHello((device: Device) => {
    if (device.macAddress) {
        console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.macAddress} on ${device.address}`);
    } else {
        console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.friendlyName} on ${device.address}`);
        console.log(`\tmodel: ${device.modelName}`);
        // console.log('Full data', JSON.stringify(device));
    }
});

discovery.onGoodbye((device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.macAddress} on ${device.address}`);
});

discovery.start()
    // .then(() => discovery.search('urn:schemas-upnp-org:device:MediaServer:1'));
    .then(() => discovery.search());

setTimeout(() => {
    discovery.stop();
}, 3000);
