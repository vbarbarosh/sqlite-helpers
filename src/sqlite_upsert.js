const Promise = require('bluebird');
const sqlite_transaction = require('./sqlite_transaction');

/**
 * @link https://www.sqlite.org/lang_upsert.html
 */
async function sqlite_upsert(db, table, unique, items)
{
    const tmp = {};
    items.forEach(function (item) {
        Object.keys(item).forEach(key => tmp[key] = true);
    });
    const columns = Object.keys(tmp);

    if (columns.length === 0) {
        throw new Error('No columns to insert');
    }

    return await sqlite_transaction(db, async function () {
        const stmt = db.prepare(`
            INSERT INTO
                ${table} (${columns.join()})
            VALUES
                (${columns.slice().fill('?').join()})
                ON CONFLICT (${unique}) DO UPDATE SET
                    ${columns.map(col => `${col} = excluded.${col}`).join()}
        `);
        items.forEach(v => stmt.run(...columns.map(col => v[col])));
        await new Promise(function (resolve, reject) {
            stmt.finalize(function (error, value) {
                error ? reject(error) : resolve(value);
            });
        });
    })
}

module.exports = sqlite_upsert;
