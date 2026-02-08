# OurAuto - Premium B2B Car Dealer Network

A luxury, mobile-first home page for a premier B2B car dealer marketplace built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## 🎯 Project Features

### ✅ Completed

- **Premium, Modern Design**
  - Glassmorphism header with backdrop blur
  - Smooth hover animations on car cards
  - Luxury typography and spacing
  - Dark & light mode with localStorage persistence

- **Responsive Layout**
  - Mobile-first design (1 column on mobile)
  - 2 columns on tablets
  - 3-4 columns on desktop
  - Fully touch-optimized for mobile

- **Smart Header**
  - Sticky positioning with shadow on scroll
  - Logo (always links to home)
  - Create Account CTA button
  - Sign In link
  - Theme toggle (Moon/Sun icons)

- **Car Listing Feed**
  - Location detection (geolocation with fallback)
  - Shows nearest city's cars first
  - Beautiful car cards with:
    - Large rounded images
    - Brand + Model + Year
    - Fuel type icon (⛽ 🛢️ 🔋⚡)
    - Transmission type icon (🎛️ ⚙️)
    - Location badge
    - View Details CTA button

- **User Flow**
  - Redirect to login if clicking Details while not logged in
  - Skeleton loaders while fetching data
  - Elegant empty state
  - Car detail pages (placeholder)

- **Auth Pages**
  - Sign up page (placeholder)
  - Sign in page (placeholder)
  - Consistent design with main app

## 🛠️ Tech Stack

```
Next.js 14 (App Router) - Framework
TypeScript - Type safety
Tailwind CSS - Styling
Lucide React - Icons
React 19 - UI library
```

## 📁 Project Structure

```
/app
├── layout.tsx              # Root layout with theme provider & header
├── page.tsx                # Home page
├── providers.tsx           # Theme provider (light/dark mode)
├── globals.css             # Global styles
│
├── /components
│   ├── header.tsx          # Sticky header with nav
│   ├── car-card.tsx        # Individual car listing card
│   ├── car-listing.tsx     # Car grid with location detection
│   └── icons.tsx           # Fuel & transmission icons
│
├── /lib
│   └── cars.ts             # Mock data, types, utilities
│
├── /auth
│   ├── /signup
│   │   └── page.tsx        # Sign up page
│   └── /login
│       └── page.tsx        # Sign in page
│
└── /cars
    └── /[id]
        └── page.tsx        # Car detail page
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

## 🎨 Design Highlights

### Dark Mode
- Implemented with React Context
- Persists user preference in localStorage
- Elegant dark theme (true black background)
- Custom scrollbar styling

### Premium Styling
- Soft shadows only appear on hover/scroll (subtle)
- Rounded corners on all interactive elements
- Smooth transitions (300ms easing)
- Clean spacing and typography
- No cluttered UI elements

### Mobile Optimization
- Thumb-friendly button sizes (min 44px)
- Touch-optimized spacing
- Fast scroll performance
- Optimized image loading
- Clean navigation on small screens

## 🌍 Data & Location

### Mock Cars (8 luxury vehicles)
- Tesla Model S (Mumbai)
- BMW 5 Series (Delhi)
- Mercedes-Benz C-Class (Bangalore)
- Audi A4 (Hyderabad)
- Porsche 911 (Mumbai)
- Jaguar XE (Chennai)
- Lexus ES (Pune)
- Range Rover Evoque (Kolkata)

### Geolocation Feature
- Automatically detects user's city
- Shows cars from nearest city first
- Graceful fallback if permission denied
- Loads all cars if geolocation unavailable

## 📋 Notes for Development

### DO NOT IMPLEMENTED (As Per Spec)
- ❌ Admin UI
- ❌ Chat functionality
- ❌ WhatsApp integration
- ❌ Price display
- ❌ Dealer contact details
- ❌ Filters/Search
- ❌ Pagination (infinite scroll ready)

### Future Enhancements
- Real API integration
- Actual geolocation based on IP
- User authentication
- Infinite scroll pagination
- Advanced filters
- Dealer ratings and reviews
- Message system for dealers

## 🔐 Authentication Notes

Currently using localStorage for demo:
```javascript
// Check login status
const isLoggedIn = localStorage.getItem('isLoggedIn');

// Set after successful login (in real implementation)
localStorage.setItem('isLoggedIn', 'true');
```

For production, replace with proper auth (NextAuth.js, Supabase, etc.)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column grid)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns)

## ✨ Code Quality

- Full TypeScript support
- ESLint configured
- Clean, reusable components
- Semantic HTML
- Accessible (WCAG compliant)
- Production-ready code structure

## 📄 License

Private project for OurAuto

---

**Status**: ✅ MVP Complete and Running on http://localhost:3000
