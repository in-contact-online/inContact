import assert from 'assert';
import { User } from './User';
import ModelBase from '../ModelBase';

const repository = {
    user: {
        read: async function ({ phone }) {
            return { phone };
        },
    },
};

describe('User', function () {
    it('should read user from repository', async function () {
        ModelBase.setRepository(repository);
        const phone = '0951112233';
        const user = await new User().read(phone);
        assert.deepStrictEqual(user, { phone });
    });
});
