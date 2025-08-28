# Issue Tracker App

A minimal Issue Tracker web app built with **Next.js (frontend)**, **Express + Drizzle ORM + PostgreSQL (backend)**, and **TailwindCSS**.

## Features
Users can:
- Register / log in
- Create, update, and delete issues
- Filter issues by status
- View issues in board or list view

## Tech Stack

**Frontend**: Next.js, React, TailwindCSS
**Backend**: Express, Drizzle ORM, PostgreSQL
**Tools**: TypeScript, Axios, Jest

## Project Structure

issue-tracker/

├─ client/ # Frontend code

├─ server/ # Backend code

├─ README.md # This file


## Screenshots

### 1. List / Issues Once Logged

![Dashboard / Issues Screen](./client/public/list.jpeg)

### 2.  In Register / Login

![Register/Login Screen](./client/public/login.jpeg)

### 3. Board / Issues Once Logged In
![Dashboard / Issues Screen](./client/public/board.jpeg)


## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Nondumison/issue-tracker.git
cd issue-tracker
```
2. Install dependencies:
### Backend
```bash
cd server
npm install
```
### Frontend
```bash
cd ../client
npm install
```
3. Start development servers:
### Backend
```bash
cd server
npm run start
```
### Frontend
```bash
cd client
npm run dev
```
Visit http://localhost:3000 in your browser.

4. Run frontend tests:
```bash
cd client
npm test
```

## Prerequisites

- Node.js (v16+)
- npm (v8+)
- PostgreSQL (v14+)

## Contributing

- Fork the repo.
- Create a feature branch `git checkout -b feature/your-feature`.
- Commit changes `git commit -m "Add your feature"`.
- Push to the branch `git push origin feature/your-feature`.
- Open a pull request.

## License
MIT License

## Acknowledgments
Built with ❤️ by Nondumiso Nkosi