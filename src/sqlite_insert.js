const sqlite_escape_column = require('./sqlite_escape_column');
const sqlite_escape_table = require('./sqlite_escape_table');
const sqlite_run_insert = require('./sqlite_run_insert');

/**
 * Execute INSERT statement and return last inserted id.
 */
async function sqlite_insert(db, table, object)
{
    const keys = Object.keys(object);
    const values = keys.map(key => object[key]);
    return sqlite_run_insert(db, `
        INSERT INTO
            ${sqlite_escape_table(table)} (${keys.map(sqlite_escape_column).join()})
        VALUES (${values.slice().fill('?').join()})
    `, values);
}

module.exports = sqlite_insert;
