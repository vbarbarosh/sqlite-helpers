const sqlite_run = require('./sqlite_run');

/**
 * @link [SQLite Insert very slow?](https://stackoverflow.com/questions/3852068/sqlite-insert-very-slow)
 * @link [Transactions in node-sqlite3](https://stackoverflow.com/a/53321997/1478566)
 */
async function sqlite_transaction(db, fn)
{
    await sqlite_run(db, 'BEGIN');
    try {
        await fn();
        await sqlite_run(db, 'COMMIT');
    }
    catch (error) {
        await sqlite_run(db, 'ROLLBACK');
        throw error;
    }
}

module.exports = sqlite_transaction;
