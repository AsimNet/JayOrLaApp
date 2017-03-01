


export class User {
    isComing: boolean = false;
    updatedAt: string


  constructor(private name: string,
              private id?:number) {


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
}