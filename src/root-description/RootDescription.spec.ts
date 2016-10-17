import { expect } from 'chai';

import * as ObjectMother from '../ObjectMother.spec';
import { RootDescription } from './RootDescription';

describe('when parsing root description', () => {
    it('should return remote address', () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        const actual = subject.remoteAddress;

        expect(actual).to.equal('192.168.1.102');
    });

    it('should return friendly name', async () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        const actual = await subject.getFriendlyNameAsync();

        expect(actual).to.equal('AXIS M1014 - ACCC8E270AD8');
    });

	it('should return model description', async () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        const actual = await subject.getModelDescriptionAsync();

        expect(actual).to.equal('AXIS M1014 Fixed Network Camera');
    });

    it('should not return model description if missing', async () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        const actual = await subject.getModelDescriptionAsync();

        expect(actual).to.to.null;
    });

    it('should return model name', async () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        const actual = await subject.getModelNameAsync();

        expect(actual).to.equal('AXIS M1014');
    });

    it('should return model number', async () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        const actual = await subject.getModelNumberAsync();

        expect(actual).to.equal('M1014');
      });

    it('should not return model number if missing', async () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        const actual = await subject.getModelNumberAsync();

        expect(actual).to.be.null;
    });

    it('should return serial number', async () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        const actual = await subject.getSerialNumberAsync();

        expect(actual).to.equal('ACCC8E270AD8');
    });

    it('should not return serial number if missing', async () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        const actual = await subject.getSerialNumberAsync();

        expect(actual).to.be.null;
    });

    it('should return presentation URL', async () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_DEFAULT_HTTP_PORT);

        const actual = await subject.getPresentationUrlAsync();

        expect(actual).to.equal('http://192.168.1.102:80/');
    });

    it('should not return presentation URL if missing', async () => {
        const subject = new RootDescription(
            ObjectMother.REMOTE_ADDRESS,
            ObjectMother.ROOT_DESCRIPTION_REQUIRED_PROPERTIES);

        const actual = await subject.getPresentationUrlAsync();

        expect(actual).to.be.null;
    });
});
