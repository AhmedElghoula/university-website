# 🎓 ISSAT E-Learning Platform

A modern and comprehensive online learning platform designed for a Higher Education Institute, facilitating digital teaching and learning.

## 📋 Project Description

This e-learning platform is a complete solution that connects students, teachers, and administrators in an intuitive digital learning environment. It enables course management, training programs, timetables, and provides an enriching learning experience for all users.

### 🌟 Key Features

- **📚 Course Management**: Creation, organization and tracking of courses with multimedia support
- **📅 Timetable**: Planning and visualization of class schedules
- **👥 Multi-Role Management**: Interface adapted for students, teachers, administrators and super-administrators
- **📖 Digital Library**: Access to educational resources and e-books
- **📰 News**: News and institutional announcements system
- **🎯 Training Offers**: Presentation of available training programs
- **📊 Dashboard**: Personalized interfaces according to user role

## 🏗️ Technical Architecture

### Frontend (Client)

- **Framework**: React 18 with Vite
- **UI Library**: Ant Design (antd) for modern user interface
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Redux Toolkit for state management
- **Routing**: React Router DOM for navigation
- **Calendar**: FullCalendar for timetable management

### Backend (Server)

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **Security**: Helmet, XSS protection, CORS, rate limiting
- **File Upload**: Express-fileupload for multimedia resources

## 👤 User Roles

### 🔧 Super Administrator

- Complete user account management
- Creation and modification of training programs
- General platform supervision

### 📰 News Administrator

- News and announcements management
- Editorial content moderation

### 👨‍🏫 Teacher

- Course creation and management
- Educational resources upload
- Student monitoring
- Timetable management

### 👨‍🎓 Student

- Access to courses and resources
- Timetable consultation
- Participation in educational activities
- News tracking

## 🚀 Installation and Setup

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone [REPOSITORY_URL]
   cd mini-projet
   ```

2. **Install Backend dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install Frontend dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Environment configuration**

   ```bash
   # In the server folder, create a .env file
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/elearning
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the application**

   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

## 📁 Project Structure

```
mini-projet/
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Application pages
│   │   ├── assets/         # Static resources
│   │   ├── redux/          # Redux state management
│   │   └── Routers/        # Route configuration
│   └── package.json
├── server/                 # Node.js Backend API
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── utils/             # Utilities
└── README.md
```

## 🔧 Detailed Features

### 🎓 Training Management

- Creation of training programs by department, field and specialty
- Definition of subjects and course hours
- Assignment of student groups

### 📚 Course System

- Upload of multimedia documents
- Organization by training programs and subjects
- Comments and interactions

### 📅 Timetable

- Calendar visualization
- Session planning
- Automatic notifications

### 🔐 Secure Authentication

- Multi-role login
- Password recovery
- Code validation
- Secure sessions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is under the MIT License. See the `LICENSE` file for more details.



_Developed with ❤️ for the Higher Institute of Applied Sciences and Technology (ISSAT)_
