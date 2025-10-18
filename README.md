# Club Blog Platform

A comprehensive blog platform for club members with admin approval workflow.

## 🏗️ Project Structure

```
BlogPlatform/
│
├── client/                      # FRONTEND — Next.js (App Router)
│   ├── app/
│   │   ├── (auth)/login/page.tsx
│   │   ├── (auth)/register/page.tsx
│   │   ├── member/dashboard/page.tsx
│   │   └── admin/dashboard/page.tsx
│   ├── components/
│   ├── lib/
│   ├── styles/
│   └── package.json
│
├── server/                      # BACKEND — Express + Prisma + JWT
│   ├── prisma/schema.prisma
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── auth.routes.js
│   │   │   ├── blogs.routes.js
│   │   │   └── admin.routes.js
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── validations/
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md


## 👥 Team Assignments

### Frontend Team

| Module | Assignee | Responsibilities |
|--------|----------|------------------|
| **Module 1: Authentication** | **Tharun** | Sign-up and Login Pages |
| **Module 2: Member Dashboard** | **Nandini** | Blog creation, editing, and submission |
| **Module 3: Admin Dashboard** | **Akshaya** | User approval and blog publishing |

### Backend Team

| Module | Assignee | Responsibilities |
|--------|----------|------------------|
| **Module 1: Authentication** | **Amaresh** | User registration, login, and JWT |
| **Module 2: Member Dashboard** | **Anand** | Blog CRUD operations |
| **Module 3: Admin Dashboard** | **Rithik** | Admin approval workflows |
| **Database & Infrastructure** | **Pavan** | Prisma setup, deployment, and integration |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your database URL and JWT secret
   ```

4. **Set up database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## 📋 Module Details

### Module 1: Authentication System
**Frontend (Tharun):**
- User registration form with validation
- Login page with JWT token handling
- Password setup page for approved users
- Route protection and redirects

**Backend (Amaresh):**
- User registration endpoint (`POST /api/users/register`)
- Password setup endpoint (`POST /api/users/set-password`)
- Login endpoint (`POST /api/auth/login`)
- JWT middleware for authentication

### Module 2: Member Dashboard
**Frontend (Nandini):**
- Blog creation form with rich text editor
- Blog listing with status indicators
- Blog editing interface
- Blog submission workflow

**Backend (Anand):**
- Blog CRUD operations (`POST /api/blogs`, `PATCH /api/blogs/:id`)
- Blog submission endpoint (`POST /api/blogs/:id/submit`)
- User's blog listing (`GET /api/blogs/my`)
- Status management (draft → pending_review)

### Module 3: Admin Dashboard
**Frontend (Akshaya):**
- Admin dashboard with statistics
- User approval interface
- Blog review and approval interface
- Rejection with reason functionality

