function extractTextFromBlocks(blocks) {
  if (!blocks) {
    return ''
  }
  return blocks
    .map((block) => {
      return block.children
        .filter((child) => child._type === 'span')
        .map((span) => span.text)
        .join('')
    })
    .join('')
}

export default {
  name: 'simpleBlock',
  title: 'Simple block',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {type: 'object', name: 'link', fields: [{type: 'string', name: 'url'}]},
              {type: 'object', name: 'test', fields: [{type: 'string', name: 'mystring'}]},
            ],
          },
          of: [
            {type: 'image', name: 'image'},
            {
              type: 'object',
              name: 'test',
              fields: [{type: 'string', name: 'mystring', validation: (Rule) => Rule.required()}],
            },
            {
              type: 'reference',
              name: 'strongAuthorRef',
              title: 'A strong author ref',
              to: {type: 'author'},
            },
          ],
          validation: (Rule) =>
            Rule.custom((block) => {
              const text = extractTextFromBlocks([block])
              return text.length === 1 ? 'Please write a longer paragraph.' : true
            }),
        },
        {type: 'image', name: 'image'},
        {
          type: 'object',
          name: 'test',
          fields: [{type: 'string', name: 'mystring', validation: (Rule) => Rule.required()}],
        },
      ],
    },
    {
      name: 'notes',
      type: 'array',
      of: [
        {
          type: 'simpleBlockNote',
        },
      ],
    },
  ],
}
