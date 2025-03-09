# CometDocs Navigation System

CometDocs automatically generates navigation based on your documentation file structure. This README explains how to organize your documentation and customize the navigation.

## File Structure

The navigation is built from the file structure in your `docs` directory. Here's an example structure:

```
docs/
  en/                       # Locale directory
    getting-started.md      # Top-level document
    index.md                # Overview document for the root
    guides/                 # Section directory
      section.json          # Section metadata
      installation.md       # Document in the section
      configuration.md      # Document in the section
    api/                    # Another section
      section.json          # Section metadata
      endpoints.md          # Document in the section
      authentication.md     # Document in the section
```

## Section Configuration

Each directory can have a `section.json` file that defines metadata for that section:

```json
{
  "title": "User Guides",
  "position": 2,
  "collapsed": false
}
```

- `title`: The display name for the section in the navigation
- `position`: The order in which the section appears (lower numbers appear first)
- `collapsed`: Whether the section should be collapsed by default

## Document Frontmatter

Each Markdown document can include frontmatter to customize how it appears in the navigation:

```md
---
title: Getting Started
position: 1
---

# Getting Started

Content goes here...
```

- `title`: The display name for the document in the navigation
- `position`: The order in which the document appears within its section (lower numbers appear first)

## Special Files

- `index.md`: If a directory contains an `index.md` file, it will be used as the landing page for that section and will appear at the top of the section's navigation.

## Ordering

Items in the navigation are ordered by:

1. Position (if specified)
2. Alphabetically by title (if position is not specified)

## Example

With the file structure above and proper configuration, the navigation would look like:

- Getting Started
- User Guides
  - Installation
  - Configuration
- API Reference (collapsed)
  - Endpoints
  - Authentication 