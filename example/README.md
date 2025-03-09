# CometDocs Example

This is an example of how to use CometDocs in a Next.js project.

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2 Run the development server:

```bash
pnpm dev
```

   Open [http://localhost:3000/docs/getting-started](http://localhost:3000/docs/getting-started) in your browser to see the result.

## Project Structure

- `app/docs/[[...slug]]/page.tsx`: The main page that uses the CometDocs component
- `docs/`: The directory containing the documentation files
  - `en/`: English documentation
    - `getting-started.md`: Getting started guide
    - `guides/`: Guides directory
      - `installation.md`: Installation guide
      - `configuration.md`: Configuration guide

## Learn More

To learn more about CometDocs, check out the [CometDocs documentation](https://github.com/cometdocs/cometdocs).
