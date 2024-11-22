#!/usr/bin/env node

const cli = require('@vbarbarosh/node-helpers/src/cli');
const fs_path_resolve = require('@vbarbarosh/node-helpers/src/fs_path_resolve');
const sqlite_close = require('../src/sqlite_close');
const sqlite_open = require('../src/sqlite_open');
const sqlite_run = require('../src/sqlite_run');
const sqlite_table_exists = require('../src/sqlite_table_exists');

cli(main);

async function main()
{
    const db = await sqlite_open(fs_path_resolve(__dirname, '../a.db'));
    try {
        await sqlite_run(db, 'DROP TABLE IF EXISTS demos');
        await sqlite_run(db, `
            CREATE TABLE demos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                label TEXT NULL,
                description TEXT NULL
            )
        `);
        console.log(await sqlite_table_exists(db, 'demos'));
        await sqlite_run(db, 'DROP TABLE IF EXISTS demos');
        console.log(await sqlite_table_exists(db, 'demos'));
    }
    finally {
        await sqlite_close(db);
    }
}
