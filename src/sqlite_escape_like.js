/**
 * @link https://github.com/TryGhost/node-sqlite3/issues/227
 */
function sqlite_escape_like(s)
{
    return s;
}

module.exports = sqlite_escape_like;
