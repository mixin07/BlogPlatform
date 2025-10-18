# Server (Express + Prisma)

1. Copy .env.example -> .env and fill values.
2. npm install
3. npx prisma generate
4. npx prisma migrate dev --name init
5. npm run dev

API routes mounted:
- /api/auth/*
- /api/blogs/*
- /api/admin/*
