# WonderLust

An Airbnb-style **property listing platform** built while learning the MERN stack fundamentals.

> This is **not** a real booking system. It’s a **CRUD + Auth** web app for creating and managing travel stay listings and reviews.

## What you can do

### Listings
- Browse listings (places to stay)
- View listing details
- **Authenticated users** can:
  - Create a listing (title, price, location, image, description)
  - Edit/Delete **their own** listings

### Reviews
- Read reviews left by other users
- **Authenticated users** can add reviews/comments to listings

### Security
- **Authentication**: signup/login
- **Authorization**: only the listing owner can edit/delete their listing

## Tech Stack (actual)

### Backend
- **Node.js**
- **Express.js**

### Frontend (SSR)
- **EJS (Embedded JavaScript Templates)**
- **HTML / CSS / basic JavaScript**

### Database
- **MongoDB**
- **Mongoose**

### Authentication & Sessions
- **Passport.js**
- **passport-local**
- **express-session**

### Media uploads
- **Multer** (file upload middleware)
- **Cloudinary** (image storage)

### Other tooling
- **dotenv** (environment variables)
- **connect-flash** (flash messages)
- **method-override** (PUT/DELETE from HTML forms)
- **Joi** (request validation — if present in the codebase)

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation
```bash
git clone https://github.com/ER-DHRUV/WonderLust.git
cd WonderLust
npm install
```

## Environment Variables
Create a `.env` file in the project root.

Common variables used in this kind of setup (adjust names to match the repo):
```bash
# server
PORT=3000
SESSION_SECRET=your_session_secret

# database
MONGODB_URI=mongodb://127.0.0.1:27017/wonderlust

# cloudinary
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_KEY=xxxx
CLOUDINARY_SECRET=xxxx
```

## Run Locally
```bash
npm start
```
Then open:
- http://localhost:3000

If the project uses `nodemon` in dev, you can add/run:
```bash
npm run dev
```

## CRUD Overview (high level)
This app follows a classic SSR + REST-ish CRUD approach:
- **Listings**: create/read/update/delete
- **Reviews**: create/read (and optionally delete)

Because forms only support `GET`/`POST`, updates/deletes are typically handled via **method-override**.

## License
Add a license if you plan to make the usage terms explicit (MIT is common for learning projects).

---

If you find a mismatch between this README and the code (env var names, scripts, routes), feel free to open an issue/PR or tell me what files to check and I’ll tailor it exactly.