**Backend (Rithik):**
- User approval endpoints (`PATCH /api/admin/users/:id/approve`)
- Blog approval endpoints (`PATCH /api/admin/blogs/:id/approve`)
- Admin statistics endpoint (`GET /api/admin/stats`)
- Email notification system

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id            String   @id @default(cuid())
  name          String
  email         String   @unique
  regNo         String   @unique
  year          String
  domain        String
  refCode        String   @unique
  status        UserStatus @default(PENDING)
  passwordHash  String?
  role          UserRole @default(MEMBER)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  blogs         Blog[]
}
```

### Blog Model
```prisma
model Blog {
  id          String     @id @default(cuid())
  title       String
  content     String
  links       String[]   @default([])
  status      BlogStatus @default(DRAFT)
  authorId    String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  author      User       @relation(fields: [authorId], references: [id])
}
```

## 🔐 Authentication Flow

1. **User Registration:** User fills registration form → Account created with `PENDING` status
2. **Admin Approval:** Admin reviews and approves user → Status changes to `APPROVED`
3. **Password Setup:** User receives reference code → Sets password using email + ref code
4. **Login:** User logs in with email + password → Receives JWT token
5. **Access Control:** JWT token used for authenticated requests

## 📊 User Roles & Permissions

### Member Role
- Create and edit blog drafts
- Submit blogs for review
- View own blog history
- Delete draft blogs

### Admin Role
- Approve/reject user registrations
- Approve/reject blog submissions
- View all users and blogs
- Access admin dashboard statistics

### Code Standards
- Use TypeScript for frontend
- Follow REST API conventions
- Implement proper error handling
- Add input validation
- Use consistent naming conventions

### Git Workflow
1. Create feature branches from `master`
2. Use descriptive commit messages
3. Test thoroughly before merging
4. Update documentation as needed

### Testing
- Test all API endpoints
- Verify authentication flows
- Test responsive design
- Cross-browser compatibility

## 🔧 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
JWT_SECRET="change_this_to_a_strong_secret"
EMAIL_HOST="smtp.example.com"
EMAIL_PORT=587
EMAIL_USER="you@example.com"
EMAIL_PASS="email_password"
PORT=5000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📞 Support & Communication

- Use GitHub Issues for bug reports
- Create feature requests as issues
- Coordinate through team channels
- Regular standup meetings for progress updates

***

```markdown
# 📧 Nodemailer Setup for Gmail in Node.js

Easily send emails from your Node.js app using Nodemailer and Gmail.  
This setup uses environment variables for secure configuration.

---

## ⚙️ Installation

```
npm init -y
npm install nodemailer dotenv
```

---

## 🧩 Environment Configuration

Create a `.env` file in your project root (never commit this file):

```
GMAIL_USER=yourgmailaddress@gmail.com
GMAIL_PASS=yourgmailapppassword
```

> ⚠️ Use a Gmail **App Password** if your Google account has 2-Step Verification enabled.

---

## 📄 mail.js

```
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

/**
 * Send email using Gmail via Nodemailer
 * @param {Object} mailOptions { to, subject, text, html }
 * @returns {Promise}
 */
function sendMail(mailOptions) {
  return transporter.sendMail({
    from: process.env.GMAIL_USER,
    ...mailOptions
  });
}

module.exports = sendMail;
```

---

## 🚀 Usage Example

```
// app.js
const sendMail = require('./mail');

sendMail({
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'Hello from Node.js!',
  // html: '<b>Hello from Node.js!</b>'
})
  .then(info => console.log('Email sent:', info.response))
  .catch(err => console.error('Error:', err));
```

---


***


Citations:
[1] nodemailer/nodemailer: ✉️ Send e-mails with Node.JS https://github.com/nodemailer/nodemailer
[2] motdotla/Nodemailer: Send e-mails with Node.JS https://github.com/motdotla/Nodemailer
[3] accimeesterlin/nodemailer-examples https://github.com/accimeesterlin/nodemailer-examples
[4] Basic example to send mail in node js using nodemailer https://github.com/Sumit22vas/Nodemailer-Example
[5] Sending template emails in Node.JS https://github.com/GeekLaunch/nodejs-template-emails
[6] prabhalaxman/nodemailer-ejs-template https://github.com/prabhalaxman/nodemailer-ejs-template
[7] nodemailer-markdown https://www.npmjs.com/package/nodemailer-markdown
[8] Node.js Email Verification Project https://github.com/harshatechtrainings/nodemailer-solution
[9] schadokar/nodemailer-app: A simple mail sending nodejs ... https://github.com/schadokar/nodemailer-app
[10] dimianni/nodemailer-form https://github.com/dimianni/nodemailer-form

## 🎯 Success Criteria

- [ ] Users can register and get approved by admins
- [ ] Members can create, edit, and submit blogs
- [ ] Admins can approve users and publish blogs
- [ ] Responsive design works on all devices
- [ ] Secure authentication with JWT
- [ ] Database properly configured with Prisma
- [ ] Deployed and accessible online

---

**Happy Coding! 🚀**

*Remember to communicate regularly with your team members and ask for help when needed.*
