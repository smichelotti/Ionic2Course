import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {Events} from "ionic-angular";
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from "@ionic-native/sqlite";

@Injectable()
export class UserSettingsService {
    private sqliteAvailable: boolean = false;
    private db: SQLiteObject;
    items = [];
    constructor(private storage: Storage, public events: Events, private sqlite: SQLite) {
        this.testStorage(true);
    }

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
        if (this.sqliteAvailable) {
            if (!this.db) {
                return this.initStorage();
            }
            return this.db.executeSql(`
              INSERT INTO favorites
              VALUES (?, ?)
            `, [team.id, JSON.stringify(item)])
                .then(
                    vals => {
                        this.events.publish('favorites:changed')
                    }
                )
                .catch(
                    err => console.error(err)
                )
        } else {
            this.storage.set(team.id, JSON.stringify(item))
                .then(
                    () => this.events.publish('favorites:changed')
                );
        }
    }

    unfavoriteTeam(team) {
        if (this.sqliteAvailable) {
            if (!this.db) {
                return this.initStorage();
            }
            this.db.executeSql(`
              DELETE FROM favorites
              WHERE id = ?
            `, [team.id])
                .then(
                    () => this.events.publish('favorites:changed')
                )
                .catch(
                    err => console.error(err)
                );
        } else {
            this.storage.remove(team.id)
                .then(
                    () => this.events.publish('favorites:changed')
                );
        }
    }

    isFavoriteTeam(teamId) {
        if (this.sqliteAvailable) {
            if (!this.db) {
                this.initStorage();
            }
            return this.db.executeSql(`
              SELECT * FROM favorites
              WHERE id = CAST(? AS INTEGER)
            `, [teamId])
                .then(
                    value => value.rows.length
                )
                .catch(
                    err => console.error(err)
                );
        } else {
            return this.storage.get(teamId)
                .then(
                    value => !!value
                );
        }
    }

    getAllFavorites() {
        if (this.sqliteAvailable) {
            if (!this.db) {
                this.initStorage()
            }
            return this.db.executeSql(`SELECT * FROM favorites`, {})
                .then(
                    vals => {
                        let items = [];
                        for (let i = 0; i < vals.rows.length; i++) {
                            items.push(JSON.parse(vals.rows.item(i).data));
                        }
                        this.items = items;
                    }
                )
                .catch(
                    err => console.error(err)
                );
        } else {
            let items = [];
            return this.storage.forEach(val => {
                items.push(JSON.parse(val));
            })
                .then(
                    () => this.items = items
                );
        }
    }

    testStorage(init: boolean = false) {
        return this.sqlite.echoTest()
            .then(
                () => {
                    this.sqliteAvailable = true;
                    if (init) {
                        this.initStorage();
                    }
                }
            )
            .catch(
                err => console.error(err)
            );
    }

    private initStorage() {
        let dbConfig: SQLiteDatabaseConfig = {
            name: 'data.db',
            location: 'default'
        };
        this.sqlite.create(dbConfig)
            .then(
                (db: SQLiteObject) => {
                    this.db = db;
                    this.db.executeSql(`
                      CREATE TABLE IF NOT EXISTS favorites
                      (
                        id    INTEGER   UNIQUE PRIMARY KEY,
                        data  TEXT
                      )
                    `, {})
                        .then(
                            () => console.log('DB and table initialized')
                        )
                        .catch(
                            err => console.error(err)
                        )
                }
            )
            .catch(
                err => console.error(err)
            );
    }
}
