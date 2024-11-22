const Promise = require('bluebird');

/**
 * Runs the SQL query with the specified parameters and calls the
 * callback with all result rows afterward.
 *
 * @link https://github.com/TryGhost/node-sqlite3/wiki/API#allsql--param---callback
 */
async function sqlite_all(db, sql, params = [])
{
    return new Promise(function (resolve, reject) {
        db.all(sql, params, function (error, out) {
            error ? reject(error) : resolve(out);
        });
    });
}

module.exports = sqlite_all;
