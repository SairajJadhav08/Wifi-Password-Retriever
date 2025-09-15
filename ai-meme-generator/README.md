# 🤖 AI Meme Generator

A modern, responsive web application for creating hilarious memes with just a few clicks! Built with React, TypeScript, and the Imgflip API.

## ✨ Features

- **User Input**: Enter custom top and bottom text for your memes
- **Meme Templates**: Choose from popular meme templates (Drake, Distracted Boyfriend, Two Buttons, etc.)
- **Random Meme**: Generate random memes with funny pre-written text
- **Real-time Preview**: See your meme with text overlay before generating
- **Download & Share**: Save memes locally or share them with others
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-meme-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with modern features (Grid, Flexbox, Gradients)
- **API**: Imgflip Meme API
- **Deployment Ready**: Can be deployed to Vercel, Netlify, or GitHub Pages

## 📱 How to Use

1. **Enter Text**: Type your desired top and bottom text in the input fields
2. **Select Template**: Click on any meme template from the grid
3. **Generate**: Click "Generate Meme" to create your custom meme
4. **Random Option**: Use "🎲 Random Meme" for instant funny content
5. **Download/Share**: Save your creation or share it with friends

## 🎨 Features in Detail

### Meme Templates
The app loads popular meme templates from the Imgflip API, including:
- Drake Pointing
- Distracted Boyfriend
- Two Buttons
- Expanding Brain
- Mocking SpongeBob
- And many more!

### Random Meme Generator
Includes pre-written funny text combinations perfect for:
- Programming jokes
- Everyday situations
- Relatable content

### Responsive Design
- Mobile-first approach
- Grid layout that adapts to screen size
- Touch-friendly interface
- Optimized for all devices

## 🔧 API Integration

This app uses the Imgflip API for:
- Fetching meme templates
- Generating memes with custom text

**Note**: The app uses public demo credentials for the Imgflip API. For production use, you should:
1. Create an account at [imgflip.com](https://imgflip.com)
2. Get your own API credentials
3. Update the credentials in `src/services/memeService.ts`

## 🚀 Deployment

This app can be easily deployed to:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the dist folder to Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- [Imgflip API](https://imgflip.com/api) for providing meme templates and generation
- [Vite](https://vitejs.dev/) for the amazing build tool
- [React](https://reactjs.org/) for the powerful UI library

---

**Made with ❤️ and lots of memes!**