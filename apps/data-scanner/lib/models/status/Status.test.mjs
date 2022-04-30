import sinon from 'sinon';
import assert from 'assert';
import ModelBase from '../ModelBase.mjs';
import { Status } from './Status.mjs';

describe('Status', function () {
    let repositorySpy;
    beforeEach(function () {
        repositorySpy = {
            status: {
                readByPhone: sinon.spy(),
                save: sinon.spy(),
            }
        }
        ModelBase.setRepository(repositorySpy);
    });

    afterEach(function() {
        ModelBase.setRepository(null);
    });

    it('readByPhone', async function () {
        const params = { phoneNumber: '1234567890' };
        await (new Status().readByPhone(params));
        assert(repositorySpy.status.readByPhone.calledOnce, 'readbByPhone should be called once');
        assert(repositorySpy.status.readByPhone.calledWith(params), 'readbByPhone should be called with params');
    })

    it('save', async function () {
        const params = {};
        await (new Status().save(params));
        assert(repositorySpy.status.save.calledOnce, 'save should be called once');
        assert(repositorySpy.status.save.calledWith(params), 'save should be called with params');
    })
})
