const Promise = require('bluebird');

/**
 * Runs the SQL query with the specified parameters
 *
 * @link https://github.com/TryGhost/node-sqlite3/wiki/API#runsql--param---callback
 */
async function sqlite_run(db, sql, params = [])
{
    return new Promise(function (resolve, reject) {
        db.run(sql, params, function (error) {
            error ? reject(error) : resolve();
        });
    });
}

module.exports = sqlite_run;
