import { setTimeout } from 'timers';
import { Device, Discovery } from './';

const discovery = new Discovery();

discovery.onHello((device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.macAddress} on ${device.address}`);
    console.log(`\tport: ${device.port}`);
    console.log(`\tmodel: ${device.modelName}`);
});

discovery.onGoodbye((device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.macAddress} on ${device.address}`);
});

discovery.start()
    .then(() => discovery.search('urn:schemas-upnp-org:device:MediaServer:1'));

setTimeout(() => {
    discovery.stop();
}, 2000);
