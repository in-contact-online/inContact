export interface IStatus {
     id: number;
     phoneNumber: string;
     userName: string | null;
     wasOnline: string | null;
     checkDate: string | null;
}

export interface IStatusRaw {
     id: number;
     phone_number: string;
     username: string | null;
     was_online: string | null;
     check_date: string;
}

export interface IStatusesResponse {
     data: IStatus[];
     total: number;
}

export class Status implements IStatus {
     
     id: number;

     phoneNumber: string;

     userName: string | null;

     wasOnline: string | null;

     checkDate: string | null;

     constructor(props: IStatusRaw) {
          this.id = props.id;
          this.phoneNumber = props.phone_number;
          this.userName = props.username;
          this.checkDate = props.check_date;
          this.wasOnline = props.was_online;
     }
}
