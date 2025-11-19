# React Aria and the Fullscreen API

A Next.js application featuring React Aria components and demonstrating an issue with the Fullscreen API. See [discussion 9206](https://github.com/adobe/react-spectrum/discussions/9206).


## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Requirements

- The user needs to be able to turn the `<main>` element to fullscreen with the dedicated button (top right)
- He also can play a video and switch it to fullscreen
- There is also a **modal dialog** that needs to show a video… which in turn can be switched to fullscreen

It is understood that the fullscreen API does not necessarily support a "stack" of fullscreen… it's not the purpose here, although it would be great:

  1. `<main>` goes fullscreen
  2. user opens dialog
  3. he plays the video
  4. turns the video to fullscreen
  5. once he's done with the video he is again with the main in fullscreen (step 3).

## Issue

You can play with `ENABLE_PORTAL_PROVIDER` in `page.tsx` (switch on or off) to observe the issues.
  - with `true` => the dialog opens when 'main' is fullscreen
  - with `false` => the video in the dialog can turn fullscreen

But you cannot have both with this pattern alone.


## Project Structure

```
.
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Home page with React Aria examples
│   └── globals.css     # Global styles with Tailwind
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Aria Components](https://react-spectrum.adobe.com/react-aria-components/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
