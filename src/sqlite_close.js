const Promise = require('bluebird');

/**
 * Closes the database
 *
 * @link https://github.com/TryGhost/node-sqlite3/wiki/API#closecallback
 */
async function sqlite_close(db)
{
    await new Promise(function (resolve, reject) {
        db.close(error => error ? reject(error) : resolve());
    });
}

module.exports = sqlite_close;
