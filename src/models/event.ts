

export interface EventInterface{
               name: string,
               user_id: number,
               end_date: number,
               notes: string,

}
export class Event implements EventInterface{
  constructor( public name: string,
               public user_id: number,
               public end_date: number,
               public notes: string,
               public hash?: string,
               public created_at?:number,
               public updated_at?:number,
               public id?: number) {


              }



get getName(): string{
    return this.name;
}

get getUser_id(): number{
    return this.user_id;
}

get getEndDate(): number{
    return this.end_date;
}

get getNotes(): string{
    return this.notes;
}
get getHash(): string{
    return this.hash;
}

get getEventId(): number{
    return this.id;
}
}