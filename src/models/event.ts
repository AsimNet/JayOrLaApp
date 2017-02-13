


export class Event {
  constructor(private name: string,
              private user_id: number,
              private end_date: string,
              private notes: string,
              private hash?: string,
              private id?:number) {


              }



get getName(): string{
    return this.name;
}

get getUser_id(): number{
    return this.user_id;
}

get getEndDate(): string{
    return this.end_date;
}

get getNotes(): string{
    return this.name;
}
get getHash(): string{
    return this.hash;
}

get getEventId(): number{
    return this.id;
}
}