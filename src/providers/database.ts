import { Event } from '../models/event';
import { SQLite } from 'ionic-native';


export class Database {

  public static db: SQLite = new SQLite();

  public static readonly DB_LOCATION = {
    name: 'data.db',
    location: 'default', // the location field is required
    createFromLocation: 1
  };

  constructor() {

  }
  public addToDB(model: Event): Promise<any> {
    return new Promise((resolve, reject) => {
      Database.db.transaction(function (tx) {

        tx.executeSql(`INSERT INTO event (Name, UserId, EndDate, Notes, Hash, CreatedAt, UpdatedAt, EventId) VALUES (?,?,?,?,?,?,?,?)`, [model.getName, model.getUser_id, model.getEndDate, model.getNotes, model.getHash, model.created_at, model.updated_at, model.id], function (tx, results) {
          // console.log("Last event inserted ID: " + Number(model.getEventId));
          resolve(results);

        });

      }).then(() => {
        // console.log('event Table insertion done successfully');

        // let watcher = Watcher.getInstance();
        // watcher.watch(event);
      }).then((error) => {
        reject(error);
      });

    })


  }

  public getEvents(): Promise<any> {
    //here pass a eventId and get all event's information and its guardian.

    return Database.db.openDatabase(Database.DB_LOCATION).then(() => {
      return Database.db.executeSql(`SELECT *
      FROM event
      Order by EventId DESC
`, []);
    }).then((data) => {

      return new Promise<Event[]>((sucess, faild) => {

        let result: Event[] = [];
        for (var i = 0; i < data.rows.length; i++) {

          let item = data.rows.item(i);
          // console.log("Got SQL Results@getEvents: " + data.rows.item(i).Name);

          let event: Event = new Event(item.Name, item.UserId, item.EndDate, item.Notes, item.Hash, item.CreatedAt, item.UpdatedAt, item.EventId);
          result.push(
            event
          )
        }

        sucess(result);


      });

    });

  }




  public static create = () => {
    // console.log("@create");

    Database.db.openDatabase({
      name: 'data.db',
      location: 'default', // the location field is required
      createFromLocation: 1
    }).then(() => {
      Database.db.transaction(function (tr) {
        tr.executeSql("CREATE TABLE if not exists  Event (`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ,Name text not null,UserId INTEGER not null,EndDate text not null,Notes text, Hash text not null, CreatedAt text not null, UpdatedAt text not null, EventId number not null)");
      }).then(() => {


      }).catch((err) => {
        // console.log("ERRORWHEN CREATING TABLES");
        // console.log(err.message);
      });

    })
  };






  public deleteEvent(event: Event) {
    // // console.log("deleteevent id: "+ event.getId);
    // // console.log(<event>event);
    let id = event.id;

    // console.log(" id == : " + id);
    // console.log(" event == : " + JSON.stringify(event));

    return Database.db.openDatabase(Database.DB_LOCATION).then(() => {
      return Database.db.executeSql(`
            DELETE 
            FROM Event
            WHERE EventId = ? 
        `, [id])

    }).catch(error => {
      // console.log("error with deleteing event: " + id + error);

    })
  }
}