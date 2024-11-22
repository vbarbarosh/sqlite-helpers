/**
 * @link https://www.sqlite.org/lang_expr.html#glob
 * @link https://stackoverflow.com/a/24281125
 */
function sqlite_escape_glob(s)
{
    return s.replace(/([*?\[\]])/g, function (s) {
        switch (s) {
        case '[': return '[[]';
        case ']': return '[]]';
        case '*': return '[*]';
        case '?': return '[?]';
        default:
            throw new Error(`Invalid character: ${s}`);
        }
    });
}

module.exports = sqlite_escape_glob;
