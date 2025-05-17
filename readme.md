# my-porject

You can add your MONGO_URI
Install dependencies
# Backend deps
npm install

# Frontend deps
cd frontend
npm install

npm install concurrently --save-dev
npm run dev

If it is not work:
1) Open a new terminal
    cd \backend
    npm install
    npm run server
    If it shows Server started on port 5000, then the backend is OK
2) Open another terminal
    cd \frontend
    npm start
    Open the browser and visit http://localhost:3000. The /api proxy will then be correctly forwarded to 5000.
