---
title: Customize
synopsis: Customizing documentation templates
date: 2024-03-10
author: CometDocs Team
position: 3
---

## Customizing Documentation

The templates directory contains example templates you can use as a starting point for your documentation. Follow the [Style Guide](/docs/templates/style-guide) for consistent formatting across your documentation.

## Template Basics

Templates in CometDocs are Markdown files with special variables and sections that get replaced with content when used. They help maintain consistency across your documentation.

## Template Location

Custom templates should be placed in your docs templates directory:

```
docs/
├── templates/
│   ├── guide.md      # Custom guide template
│   ├── reference.md  # Custom reference template
│   └── concept.md    # Custom concept template
└── en/
    └── guides/
        └── your-guide.md
```

## Template Variables

Templates support these variables that get replaced with actual content:

```md
---
title: {{title}}
description: {{description}}
author: {{author}}
date: {{date}}
version: {{version}}
---

# {{title}}

{{description}}

_Last updated: {{date}} by {{author}}_
```

Available variables:
- `{{title}}`: Page title from frontmatter
- `{{description}}`: Page description
- `{{author}}`: Content author
- `{{date}}`: Last updated date
- `{{version}}`: Documentation version

## Customizing Existing Templates

### 1. Copy the Default Template

First, copy the default template you want to customize:

```bash
mkdir -p docs/templates
cp node_modules/cometdocs/templates/guide.md docs/templates/
```

### 2. Modify the Template

Edit the template to match your needs:

```md
---
title: {{title}}
description: {{description}}
author: {{author}}
date: {{date}}
template: guide
---

# {{title}}

{{description}}

## Overview
[Overview content goes here]

## Prerequisites
- Required item 1
- Required item 2

## Step-by-Step Guide

### 1. First Step
[Step details]

### 2. Second Step
[Step details]

## Troubleshooting

### Common Issues
[List common issues and solutions]

### Getting Help
[Help resources]

## Next Steps
[What to do next]

---
_Last updated: {{date}} by {{author}}_
```

## Creating Custom Templates

### 1. Create a New Template File

Create a new template file in your templates directory:

```md
---
title: {{title}}
description: {{description}}
author: {{author}}
date: {{date}}
template: custom
---

# {{title}}

{{description}}

[Your custom template structure]
```

### 2. Register the Template

Add the template to your CometDocs configuration:

```js
// cometdocs.config.js
module.exports = {
  templates: {
    custom: {
      name: 'Custom Template',
      description: 'A custom template for specific documentation needs',
    },
  },
};
```

## Template Sections

Templates can include special sections that get processed differently:

### Required Sections
```md
:::required
This section must be filled out
:::
```

### Optional Sections
```md
:::optional
This section is optional
:::
```

### Conditional Sections
```md
:::if version
Content only shown if version is specified
:::
```

## Template Best Practices

1. **Consistency**
   - Keep similar sections across templates
   - Use consistent naming conventions
   - Maintain consistent formatting

2. **Flexibility**
   - Make templates flexible enough for various content
   - Use optional sections for non-essential content
   - Allow for content expansion

3. **Maintenance**
   - Document template customizations
   - Version control your templates
   - Review and update regularly

## Examples

### API Reference Template
```md
---
title: {{title}}
template: api-reference
---

# {{title}}

## Overview
[Brief description]

## Authentication
:::required
Authentication requirements
:::

## Endpoints

### `{{method}} {{endpoint}}`
:::required
Endpoint description
:::

#### Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| param | type | yes/no | description |

#### Response
```json
{
  "example": "response"
}
```
:::
```

### Tutorial Template
```md
---
title: {{title}}
template: tutorial
---

# {{title}}

## Goal
:::required
What you'll learn
:::

## Prerequisites
:::required
- Required knowledge
- Required tools
:::

## Steps

:::required
### 1. First Step
Step details

### 2. Second Step
Step details
:::

## Complete Example
:::optional
Full working example
:::
```

## Next Steps

- [Style Guide](/docs/templates/style-guide) - Learn about Markdown formatting
- [Writing Guide](/docs/guides/writing) - Best practices for documentation
- [Templates Overview](/docs/templates/overview) - Learn about available templates