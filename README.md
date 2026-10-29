# Paul & Hella Wedding Website

An elegant, responsive wedding invitation website built with React, Vite, and Tailwind CSS.

## Features

- ✨ Hero section with live countdown timer
- 💕 Romantic love story timeline
- 📅 Interactive wedding calendar
- 🖼️ Beautiful photo gallery
- 📋 Wedding schedule
- 💌 RSVP form
- 💬 Guest messages section
- 📱 Fully responsive design
- 🎨 Elegant typography with Great Vibes and Cormorant Garamond fonts

## Tech Stack

- React 18.3.1
- Vite 6.3.5
- Tailwind CSS 4.1.12
- Lucide React (icons)
- Motion (animations)

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone this repository:
```bash
git clone https://github.com/GedionAfework/wedding-invitation-template.git
cd wedding-invitation-template
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Customization

### Update Wedding Details

Edit `src/app/App.tsx` to customize:
- Couple names (line 64-65)
- Wedding date (line 13, 67)
- Venue name (line 68)
- Love story timeline (lines 141-201)
- Wedding schedule (lines 355-397)
- Guest messages (lines 447-465)

### Change Colors

The primary gold color `#D4AF37` can be replaced throughout the file. Search and replace with your preferred color.

### Update Photos

Replace Unsplash URLs with your own wedding photos. Upload your images to a CDN or use them from the `public` folder.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Add new site from Git
4. Deploy!

### Build for Production

```bash
pnpm build
# or
npm run build
```

The built files will be in the `dist` folder.

## Adding Backend (Optional)

Currently this is a frontend-only website. To add backend functionality for RSVP responses and guest messages:

1. Set up a Supabase project
2. Create tables for `rsvps` and `messages`
3. Add Supabase client to the project
4. Connect forms to database

## License

MIT License - Feel free to use this template for your own wedding!

## Credits

Built with ❤️ using Claude Code and Figma Make

---

**Wedding Date:** May 2, 2026  
**Location:** Bethel Full Gospel Church, Addis Ababa, Ethiopia
