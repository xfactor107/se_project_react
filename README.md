# WTWR: Weather-Based Wardrobe Recommender — Frontend

A responsive React application that recommends outfits based on real-time weather conditions and user preferences.

## Demo
Watch the full walkthrough here:  
https://drive.google.com/file/d/1t3nKE09WM2USEuP8KLYoDGpm5oVzsi8M/view?usp=sharing

## Overview
WTWR (“What To Wear?”) is a full-stack MERN application that helps users decide what to wear based on the current weather in their location.  
The frontend provides a clean, intuitive interface for browsing recommended outfits, managing wardrobe items, and interacting with user-specific content.

This frontend is deployed on Vercel and communicates with a Node/Express backend hosted on Render.

## Features
- Real-time weather display using a third-party weather API  
- Personalized outfit recommendations based on temperature  
- User authentication (signup/login)  
- Full wardrobe management  
  - Add clothing items  
  - Delete clothing items  
  - Like/unlike items  
- Responsive UI built with React  
- Automatic default wardrobe population for new users  
- Clean, modern component architecture

## Tech Stack
- React  
- JavaScript  
- Vite  
- CSS  
- Fetch API  
- Vercel Deployment  
- OpenWeather API  
- JWT Authentication

## Live Deployment
Frontend (Vercel):  
https://se-project-react-blue.vercel.app/

Backend (Render):  
https://se-project-express-vfq4.onrender.com

## Project Structure
```
src/
  components/   # one folder per component (JSX + CSS)
  contexts/     # current user and temperature unit
  hooks/        # useForm
  utils/        # API, auth, and weather helpers
  assets/       # images
  main.jsx
```

## Installation & Setup
1. Clone the repo
2. Install dependencies
   ```
   npm install
   ```
3. Set the backend URL in `.env` (or `.env.local` to override it locally)
   ```
   VITE_API_URL=http://localhost:3001
   ```
4. Start the development server (opens at http://localhost:3000)
   ```
   npm run dev
   ```

## Backend Repository
https://github.com/xfactor107/se_project_express

## Author
Developed by **Alejandro Jimenez**
