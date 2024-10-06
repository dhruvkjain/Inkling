> App is currently in construction.

<p align="center">
    <img src="https://github.com/user-attachments/assets/a8eb0207-6484-497f-8564-ce582dd94428" style="border-radius: 25px;"/>
</p>


<h1 align="center">Inkling</h1>
<p align="center">
    <code>Inkling</code>, one player draws a word or phrase while others race against the clock to guess what it is.
</p>

<br/>



Contents
========
- [Tech Stack](#tech-stack)
- [Installation(without Docker)](#installationwithout-docker)
- [Installation(with Docker)](#installationwith-docker)
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
 - Docker

### Installation(without Docker)
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
    3. Run the development server
    ```bash
    npm run dev
    ```

- Backend

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
    3. Add your secret key used to hash JWT tokens
    ```.env
    JWT_SECRET=secret_key.....
    ```
    3. Create a Redis Cloud account and add your Redis details to .env file
    ```.env
    REDIS_PASSWORD=password.....
    REDIS_HOST=redis-something.....redis-cloud.com
    REDIS_PORT=xxxxx
    ```


### Frontend Deployment to Vercel

<a href="https://inkling-sigma.vercel.app/"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

**Deployment Steps**

1. Press the button above to deploy to **Vercel**.
2. Add the following environment variables in the Vercel dashboard.
   1. **NEXT_PUBLIC_ID** - Your Login Username
   2. **NEXT_PUBLIC_PASSWORD** - Your Login Password
3. Connect Postgres database to your Vercel project. Follow [this](https://vercel.com/docs/storage/vercel-postgres/quickstart) guide.
4. All done! 🎉
5. (Optional) If you want to use your own domain, follow [this](https://vercel.com/guides/how-do-i-add-a-custom-domain-to-my-vercel-project) guide.

### Backend Deployment to Render
