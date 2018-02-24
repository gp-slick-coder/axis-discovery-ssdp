import { Device } from './..';
import { RootDescription } from './../root-descriptions/RootDescription';

/**
 * Maps a root description to a device.
 */
export function mapFromRootDescription(rootDescription: RootDescription): Device | null {

    // this is not available on generic upnp devices
    // if (rootDescription.macAddress === undefined) {
    //     return null;
    // }

    return new Device(
        rootDescription.remoteAddress,
        parsePort(rootDescription.remoteAddress),
        rootDescription.macAddress,
        rootDescription.friendlyName,
        rootDescription.modelName,
        rootDescription.modelDescription,
        rootDescription.modelNumber,
        rootDescription.presentationUrl);
}

const portFromPresentationUrlRegExp = /:(\d+)\/?$/i;

function parsePort(presentationUrl: string | undefined): number | undefined {
    if (presentationUrl === undefined) {
        return undefined;
    }

    const portMatch = portFromPresentationUrlRegExp.exec(presentationUrl);
    if (portMatch == null) {
        return undefined;
    }

    return Number(portMatch[1]);
}
