# TimeKids
This project is a basic server setup with admin login functionality. It uses **Node.js**, **Express**, **SQLite3**, and **MySQL2**.

---

## Admin Credentials

- **Email:** admin@example.com  
- **Password:** password123


---

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)
- MySQL (if using MySQL database)

---

## Installation

1. Clone this repository:

```bash
git clone <your-repo-url>
````

2. Navigate to the project folder:

```bash
cd server
```

3. Install required dependencies:

```bash
npm install mysql2
npm install express sqlite3 body-parser multer
```

---

## Running the Server

Start the server using:

```bash
node app.js
```

The server will start and listen on the default port (usually 3000).

---

Perfect question 👍
You want your **README.md** to tell users how to configure the **database port** so it matches the port you’re using in `app.js`.

Here’s how you can add that section to your README:

---

## Database Configuration

````markdown


In your `app.js`, make sure the database connection is set up with the correct port number.  

For example, if you are using **MySQL**:

```js
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'yourdbname',
  port: 3306 // 👈 Change this if your MySQL runs on a different port
});
````

* The default MySQL port is **3306**.
* If your MySQL is running on another port (e.g., `3307`), update it here and in your `.env` file (if using environment variables).

---

If using **SQLite3**, you don’t need to set a port — it just uses a file as the database.

---

## Important Notes

* Always make sure the **port in `app.js`** matches the actual port your DB server is listening on.
* If unsure, check your MySQL port in `XAMPP → MySQL Config → my.ini` or run:

```bash
SHOW VARIABLES LIKE 'port';
```
## Accessing the Application

Once the server is running:

* Open your browser and go to:
  👉 [http://localhost:3000/login.html](http://localhost:3000/login.html)

This will take you to the **Admin Login page**.

---

