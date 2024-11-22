const Promise = require('bluebird');

/**
 * Execute several SQL statements at once. No parameters are allowed.
 *
 * @link https://github.com/TryGhost/node-sqlite3/wiki/API#execsql--callback
 */
async function sqlite_exec(db, sql)
{
    return new Promise(function (resolve, reject) {
        db.exec(sql, function (error) {
            error ? reject(error) : resolve();
        });
    });
}

module.exports = sqlite_exec;
