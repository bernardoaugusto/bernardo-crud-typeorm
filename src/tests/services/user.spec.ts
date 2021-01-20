import { uuid } from 'uuidv4';

import User from '../../database/entities/User';
import UserService from '../../services/UserService';
import UserBuilder from '../testBuilders/UserBuilder';
import { makeUserService } from './makeInstance/user';
import { UserInterface } from '../../interfaces/user';

describe('User Service', () => {
    let userService: UserService;

    beforeAll(async () => {
        userService = makeUserService;
    });

    const makeSut = (userData?: Partial<UserInterface>): Promise<User> => {
        const user = new UserBuilder()
            .withMovimentId('moviment_id')
            .withDescription('description')
            .withOi('oi')
            .withCode(123)
            .withTest(123)
            .withMenor(123)
            .build();

        const userRequestData = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
        };

        return userService.create(Object.assign(user, userData), userRequestData);
    };

    it('should be able to create a new User', async () => {
        const sut = new UserBuilder()
            .withMovimentId('moviment_id')
            .withDescription('description')
            .withOi('oi')
            .withCode(123)
            .withTest(123)
            .withMenor(123)
            .build();

        const userRequestData = {
            username: 'Teste',
            useremail: 'teste@teste.com.br',
        };

        const expectedRes = {
            ...sut,

            created_by_name: userRequestData.username,
            created_by_email: userRequestData.useremail,
            updated_by_name: userRequestData.username,
            updated_by_email: userRequestData.useremail,
        };

        const {
            id,
            created_at,
            updated_at,
            active,
            ...entityProps
        } = await userService.create(sut, userRequestData);

        expect(entityProps).toEqual(expectedRes);
        expect(id).not.toBeUndefined();
        expect(active).toBe(true);
        expect(created_at).not.toBeUndefined();
        expect(updated_at).not.toBeUndefined();
    });
});
