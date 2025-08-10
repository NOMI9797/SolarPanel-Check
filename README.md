# Solar Panel Hub 🌞

A professional, user-friendly web application that serves as a centralized hub for solar panel information and authentication. Users can easily find their solar panel manufacturer and get redirected to the official barcode verification systems.

## ✨ Features

- **Brand Selection**: Choose from major solar panel manufacturers
- **Direct Redirects**: One-click access to official authentication systems
- **Search & Filter**: Find brands quickly with search and category filtering
- **Professional UI**: Modern, responsive design with solar-themed aesthetics
- **Mobile Friendly**: Optimized for all device sizes
- **Category System**: Premium, Standard, and Budget classifications

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Headless UI** - Accessible UI components

## 🏗️ Project Structure

```
solar-panel-hub/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main homepage
│   │   └── globals.css         # Global styles
│   └── config/
│       └── solarBrands.ts      # Brand configuration
├── public/                     # Static assets
└── package.json               # Dependencies
```

## 🎯 How It Works

1. **User visits** the Solar Panel Hub
2. **Selects** their solar panel manufacturer from the grid
3. **Clicks** on the brand card
4. **Gets redirected** to the official authentication/barcode verification page
5. **Completes** verification on the manufacturer's website

## 🔧 Customization

### Adding New Brands

Edit `src/config/solarBrands.ts` to add new manufacturers:

```typescript
{
  id: 'new-brand',
  name: 'New Brand Solar',
  description: 'Description of the brand',
  logo: '🔆',
  color: 'from-purple-500 to-pink-500',
  borderColor: 'border-purple-200',
  url: 'https://www.newbrand.com/verification', // Replace with actual URL
  category: 'premium', // 'premium' | 'standard' | 'budget'
  features: ['Feature 1', 'Feature 2', 'Feature 3']
}
```

### Current Brands & URLs

**Premium Brands:**
- **Longi Solar**: [Module Authenticity Query](https://share.google/9L1rs4WCAATHNcNEA)
- **Jinko Solar**: [Module Verification](https://share.google/S9FQwIhvffEL14fCY)

**Standard Brands:**
- **Canadian Solar**: [Module Authenticity](https://share.google/nTyrSIICXcORoGQDY)
- **Trina Solar**: [Module Query](https://customerservice.trinasolar.com/moduleQuery.html#/)
- **JA Solar**: [Module Authenticity](https://product.jasolar.com/en.html)

**Budget Brands:**
- **ARM Solar**: [Module Verification](https://www.armpakpower.com/module-verification.php)

### Styling Customization

- **Colors**: Modify the color schemes in `solarBrands.ts`
- **Theme**: Update `globals.css` for global styling changes
- **Layout**: Customize the main page layout in `page.tsx`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd solar-panel-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## 📱 Features in Detail

### Search Functionality
- Real-time search across brand names, descriptions, and features
- Instant filtering as you type

### Category Filtering
- **Premium**: High-end, high-efficiency panels
- **Standard**: Reliable, cost-effective solutions
- **Budget**: Affordable options

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

### Security Features
- External links open in new tabs
- No data collection or storage
- Direct redirects to official sites

## 🎨 Design Features

- **Solar Theme**: Clean light background with green and blue accents
- **Modern Cards**: Hover effects and smooth transitions
- **Professional Layout**: Clean, organized information hierarchy
- **Accessibility**: Proper contrast and readable fonts
- **Interactive Elements**: Hover states and visual feedback

## 🔒 Security & Privacy

- No user data collection
- No authentication required
- External redirects only
- Open source and transparent

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- [ ] Add more solar panel brands
- [ ] Implement user reviews and ratings
- [ ] Add solar panel specifications database
- [ ] Create mobile app version
- [ ] Add multi-language support
- [ ] Implement brand comparison tools

---

**Built with ❤️ for the solar energy community**

*Last updated: December 2024*
