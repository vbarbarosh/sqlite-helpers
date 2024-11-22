#!/usr/bin/env node

const cli = require('@vbarbarosh/node-helpers/src/cli');
const fs_path_resolve = require('@vbarbarosh/node-helpers/src/fs_path_resolve');
const sqlite_all = require('../src/sqlite_all');
const sqlite_close = require('../src/sqlite_close');
const sqlite_exec = require('../src/sqlite_exec');
const sqlite_open = require('../src/sqlite_open');
const sqlite_run_delete = require('../src/sqlite_run_delete');

cli(main);

async function main()
{
    const db = await sqlite_open(fs_path_resolve(__dirname, '../a.db'));
    try {
        await sqlite_exec(db, `
            DROP TABLE IF EXISTS demos;
            CREATE TABLE demos (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               label TEXT NULL,
               description TEXT NULL
            );
            INSERT INTO demos (label,description) VALUES
            ('demo1', 'desc1'),
            ('demo2', 'desc2'),
            ('demo3', 'desc3'),
            ('demo4', 'desc4'),
            ('demo5', 'desc5');
        `);
        console.log(await sqlite_all(db, 'SELECT * FROM demos'));
        console.log(await sqlite_run_delete(db, 'DELETE FROM demos WHERE id IN (?,?)', [2,3]));
        console.log(await sqlite_all(db, 'SELECT * FROM demos'));
    }
    finally {
        await sqlite_close(db);
    }
}
