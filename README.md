# 🐕 DogOps E-Commerce Website

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Fastify](https://img.shields.io/badge/Fastify-5.2-green?logo=fastify)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwind-css)

A modern e-commerce platform specialized in handmade dog clothing, harnesses, and accessories. This project showcases a complete web solution for a small business selling custom-made dog apparel.

## ✨ Features

- 🛍️ **Product Catalog**: Browse through a collection of handmade dog clothing and accessories
- 🛒 **Shopping Cart**: Real-time cart management with Zustand state management
- 👤 **User Authentication**: Secure JWT-based authentication system
- 📱 **Responsive Design**: Mobile-first approach using TailwindCSS and NextUI
- 🖼️ **Image Management**: Handle product images and user uploads
- 💳 **Order Management**: Complete order processing system
- 🔒 **Protected Routes**: Secure admin and user dashboards

## 🚀 Tech Stack

### Frontend
- **React 19** with Vite for fast development and building
- **TailwindCSS** for styling
- **NextUI** for modern UI components
- **Zustand** for state management
- **React Query** for data fetching
- **React Router** for navigation
- **Framer Motion** for animations

### Backend
- **Fastify** for high-performance server
- **TypeScript** for type safety
- **PostgreSQL** with Sequelize ORM
- **JWT** for authentication
- **Multipart** for file uploads

## 🛠️ Installation

### Prerequisites
- Node.js (Latest LTS version)
- PostgreSQL
- Yarn package manager

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/RainZerg/react-dogops-website.git
cd react-dogops-website
```

2. **Install dependencies**
```bash
# Install client dependencies
cd client
yarn install

# Install server dependencies
cd ../server
yarn install
```

3. **Environment Setup**
```bash
# In server directory, create .env file
cp .env.example .env
# Edit .env with your database and JWT settings
```

4. **Start Development Servers**

For Client:
```bash
cd client
yarn dev
```

For Server:
```bash
cd server
yarn dev
```

## 📚 Project Structure

```
react-dogops-website/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
│   └── package.json
│
└── server/                # Backend application
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   └── utils/        # Helper functions
    └── package.json
```

## 🔧 Configuration

### Client Configuration
- Environment variables in `.env`
- Vite configuration in `vite.config.js`
- TailwindCSS configuration in `tailwind.config.js`

### Server Configuration
- Database configuration in `config/database.js`
- Environment variables in `.env`
- TypeScript configuration in `tsconfig.json`

## 🤝 Contributing

This is a personal project for a small business, but suggestions and improvements are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

- **RainZerg** - *Initial work and maintenance*

## 🙏 Acknowledgments

- Special thanks to my wife for inspiring this project with her amazing dog clothing designs
- The open-source community for the amazing tools and libraries used in this project
