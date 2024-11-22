#!/usr/bin/env node

const cli = require('@vbarbarosh/node-helpers/src/cli');
const fs_path_resolve = require('@vbarbarosh/node-helpers/src/fs_path_resolve');
const sqlite_all = require('../src/sqlite_all');
const sqlite_close = require('../src/sqlite_close');
const sqlite_insert = require('../src/sqlite_insert');
const sqlite_open = require('../src/sqlite_open');
const sqlite_run = require('../src/sqlite_run');

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
        console.log(await sqlite_insert(db, 'demos', {label: 'demo1', description: 'desc1'}));
        console.log(await sqlite_insert(db, 'demos', {label: 'demo2', description: 'desc2'}));
        console.log(await sqlite_all(db, 'SELECT * FROM demos'));
    }
    finally {
        await sqlite_close(db);
    }
}
