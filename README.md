# טל בן שבע - Actress Portfolio Website

A modern, responsive Next.js portfolio website for Tal Ben Sheva, a professional actress, singer, and dancer. Built with cutting-edge web technologies and featuring smooth animations, interactive galleries, and a mobile-first design approach.

## 🌟 Features

### Core Features
- **Modern React Architecture**: Built with Next.js 13+ using the app/ directory structure
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first approach with Hebrew RTL support
- **Performance Optimized**: Image optimization, lazy loading, and code splitting
- **SEO Friendly**: Meta tags, structured data, and optimized for search engines

### Interactive Elements
- **Framer Motion Animations**: Smooth scroll-triggered animations throughout the site
- **GSAP 3D Carousel**: Interactive 3D gallery with mouse-controlled rotation
- **Portfolio Tabs**: Dynamic content switching with smooth transitions
- **Video Showcase**: Embedded video player for showreel content
- **Contact Form**: Functional contact form with validation

### Design & UX
- **Hebrew RTL Support**: Full right-to-left text support for Hebrew content
- **Modern UI/UX**: Clean, professional design with attention to detail
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Graceful error handling with user-friendly messages

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 13+**: React framework with App Router
- **TypeScript**: Type-safe JavaScript development
- **React 18**: Latest React features and hooks

### Styling & Animation
- **Custom CSS**: Tailored styling with CSS Grid and Flexbox
- **Framer Motion**: Production-ready motion library
- **GSAP**: Professional-grade animations for complex interactions
- **Google Fonts**: Heebo and Assistant fonts for typography

### Development Tools
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **Vercel**: Deployment and hosting platform

## 📁 Project Structure

```
actress-portfolio-nextjs/
├── public/
│   ├── pictures/          # Portfolio images
│   ├── videos/           # Video content
│   └── icons/            # SVG icons and assets
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout with metadata
│   │   ├── page.tsx      # Homepage component
│   │   ├── globals.css   # Global styles
│   │   └── favicon.ico   # Site favicon
│   └── components/
│       ├── Navigation.tsx    # Navigation with mobile menu
│       ├── Hero.tsx          # Hero section with animations
│       ├── QuickAccess.tsx   # Quick access navigation bar
│       ├── Showreel.tsx      # Video showcase section
│       ├── Portfolio.tsx     # Portfolio with category tabs
│       ├── Gallery.tsx       # 3D carousel gallery
│       ├── About.tsx         # About section
│       ├── Contact.tsx       # Contact form
│       └── Footer.tsx        # Footer with social links
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**: Required for Next.js development
- **npm or yarn**: Package manager
- **Git**: Version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mai-ben7/actress-portfolio.git
   cd actress-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Contact Information
   NEXT_PUBLIC_CONTACT_EMAIL=Talbensheva@gmail.com
   
   # Social Media Links
   NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/talbensheva
   NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@talbensheva
   NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@talbensheva
   
   # Optional: Google API Key (for future features)
   NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Key Components

### 1. Hero Section (`Hero.tsx`)
- Animated text reveals with Framer Motion
- Call-to-action buttons
- Background video/image support
- Responsive design for all devices

### 2. 3D Carousel Gallery (`Gallery.tsx`)
- GSAP-powered 3D carousel
- Mouse-controlled rotation
- Touch support for mobile devices
- Smooth image transitions
- Responsive grid layout

### 3. Portfolio Section (`Portfolio.tsx`)
- Category-based filtering (Acting, Singing, Dancing)
- Dynamic content switching
- Image and video support
- Smooth tab transitions
- Responsive grid layout

### 4. Contact Form (`Contact.tsx`)
- Form validation with TypeScript
- Email integration via mailto
- Loading states and error handling
- Success/error feedback
- Social media links

### 5. Navigation (`Navigation.tsx`)
- Mobile-responsive hamburger menu
- Smooth scroll navigation
- Active link highlighting
- RTL support for Hebrew

## 🌐 Environment Variables

### Development
Create a `.env.local` file in the root directory:

```env
# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=Talbensheva@gmail.com

# Social Media Links
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/talbensheva
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@talbensheva
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@talbensheva

# Optional: Google API Key (for future features)
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
```

### Production (Vercel)
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the same variables as above
4. Redeploy your application

## 📱 Responsive Design

The website is built with a mobile-first approach and supports:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### RTL Support
- Full Hebrew right-to-left text support
- Proper text alignment and layout
- RTL-aware animations and interactions

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Link your GitHub repository to Vercel
   - Vercel will automatically detect Next.js

2. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Ensure all `NEXT_PUBLIC_` variables are set

3. **Deploy**
   - Automatic deployment on push to main branch
   - Preview deployments for pull requests

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Static site generation
- **Railway**: Full-stack deployment
- **DigitalOcean App Platform**: Managed hosting
- **AWS Amplify**: AWS integration

## 🎯 Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Automatic code splitting by Next.js
- **Font Optimization**: Google Fonts with display swap
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

## 🔧 Customization

### Colors and Styling
Edit `src/app/globals.css` to customize:
- Color scheme and variables
- Typography and fonts
- Spacing and layout
- Animation timings

### Content Updates
Update the following files to change content:
- `src/components/Hero.tsx` - Hero section content
- `src/components/Portfolio.tsx` - Portfolio items and categories
- `src/components/About.tsx` - About section content
- `src/components/Contact.tsx` - Contact information

### Media Management
- **Images**: Place in `public/pictures/` directory
- **Videos**: Place in `public/videos/` directory
- **Icons**: Place in `public/` directory
- Update image/video paths in components as needed

## 🧪 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types
```

## 🌍 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions, support, or collaboration opportunities:

- **Email**: Talbensheva@gmail.com
- **Instagram**: [@talbensheva](https://instagram.com/talbensheva)
- **TikTok**: [@talbensheva](https://www.tiktok.com/@talbensheva)
- **YouTube**: [@talbensheva](https://www.youtube.com/@talbensheva)

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Framer Motion**: For smooth animations
- **GSAP**: For professional-grade animations
- **Google Fonts**: For beautiful typography
- **Vercel**: For seamless deployment

---

**Note**: This portfolio website is designed specifically for Tal Ben Sheva, a professional actress. All content, images, and videos are property of Tal Ben Sheva unless otherwise noted. The website showcases her work in acting, singing, and dancing with a modern, professional presentation.
