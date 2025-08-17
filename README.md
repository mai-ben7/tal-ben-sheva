# טל בן שבע - Portfolio Website

A modern Next.js 13+ portfolio website for Tal Ben Sheva, a professional actress, singer, and dancer.

## Features

- **Modern React Architecture**: Built with Next.js 13+ using the app/ directory structure
- **TypeScript**: Full type safety throughout the application
- **Framer Motion**: Smooth scroll-triggered animations
- **GSAP Integration**: 3D carousel gallery with mouse interaction
- **Responsive Design**: Mobile-first approach with Hebrew RTL support
- **Environment Variables**: Secure configuration management
- **Performance Optimized**: Image optimization and lazy loading

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Custom CSS with responsive design
- **Animations**: Framer Motion + GSAP
- **Fonts**: Google Fonts (Heebo, Assistant)
- **Icons**: Font Awesome 6

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd actress-portfolio-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # API Keys
   NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
   
   # Contact Information
   NEXT_PUBLIC_CONTACT_EMAIL=tal942899@gmail.com
   NEXT_PUBLIC_PHONE_NUMBER=0527533711
   
   # Social Media Links
   NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/talbensheva
   NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@talbensheva
   NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@talbensheva
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage component
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Navigation with mobile menu
│   ├── Hero.tsx           # Hero section with animations
│   ├── QuickAccess.tsx    # Quick access bar
│   ├── Showreel.tsx       # Video showcase section
│   ├── Portfolio.tsx      # Portfolio with tabs
│   ├── Gallery.tsx        # 3D carousel gallery
│   ├── About.tsx          # About section
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer with social links
└── types/                 # TypeScript type definitions
```

## Environment Variables

### Development
Create a `.env.local` file in the root directory with the following variables:

```env
# API Keys (if needed for future features)
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=tal942899@gmail.com
NEXT_PUBLIC_PHONE_NUMBER=0527533711

# Social Media Links
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/talbensheva
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@talbensheva
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@talbensheva
```

### Production (Vercel)

1. **Vercel Dashboard**: Go to your project settings
2. **Environment Variables**: Add the same variables as above
3. **Deploy**: The variables will be available in production

## Key Features

### 1. 3D Carousel Gallery
- Interactive 3D carousel using GSAP
- Mouse-controlled rotation
- Responsive design for all devices
- Smooth animations and transitions

### 2. Scroll-Triggered Animations
- Framer Motion for smooth animations
- Intersection Observer for scroll detection
- Staggered animations for visual appeal

### 3. Contact Form
- Form validation with TypeScript
- Email integration via mailto
- Loading states and error handling
- Success/error feedback

### 4. Portfolio Tabs
- Dynamic content switching
- Smooth transitions between categories
- Responsive grid layout
- Video and image support

### 5. Mobile-First Design
- Hebrew RTL support
- Responsive navigation
- Touch-friendly interactions
- Optimized for all screen sizes

## Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add all environment variables in Vercel dashboard
3. **Deploy**: Automatic deployment on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Customization

### Colors and Styling
Edit `src/app/globals.css` to customize:
- Color scheme
- Typography
- Spacing and layout
- Animations

### Content
Update the following files to change content:
- `src/components/Hero.tsx` - Hero section content
- `src/components/Portfolio.tsx` - Portfolio items
- `src/components/About.tsx` - About section
- `src/components/Contact.tsx` - Contact information

### Images and Media
- Place images in `public/pictures/`
- Place videos in `public/videos/`
- Update image paths in components

## Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Automatic code splitting by Next.js
- **Font Optimization**: Google Fonts with display swap
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact:
- Email: tal942899@gmail.com
- Phone: 0527533711

---

**Note**: This is a portfolio website for Tal Ben Sheva, a professional actress. All content and images are property of Tal Ben Sheva unless otherwise noted.
