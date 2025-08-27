// import express from "express";
// import cors from "cors";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";
// import * as dotenv from "dotenv";
// import { issues, users } from "./db/schema";
// import { eq } from "drizzle-orm";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// const db = drizzle(pool);

// // Middleware to verify JWT
// const authenticateToken = (req: any, res: any, next: any) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// app.get("/", (_, res) => {
//     res.send("API is running!");
//   });
  
// // User Registration
// app.post("/api/register", async (req, res) => {
//   const { email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const [newUser] = await db.insert(users).values({ email, password: hashedPassword }).returning();
//     res.status(201).json({ id: newUser.id, email: newUser.email });
//   } catch (error) {
//     res.status(400).json({ error: "Email already exists" });
//   }
// });

// // User Login
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;
//   const [user] = await db.select().from(users).where(eq(users.email, email));
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }
//   const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
//   res.json({ token });
// });

// // Create Issue
// app.post("/api/issues", authenticateToken, async (req: any, res) => {
//   const { title, description } = req.body;
//   const [newIssue] = await db.insert(issues).values({ title, description, status: "open" }).returning();
//   res.status(201).json(newIssue);
// });

// // List Issues
// app.get("/api/issues", authenticateToken, async (req, res) => {
//   const issueList = await db.select().from(issues);
//   res.json(issueList);
// });

// // Update Issue Status
// app.put("/api/issues/:id", authenticateToken, async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const [updatedIssue] = await db.update(issues).set({ status, updatedAt: new Date() }).where(eq(issues.id, parseInt(id))).returning();
//   res.json(updatedIssue);
// });

// // Filter Issues by Status (Optional Enhancement)
// app.get("/api/issues/filter", authenticateToken, async (req, res) => {
//   const { status } = req.query;
//   const issueList = await db.select().from(issues).where(eq(issues.status, status as string));
//   res.json(issueList);
// });

// app.listen(3001, () => console.log("Server running on http://localhost:3001"));

import express from "express";
   import cors from "cors";
   import { drizzle } from "drizzle-orm/node-postgres";
   import { Pool } from "pg";
   import * as dotenv from "dotenv";
   import { issues, users } from "./db/schema";
   import { eq } from "drizzle-orm";
   import jwt from "jsonwebtoken";
   import bcrypt from "bcryptjs";

   dotenv.config();

   const app = express();
   app.use(cors());
   app.use(express.json());

   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
   const db = drizzle(pool);

   // Middleware to verify JWT
   const authenticateToken = (req: any, res: any, next: any) => {
     const authHeader = req.headers["authorization"];
     const token = authHeader && authHeader.split(" ")[1];
     if (!token) return res.sendStatus(401);

     jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
       if (err) return res.sendStatus(403);
       req.user = user;
       next();
     });
   };

   app.get("/", (_, res) => {
     res.send("API is running!");
   });

   // User Registration
   app.post("/api/register", async (req, res) => {
     const { email, password } = req.body;
     const hashedPassword = await bcrypt.hash(password, 10);
     try {
       const [newUser] = await db.insert(users).values({ email, password: hashedPassword }).returning();
       res.status(201).json({ id: newUser.id, email: newUser.email });
     } catch (error) {
       res.status(400).json({ error: "Email already exists" });
     }
   });

   // User Login
   app.post("/api/login", async (req, res) => {
     const { email, password } = req.body;
     const [user] = await db.select().from(users).where(eq(users.email, email));
     if (!user || !(await bcrypt.compare(password, user.password))) {
       return res.status(401).json({ error: "Invalid credentials" });
     }
     const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
     res.json({ token });
   });

   // Get Users
   app.get("/api/users", authenticateToken, async (req, res) => {
     const userList = await db.select().from(users);
     res.json(userList);
   });

   // Create Issue
   app.post("/api/issues", authenticateToken, async (req: any, res) => {
     const { title, description, assignedTo } = req.body;
     const createdBy = req.user.id;
     const [newIssue] = await db.insert(issues).values({ title, description, status: "open", createdBy, assignedTo }).returning();
     res.status(201).json(newIssue);
   });

   // List Issues
   app.get("/api/issues", authenticateToken, async (req, res) => {
     const issueList = await db.select().from(issues);
     res.json(issueList);
   });

   // Update Issue Status
   app.put("/api/issues/:id", authenticateToken, async (req, res) => {
     const { id } = req.params;
     const { status, assignedTo } = req.body;
     const [updatedIssue] = await db.update(issues).set({ status, assignedTo, updatedAt: new Date() }).where(eq(issues.id, parseInt(id))).returning();
     res.json(updatedIssue);
   });

   // Filter Issues by Status
   app.get("/api/issues/filter", authenticateToken, async (req, res) => {
     const { status } = req.query;
     const issueList = await db.select().from(issues).where(eq(issues.status, status as string));
     res.json(issueList);
   });

   // Delete Issue
   app.delete("/api/issues/:id", authenticateToken, async (req, res) => {
     const { id } = req.params;
     const [deletedIssue] = await db.delete(issues).where(eq(issues.id, parseInt(id))).returning();
     if (!deletedIssue) {
       return res.status(404).json({ error: "Issue not found" });
     }
     res.json(deletedIssue);
   });

   app.listen(3001, () => console.log("Server running on http://localhost:3001"));