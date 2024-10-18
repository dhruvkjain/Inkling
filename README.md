> App is currently in construction.

<p align="center">
    <img src="https://github.com/user-attachments/assets/8c567ec4-b789-4c8e-addf-f1256e46427e" style="border-radius: 25px;"/>
</p>


<h1 align="center">Inkling</h1>
<p align="center">
    <code>Inkling</code>, one player draws a word or phrase while others race against the clock to guess what it is.
</p>

<br/>



Contents
========
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Frontend Deployment to Vercel](#frontend-deployment-to-vercel)
- [Backend Deployment to Render](#backend-deployment-to-render)


### Tech Stack
 - Vite + Typescript + React.js
 - ShadcnUI
 - Tailwind CSS
 - Zod
 - Node.js + Express.js
 - MongoDB + Mongoose
 - Redis Cloud
 - Knip
 - Socket.io
 - Husky
 - Docker (optional)

---

### Architecture

<p align="center">
    <img src="https://github.com/user-attachments/assets/8dfb7a25-625d-42cb-8069-ff719c41a4db" style="height: fit-content;width: fit-content;border-radius: 0px;"/>
</p>

---

### Installation
1. Clone the repo
  ```bash
  git clone
  ```
2. Move to Inkling
  ```bash
  cd Inkling
  ```
3. Install dependencies
  ```bash
  npm install
  ```

- Frontend

    1. Move to frontend
    ```bash
    cd frontend
    ```
    2. Install dependencies
    ```bash
    npm install
    ```
    3. Create a .env file 
    ```bash
    touch .env
    ```
    4. Add server url
    ```.env
    VITE_SERVER_URL=http://localhost:3000
    ```
    3. Run the development server
    ```bash
    npm run dev
    ```

- Backend (with docker)

    1. Move to backend
    ```bash
    cd backend
    ```
    2. Pull the docker container
    ```bash
    docker pull immortalnova/inkling
    ```
    3. Create a .env file 
    ```bash
    touch .env
    ```
    4. Add the below to .env file
    ```.env
    NODE_ENV=development
    ```
    5. Create a MongoDB database and add your Mongo URL to .env file
    ```.env
    MONGO_URL=mongodb+srv://.....
    ```
    6. Generate a random secret key for digital signing (run in terminal) :
    ```bash
    openssl rand -base64 32
    ```
    7. Add your secret key used to hash JWT tokens
    ```.env
    JWT_SECRET=secret_key.....
    ```
    8. Create a Redis Cloud account and add your Redis details to .env file
    ```.env
    REDIS_PASSWORD=password.....
    REDIS_HOST=redis-something.....redis-cloud.com
    REDIS_PORT=xxxxx
    ```
    9. Add client url
    ```.env
    CLIENT_URL=http://localhost:5173
    ```
    10. Run an image locally *(with env variables)*:
    ```bash
    docker run --env-file ./.env -p 3000:3000 immortalnova/inkling
    ```

- Backend (without docker)

    1. Move to backend
    ```bash
    cd backend
    ```
    2. Install dependencies
    ```bash
    npm install
    ```
    3. Create a .env file 
    ```bash
    touch .env
    ```
    4. Add the below to .env file
    ```.env
    NODE_ENV=development
    ```
    5. Create a MongoDB database and add your Mongo URL to .env file
    ```.env
    MONGO_URL=mongodb+srv://.....
    ```
    6. Generate a random secret key for digital signing (run in terminal) :
    ```bash
    openssl rand -base64 32
    ```
    7. Add your secret key used to hash JWT tokens
    ```.env
    JWT_SECRET=secret_key.....
    ```
    8. Create a Redis Cloud account and add your Redis details to .env file
    ```.env
    REDIS_PASSWORD=password.....
    REDIS_HOST=redis-something.....redis-cloud.com
    REDIS_PORT=xxxxx
    ```
    9. Add client url
    ```.env
    CLIENT_URL=http://localhost:5173
    ```
    10. Run development server:
    ```bash
    npm run dev
    ```

---
### Frontend Deployment to Vercel
### Backend Deployment to Render

<a href="https://inkling-sigma.vercel.app/"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
