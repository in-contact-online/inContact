import { IUser } from '../../../models';

export function getUserName(user: IUser): string {
    let name: string = '';
    if (user.userName) name += user.userName;
    if (user.firstName) name += user.firstName;
    if (user.secondName) name += user.secondName;
    return name;
}
