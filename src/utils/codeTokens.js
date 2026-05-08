const tokenPattern =
  /(\/\/.*$|\/\*[\s\S]*?\*\/|`(?:\\.|[^`])*`|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\b(?:async|await|const|let|var|return|export|default|function|import|from|if|else|new|true|false|null)\b|\b[A-Z][A-Za-z0-9_]*(?=\b)|\b(?:className|children|params|formData|title|description|openGraph|images|action|type|name|key|plugins|base|command)\b)/gm;

export function tokenizeCode(code) {
  const tokens = [];
  let cursor = 0;

  code.replace(tokenPattern, (value, _match, offset) => {
    if (offset > cursor) {
      tokens.push({ value: code.slice(cursor, offset), className: '' });
    }

    tokens.push({ value, className: getTokenClass(value) });
    cursor = offset + value.length;
    return value;
  });

  if (cursor < code.length) {
    tokens.push({ value: code.slice(cursor), className: '' });
  }

  return tokens;
}

function getTokenClass(token) {
  if (token.startsWith('//') || token.startsWith('/*')) return 'code-comment';
  if (token.startsWith('`') || token.startsWith('"') || token.startsWith("'")) {
    return 'code-string';
  }
  if (
    /^(async|await|const|let|var|return|export|default|function|import|from|if|else|new|true|false|null)$/.test(
      token,
    )
  ) {
    return 'code-keyword';
  }
  if (/^[A-Z]/.test(token)) return 'code-component';
  return 'code-prop';
}
