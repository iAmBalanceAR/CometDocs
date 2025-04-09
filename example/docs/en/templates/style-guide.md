---
title: Markdown Style Guide
synopsis: Learn how to format your documentation using Markdown in CometDocs
date: 2024-03-10
author: CometDocs Team
position: 2
---

This guide covers all the Markdown elements supported in CometDocs and how to use them effectively in your documentation.

## Frontmatter

Every documentation page should start with frontmatter:

```yaml
---
title: Page Title
synopsis: A brief description of the page
date: 2024-03-10
author: Your Name
position: 1
---
```

Required fields:
- `title`: Page title (appears in navigation and browser tab)
- `position`: Determines the order in navigation (lower numbers appear first)

Optional fields:
- `synopsis`: Brief description (used in search results and SEO)
- `date`: Last updated date
- `author`: Content author

## Basic Text Formatting

```md
**Bold text**
*Italic text*
~~Strikethrough~~
`Inline code`
```

Renders as:
**Bold text**
*Italic text*
~~Strikethrough~~
`Inline code`

## Headers

```md
# H1 - Main Title
## H2 - Section
### H3 - Subsection
#### H4 - Sub-subsection
```

Best practices:
- Use only one H1 per page
- Start with H2 for main sections
- Maintain hierarchical order (don't skip levels)

## Links

```md
[Internal link](/docs/guides/installation)
[External link](https://example.com)
[Section link](#section-id)
```

## Lists

Unordered lists:
```md
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

Ordered lists:
```md
1. First step
2. Second step
   1. Sub-step
   2. Another sub-step
3. Third step
```

Task lists:
```md
- [x] Completed task
- [ ] Pending task
```

## Code Blocks

Inline code: \`const example = true\`

Fenced code blocks with language:

````md
```typescript
function greeting(name: string): string {
  return `Hello, ${name}!`;
}
```
````

Supported languages:
- typescript/tsx
- javascript/jsx
- html
- css
- json
- yaml
- bash/shell
- markdown

## Tables

```md
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Blockquotes

```md
> Important note or quote
> Multiple lines
>> Nested quote
```

## Horizontal Rules

```md
---
```

## Images

```md
![Alt text](/path/to/image.png)
![Alt text](/path/to/image.png "Optional title")
```

Best practices:
- Always provide descriptive alt text
- Use relative paths for internal images
- Optimize images before adding them

## Callouts

CometDocs supports special callout blocks:

```md
:::note
Important information
:::

:::warning
Warning message
:::

:::tip
Helpful tip
:::

:::danger
Critical warning
:::
```

## Code Groups

For showing multiple code examples:

````md
:::code-group

```bash[npm]
npm install package-name
```

```bash[yarn]
yarn add package-name
```

```bash[pnpm]
pnpm add package-name
```

:::
````

## Tables of Contents

Add a table of contents to your page:

```md
[[toc]]
```

## Best Practices

1. **Structure**
   - Use clear hierarchical structure
   - Keep sections focused and concise
   - Use descriptive headers

2. **Formatting**
   - Use consistent formatting
   - Break long paragraphs into smaller chunks
   - Use lists for steps or related items

3. **Code Examples**
   - Always specify the language
   - Keep examples simple and focused
   - Include comments for complex code

4. **Links**
   - Use descriptive link text
   - Check links regularly
   - Prefer relative paths for internal links

## Next Steps

- [Templates Overview](/docs/templates/overview) - Learn about documentation templates
- [Template Customization](/docs/templates/customize) - Customize templates
- [Writing Guide](/docs/guides/writing) - Best practices for documentation 