import { Device, Discovery } from './'

// https://github.com/visionmedia/debug
import * as debug from 'debug'
debug.enable('*');

const discovery = new Discovery();

discovery.on('hello', (device: Device) => {
        console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.friendlyName} on ${device.address}`);
        console.log(`\tmodel: ${device.modelName}`);
        console.log(`\tport: ${device.port}`);
        // console.log('Full data', JSON.stringify(device));
});

discovery.on('goodbye', (device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.macAddress} on ${device.address}`);
});

discovery.start().then(() => discovery.search());
