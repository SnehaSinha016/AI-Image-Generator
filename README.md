
# AI Image Generator

AI Image Generator is a full-stack web app that allows users to generate AI-powered images using prompts. It leverages the Stability AI API to generate images (via Stable Diffusion) and allows users to share them with the community.

---

## Features

-  Generate AI images from text using Stability AI
-  View and share generated images with others
-  Fast and modern UI built with React + TailwindCSS
-  Random prompt generator for inspiration

---

##  Project Structure

```
AI-Image-Generator-main/
├── client/         # Frontend (React + Vite)
└── server/         # Backend (Express + MongoDB + Stability AI)
```

---

##  Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or MongoDB Atlas)
- Stability AI API Key ([Get one here](https://platform.stability.ai))

---

###  Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory with:

```
MongoDB_url=your_mongodb_connection_string
STABILITY_API_KEY=your_stability_api_key
```

Start the backend server:

```bash
npm start
```

Runs on: `https://ai-image-generator-1-45n9.onrender.com`

---

###  Frontend Setup

```bash
cd client
npm install
npm run dev
```

Runs on: `http://localhost:5173`

---

##  Environment Variables

Your `.env` file in the `server/` directory should look like:

```env
MongoDB_url=mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname
STABILITY_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxx
```

>  Make sure `.env` is included in your `.gitignore` file to protect secrets!

---

## Tech Stack

**Frontend**
- React 19
- Vite
- TailwindCSS
- React Router

**Backend**
- Node.js + Express
- MongoDB (via Mongoose)
- Stability AI API
- dotenv + axios + cors

---

## .gitignore Example

```gitignore
# Node modules
node_modules/
.env
dist/
build/
```

---

##  Future Improvements

- User authentication
- Image history & favorites
- Gallery view with filters
- Download/share buttons

---

##  License

MIT License

---

##  Author

Developed by Sneha Sinha

