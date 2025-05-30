# Doc to Code Converter

A React SPA for rich text editing with live HTML and Markdown preview.

## Features

- Rich text editing: font size, color, font family, bold, italics, underline, alignment, image, table, lists
- Split-screen live HTML/Markdown preview
- Download as HTML or Markdown
- Semantic HTML output
- Dark mode toggle

## Deployment

### Vercel (Recommended)

This project is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Visit [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Vercel will automatically detect it's a Create React App and configure the build settings
5. Click "Deploy" - your app will be live in minutes!

### Alternative: Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your local machine
vercel --prod
```

### GitHub Pages

```bash
# Build for GitHub Pages
npm run build:github

# Deploy to GitHub Pages
npm run deploy
```

### Local Development

```bash
# Start development server
npm start

# Build for local testing
npm run build:local
```

## Usage

- Format text and insert elements using the toolbar
- View live HTML/Markdown in the preview pane
- Download your work using the download buttons
- Toggle dark mode with the button in the header

## Testing

- Component tests included (see `src/App.test.js`)
- Note: Draft.js input simulation is limited in automated tests due to jsdom/contenteditable constraints

## Getting Started

```sh
npm install
npm start
```

---
