const Promise = require('bluebird');

async function sqlite_one(db, sql, params = [])
{
    return new Promise(function (resolve, reject) {
        db.get(sql, params, function (error, out) {
            error ? reject(error) : resolve(out);
        });
    });
}

module.exports = sqlite_one;
