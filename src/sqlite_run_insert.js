const Promise = require('bluebird');

/**
 * Execute INSERT statement and return last inserted id.
 *
 * @link https://github.com/TryGhost/node-sqlite3/wiki/API#runsql--param---callback
 */
async function sqlite_run_insert(db, sql, params = [])
{
    return new Promise(function (resolve, reject) {
        db.run(sql, params, function (error) {
            error ? reject(error) : resolve(this.lastID);
        });
    });
}

module.exports = sqlite_run_insert;
