#!/usr/bin/env node

const cli = require('@vbarbarosh/node-helpers/src/cli');
const fs_path_resolve = require('@vbarbarosh/node-helpers/src/fs_path_resolve');
const sqlite_close = require('../src/sqlite_close');
const sqlite_one_col = require('../src/sqlite_one_col');
const sqlite_open = require('../src/sqlite_open');

cli(main);

async function main()
{
    const db = await sqlite_open(fs_path_resolve(__dirname, '../a.db'));
    try {
        console.log(await sqlite_one_col(db, 'SELECT CONCAT(DATE(), " ", TIME())'));
    }
    finally {
        await sqlite_close(db);
    }
}
