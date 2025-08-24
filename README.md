# cosmetics.info

**Professional cosmetics manufacturing website for ООО "Демидов Люкс СПА"**

A modern, responsive single-page website for a Russian cosmetics manufacturing company that creates custom beauty products and brands for clients. The site showcases the company's capabilities, production process, and includes a comprehensive product brief form.

## 🚀 Tech Stack & Dependencies

### Core Framework
- **Next.js 15.3.4** - React-based full-stack framework with Turbopack
- **React 19.0.0** - Latest React with new features and performance improvements  
- **TypeScript 5** - Type-safe development environment

### Styling & UI
- **Tailwind CSS 4.0** - Utility-first CSS framework (beta version)
- **DaisyUI 5.0.43** - Tailwind-based component library with custom theme
- **Clampwind 0.0.9** - Fluid typography and spacing utilities
- **Custom color palette** - Professional cosmetics brand colors

### Forms & Validation
- **React Hook Form 7.62.0** - Performant form library with validation
- **Zod 4.0.14** - TypeScript-first schema validation
- **@hookform/resolvers 5.2.1** - Form validation resolver integration

### Media & Icons
- **Next-video 2.2.1** - Optimized video component with custom player
- **Player.style 0.1.9** - Video player theming (Demuxed 2022 theme)
- **Heroicons React 2.2.0** - Beautiful SVG icon library

