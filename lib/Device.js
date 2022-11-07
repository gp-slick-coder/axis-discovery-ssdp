"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
/**
 * Class describing a device on the network.
 */
class Device {
    /**
     * Initializes a new instance of the class.
     * @param address The address.
     * @param port The port.
     * @param macAddress The MAC address. In most situations this is identical
     * to the serial number. The exceptions are the Axis products which bundle
     * multiple physical devices into a single casing with a shared network
     * interface. Because of the shared network interface they also share the
     * same MAC address.
     * @param friendlyName The short description for the end user.
     * @param modelName The model name.
     * @param modelDescription The long model description for the end user.
     * @param modelNumber The model number.
     * @param presentationURL The URL to the web page of the device.
     */
    constructor(
    /**
     * Gets the address.
     */
    address, 
    /**
     * Gets the port.
     */
    port, 
    /**
     * Gets the MAC address. In most situations this is identical to the
     * serial number. The exceptions are the Axis products which bundle
     * multiple physical devices into a single casing with a shared network
     * interface. Because of the shared network interface they also share
     * the same MAC address.
     */
    macAddress, 
    /**
     * Gets the short description for the end user.
     */
    friendlyName, 
    /**
     * Gets the model name.
     */
    modelName, 
    /**
     * Gets the long model description for the end user.
     */
    modelDescription, 
    /**
     * Gets the model number.
     */
    modelNumber, 
    /**
     * Gets the URL to the web page of the device.
     */
    presentationURL) {
        this.address = address;
        this.port = port;
        this.macAddress = macAddress;
        this.friendlyName = friendlyName;
        this.modelName = modelName;
        this.modelDescription = modelDescription;
        this.modelNumber = modelNumber;
        this.presentationURL = presentationURL;
    }
}
exports.Device = Device;
//# sourceMappingURL=Device.js.map