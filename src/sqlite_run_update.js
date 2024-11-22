const Promise = require('bluebird');

/**
 * Execute UPDATE statement and return the number of changed rows.
 *
 * @link https://github.com/TryGhost/node-sqlite3/wiki/API#runsql--param---callback
 */
async function sqlite_run_update(db, sql, params = [])
{
    return new Promise(function (resolve, reject) {
        db.run(sql, params, function (error) {
            error ? reject(error) : resolve(this.changes);
        });
    });
}

module.exports = sqlite_run_update;
