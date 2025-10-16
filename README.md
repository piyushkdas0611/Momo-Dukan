# Momo Dukan - Next.js 14 with TypeScript

A modern web application for Momo Dukan, built with Next.js 14 and TypeScript. This application showcases an authentic Himalayan dumpling restaurant with user authentication and contact features.

## 🚀 Technologies Used

- **Frontend**: Next.js 14 with App Router, TypeScript, React 18
- **Backend**: Node.js, Express.js, TypeScript  
- **Database**: MongoDB with Mongoose
- **Styling**: CSS Modules
- **Package Manager**: npm

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── login/             # Login page
│   │   ├── register/          # Register page
│   │   ├── contact/           # Contact page
│   │   └── about/             # About page
│   └── components/            # Reusable components
│       └── Navigation.tsx     # Navigation component
├── server/                    # Backend server
│   ├── index.ts              # Server entry point
│   ├── models/               # Database models
│   │   └── User.ts           # User model
│   ├── package.json          # Server dependencies
│   └── tsconfig.json         # Server TypeScript config
├── public/                   # Static assets
│   └── images/              # Image assets
├── package.json             # Main dependencies
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
└── README.md

```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm

### 1. Clone and Install Dependencies

```bash
# Install main application dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 2. Database Setup

Make sure MongoDB is running locally on port 27017, or update the connection string in `server/index.ts`:

```typescript
mongoose.connect('mongodb://localhost:27017/momo-dukan');
```

### 3. Run the Application

**Start the backend server:**
```bash
cd server
npm run dev
# Server will run on http://localhost:5000
```

**Start the frontend (in a new terminal):**
```bash
npm run dev
# Application will run on http://localhost:3000
```

## 📖 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend Scripts
- `npm run dev` - Start development server with nodemon and ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests

## 🎯 Features

- **Modern Next.js 14**: Uses the latest App Router with TypeScript
- **Responsive Design**: Mobile-friendly interface
- **User Authentication**: Login and registration functionality
- **Contact Form**: Feedback and inquiry submission
- **About Page**: Restaurant information and story
- **Image Optimization**: Next.js Image component for optimized loading
- **Type Safety**: Full TypeScript implementation for both frontend and backend

## 🔄 Migration from Create React App

This project has been successfully migrated from Create React App to Next.js 14 with the following improvements:

- ✅ Upgraded to Next.js 14 with App Router
- ✅ Converted all JavaScript files to TypeScript
- ✅ Replaced React Router with Next.js routing
- ✅ Optimized images with Next.js Image component
- ✅ Updated server to TypeScript
- ✅ Improved project structure and organization

## 🚀 Deployment

### Frontend Deployment (Vercel recommended)
```bash
npm run build
```

### Backend Deployment
```bash
cd server
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@momodukan.com or create an issue in the repository.