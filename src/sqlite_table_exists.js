const sqlite_one = require('./sqlite_one');

/**
 * Check for the existence of a table.
 *
 * @link https://sqlite.org/faq.html#q7
 */
async function sqlite_table_exists(db, table)
{
    return !!(await sqlite_one(db, 'SELECT 1 FROM sqlite_master WHERE type = ? AND name = ?', ['table', table]));
}

module.exports = sqlite_table_exists;