### Development Tools
- **Turbopack** - Next-gen bundler for faster development
- **PostCSS** - CSS processing and optimization
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
cosmetics.info/
├── app/                          # Next.js App Router structure
│   ├── components/               # Reusable React components
│   │   ├── form.tsx             # Main product brief form component
│   │   └── header.tsx           # Site navigation header
│   ├── globals.css              # Global styles and design system
│   ├── layout.tsx               # Root layout with font configuration
│   ├── page.tsx                 # Home page with all sections
│   └── favicon.ico              # Site favicon
├── public/                       # Static assets
│   ├── images/                  # Product and process images
│   │   ├── consult.jpeg         # Consultation process image
│   │   ├── contract.jpeg        # Contract signing image
│   │   ├── logo.png            # Company logo
│   │   ├── production.jpeg      # Production facility image
│   │   ├── test.jpeg           # Testing process image
│   │   └── we.jpeg             # Team/company image
│   └── video/
│       └── video.mp4           # Hero section promotional video
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── video.d.ts                  # Video file type declarations
```

### Naming Conventions
- **Components**: PascalCase (e.g., `Header`, `Form`)
- **Files**: kebab-case for assets, camelCase for config (e.g., `next.config.ts`)
- **Images**: descriptive lowercase (e.g., `consult.jpeg`, `production.jpeg`)
- **CSS Classes**: Tailwind utilities with BEM-style custom classes where needed
- **Form Fields**: camelCase following React Hook Form conventions

## ✨ Core Features & Implementation Status

### ✅ Completed Features

#### 1. **Responsive Landing Page**
- Hero section with promotional video player
- Company capabilities showcase
- 4-step production process workflow
- Competitive advantages grid
- Company background and history
- FAQ section with expandable answers
- Contact information and social links

#### 2. **Advanced Contact Form**
- Multi-step product brief form with validation
- Dynamic product addition/removal
- Collapsible form sections for better UX
- Client information capture (name, email, phone, company)
- Detailed product specifications including:
  - Brand and collection information
  - Marketing claims and properties
  - Packaging requirements and analogues
  - Design specifications and ideas
  - Texture descriptions and components
  - Production volumes and target costs

#### 3. **Professional UI/UX**
- Fluid typography using `clamp()` functions
- Custom DaisyUI theme with cosmetics brand colors
- Smooth scroll navigation
- Interactive hover effects and transitions
- Loading states and form validation feedback
- Mobile-first responsive design

#### 4. **Performance Optimization**
- Next.js 15 with Turbopack for fast development
- Optimized image loading with lazy loading
- Modern video player with custom styling
- TypeScript for better developer experience

### 🚧 In Progress / Planned Features

#### Form Backend Integration
- Form submission API endpoint (`/api/submit-brief`)
- Email integration for form submissions  
- Form data validation on server side
- Success/error handling improvements

## 🎨 Design Guidelines

### Color Palette
The custom DaisyUI theme uses a professional cosmetics-inspired color scheme:

- **Primary**: `oklch(50% 0.134 242.749)` - Deep blue for CTA buttons
- **Base Colors**: Light grays for backgrounds (`oklch(97% 0.014 254.604)`)
- **Section Colors**: Contextual colors for workflow steps:
  - Consultation: Green tones
  - Contract: Purple tones  
  - Testing: Sky blue tones
  - Production: Pink tones
- **Text**: Dark neutral for readability (`oklch(39% 0.09 240.876)`)

### Typography
- **Font**: Roboto Flex with Cyrillic support for Russian content
- **Scale**: Fluid typography using `clamp()` functions
  - Headers: `clamp(var(--text-2xl), var(--text-6xl))`
  - Body: `clamp(var(--text-lg), var(--text-xl))`
- **Weight**: Semi-bold headers, regular body text, thin for descriptions

### Spacing & Layout
- **Container**: `max-w-7xl` with responsive padding using `clamp(2rem, 3rem)`
- **Sections**: Large vertical spacing `clamp(5rem, 9rem)` between sections
- **Grid**: Responsive grid layouts (1-2-4 columns based on screen size)
- **Border Radius**: `rounded-4xl` for modern, soft appearance

### Animation & Interactions
- **Transitions**: `duration-300` for hover effects and state changes
- **Shadows**: Dynamic shadows on scroll and hover (`shadow-2xl`)
- **Scroll**: Smooth scroll behavior for navigation

## 🏢 Business Information

### Company Details
- **Name**: ООО "Демидов Люкс СПА"
- **Established**: 2009
- **Industry**: Custom cosmetics manufacturing and private labeling
- **Location**: Moscow, Russia with two production facilities

### Services
- **Custom Formulation**: 7-day production timeline from order
- **Full-Cycle Production**: From concept to finished product
- **Private Labeling**: Brand development, design, packaging
- **Product Types**: Face/body creams, masks, serums, shampoos, SPA products
- **Quality Control**: On-site laboratory with microbiological testing
- **Certifications**: Full compliance documentation provided

### Target Audience
- **Primary**: Businesses looking to create cosmetics brands
- **Secondary**: Entrepreneurs wanting private label products
- **Use Cases**: Brand launches, product line extensions, custom formulations

### Brand Values
- **Quality**: Professional equipment and modern laboratories  
- **Speed**: 7-day production promise
- **Customization**: Unique formulations and packaging solutions
- **Expertise**: 15+ years of experience, exhibition participation
- **Compliance**: Full certification and documentation support

### Contact Information
- **Phone**: +7 (495) 123-45-67
- **Email**: info@deluxspa.ru
- **Telegram**: @demidovlux  
- **WhatsApp**: +7 (916) 123-45-67

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cosmetics.info

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint code analysis
```

## 📋 TODO List

### High Priority
- [ ] **Form validation and submission** - Complete backend integration
- [ ] **Security improvements** - CSRF protection, CSP headers, input sanitization
- [ ] **Company logo** - Replace "ЛОГОТИП" placeholder with actual logo
- [ ] **Icons and favicons** - Custom icon set matching brand
- [ ] **Mobile version optimization** - Enhanced mobile experience
- [ ] **Email integration** - Automated email sending on form submission

### Future Enhancements
- [ ] **Multi-language support** - English version for international clients
- [ ] **Admin dashboard** - Form submissions management
- [ ] **SEO optimization** - Meta tags, structured data, sitemap
- [ ] **Analytics integration** - Google Analytics or similar
- [ ] **Performance monitoring** - Core Web Vitals tracking
- [ ] **Content Management** - Dynamic content updates
- [ ] **Blog section** - Industry insights and company news
- [ ] **Product gallery** - Showcase of manufactured products
- [ ] **Client testimonials** - Success stories and reviews
- [ ] **Certificate gallery** - Display quality certifications

## 📄 License

This project is proprietary software developed for ООО "Демидов Люкс СПА". All rights reserved.

---

**Last Updated**: January 2025  
**Version**: 0.1.0  
**Contact**: Development team - info@deluxspa.ru