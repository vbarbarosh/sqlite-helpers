const sqlite_transaction = require('./sqlite_transaction');

async function sqlite_update(db, table, items)
{
    const tmp = {};
    items.forEach(function (item) {
        Object.keys(item).forEach(key => tmp[key] = true);
    });
    delete tmp.id;
    const columns = Object.keys(tmp);

    if (columns.length === 0) {
        throw new Error('No columns to update');
    }

    await sqlite_transaction(db, async function () {
        const stmt = db.prepare(`
            UPDATE
                ${table}
            SET
                ${columns.map(col => `${col} = ?`).join()}
            WHERE
                id = ?
        `, []);
        items.forEach(item => stmt.run(...columns.map(col => item[col] ?? null), item.id));
        await new Promise(function (resolve, reject) {
            stmt.finalize(function (error, value) {
                error ? reject(error) : resolve(value);
            });
        });
    })
}

module.exports = sqlite_update;
