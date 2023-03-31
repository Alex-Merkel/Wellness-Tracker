import pgPromise, { IMain } from "pg-promise";

const pgp: IMain = pgPromise();
const db = pgp({
    host: 'raja.db.elephantsql.com',
    port: 5432,
    database: 'oieqoshs',
    user: 'oieqoshs',
    password: 'Wpv2tC_JhfqNXcJwPL3algLp0XEyE8e6',
})

export default db;