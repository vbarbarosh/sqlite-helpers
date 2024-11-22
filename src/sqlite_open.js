const Promise = require('bluebird');
const sqlite3 = require('sqlite3');

/**
 * Opens a database.
 *
 * @link https://github.com/TryGhost/node-sqlite3/wiki/API#new-sqlite3databasefilename--mode--callback
 */
async function sqlite_open(file)
{
    return new Promise(function (resolve, reject) {
        const out = new sqlite3.Database(file, function (error) {
            error ? reject(error) : resolve(out);
        });
    });
}

module.exports = sqlite_open;
