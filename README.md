# Interview-Test

## Setup

Install dependencies:
```bash
npm install

```

Create a .env file and add the following (TEST MODE is currently enabled):
PORT=3000
TEST_MODE=1
MONGODB_URL=mongodb://localhost:27017/mydatabase

Start the server:

node index.js

API Routes are for live url in test mode =1


Health Check

https://interview-test-kohl.vercel.app/api/healthz

create Paste

https://interview-test-kohl.vercel.app/api/pastes

Get Paste by ID

https://interview-test-kohl.vercel.app/api/pastes/:id

Get Paste (Short URL)

https://interview-test-kohl.vercel.app/api/p/:id
