import sinon from 'sinon';
import assert from 'assert';
import ModelBase from '../ModelBase.mjs';
import { Session } from './Session.mjs';

describe('Session', function () {
    let repositorySpy;
    beforeEach(function () {
        repositorySpy = {
            session: {
                readByPhone: sinon.spy(),
                readAll: sinon.spy(),
                save: sinon.spy(),
            },
        };
        ModelBase.setRepository(repositorySpy);
    });

    afterEach(function () {
        ModelBase.setRepository(null);
    });

    it('readByPhone', async function () {
        const params = { phone: '1234567890' };
        await new Session().readByPhone(params);
        assert(repositorySpy.session.readByPhone.calledOnce, 'readbByPhone should be called once');
        assert(repositorySpy.session.readByPhone.calledWith(params), 'readbByPhone should be called with params');
    });

    it('readAll', async function () {
        await new Session().readAll();
        assert(repositorySpy.session.readAll.calledOnce, 'readAll should be called once');
        assert(repositorySpy.session.readAll.calledWith(), 'readAll should be called with no params');
    });

    it('save', async function () {
        const params = {};
        await new Session().save(params);
        assert(repositorySpy.session.save.calledOnce, 'save should be called once');
        assert(repositorySpy.session.save.calledWith(params), 'save should be called with params');
    });
});
