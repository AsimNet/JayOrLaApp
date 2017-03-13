


export class User {
    


  constructor(public name: string,
              public id?:number,
              public isComing?: boolean,
              public created_at?: string,
              public updatedAt?: string,
              public ip?: string,
              public event_id?: number,
              public userHash?: string
                ) {


              }

get getName(): string{
    return this.name;
}

get getId(): number{
    return this.id;
}
get getIsComing(): boolean{
    return this.isComing;
}
get getUserHash(): string{
    return this.userHash;
}
}