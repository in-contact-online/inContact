export interface ISystem {
     cpuUsage: number;
     freeMemory: string;
     totalMemory: string;
     serverUptime: string;
}

export interface ISystemRaw {
     serviceStatuses: {};
     resourceUsage: {
          cpuUsage: number;
          freeMemory: string;
          totalMemory: string;
          serverUptime: string;
     };
}

export class System implements ISystem {

     cpuUsage: number;

     freeMemory: string;

     totalMemory: string;

     serverUptime: string;

     constructor(props: ISystemRaw) {
          this.cpuUsage = props.resourceUsage.cpuUsage;
          this.freeMemory = props.resourceUsage.freeMemory;
          this.totalMemory = props.resourceUsage.totalMemory;
          this.serverUptime = props.resourceUsage.serverUptime;
     }
}
