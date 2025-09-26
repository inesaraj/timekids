// server/app.js
const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // your MySQL username
  password: "", // your MySQL password (if any)
  database: "timekids_blog", // your DB name
  port: 3306, // your MySQL port
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ MySQL connected...");
  }
});

// ✅ Serve static files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));

// Routes to serve HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin", "admin.html"));
});

// ✅ Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "DB error" });
      }
      if (results.length > 0) {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    }
  );
});

// ✅ Fetch all blogs
app.get("/api/blogs", (req, res) => {
  db.query("SELECT * FROM blogs ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

// ✅ Add a new blog
app.post("/api/blogs", (req, res) => {
  const { title, image_path, short_description, content } = req.body;

  db.query(
    "INSERT INTO blogs (title, image_path, short_description, content) VALUES (?, ?, ?, ?)",
    [title, image_path, short_description, content],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Insert failed" });
      res.json({ success: true, id: result.insertId });
    }
  );
});

// ✅ Delete a blog
app.delete("/api/blogs/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM blogs WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ success: true });
  });
});

// Get single blog
app.get("/api/blogs/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM blogs WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (results.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(results[0]);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
