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
