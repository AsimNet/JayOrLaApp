


export class User {
  constructor(private name: string,
              private id?:number) {


              }

get getName(): string{
    return this.name;
}

get getId(): number{
    return this.id;
}
}