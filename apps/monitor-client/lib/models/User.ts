export interface IUser {
     id: number;
     userName: string | null;
     firstName: string | null;
     secondName: string | null;
     phone: string;
     active: boolean;
     createdAt: string;
     updatedAt: string;
}

export interface IUsersResponse {
     data: IUser[];
     total: number;
}

export interface IUserRaw {
     id: number;
     username: string | null;
     first_name: string | null;
     second_name: string | null;
     phone: string;
     active: boolean;
     created_at: string;
     updated_at: string;
}

export class User implements IUser {
     
     id: number;
     
     userName: string | null;
     
     firstName: string | null;

     secondName: string | null;

     phone: string;

     active: boolean;
     
     createdAt: string;

     updatedAt: string;

     constructor(props: IUserRaw) {
          this.id = props.id;
          this.userName = props.username;
          this.firstName = props.first_name;
          this.secondName = props.second_name;
          this.phone = props.phone;
          this.active = props.active;
          this.createdAt = props.created_at;
          this.updatedAt = props.updated_at;
     }
}
