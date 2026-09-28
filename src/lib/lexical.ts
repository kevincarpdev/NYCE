type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
}

export const toLexical = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        {
          type: 'text',
          text,
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          version: 1,
        },
      ],
    })),
  },
})

export const lexicalToPlain = (value: unknown): string => {
  if (!value || typeof value !== 'object') return ''
  const root = (value as { root?: LexicalNode }).root
  if (!root) return ''
  const walk = (node: LexicalNode): string[] => {
    if (node.text) return [node.text]
    if (!node.children) return []
    const inner = node.children.flatMap(walk)
    if (node.type === 'paragraph' || node.type === 'heading') return [inner.join('')]
    return inner
  }
  return walk(root).filter(Boolean).join('\n\n')
}

export const lexicalParagraphs = (value: unknown): string[] =>
  lexicalToPlain(value)
    .split('\n\n')
    .map((part) => part.trim())
    .filter(Boolean)
