const bcrypt = require("bcrypt");
const crypto = require("crypto");
const dbPool = require("./dbPool");
require("dotenv").config();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

// get Users Table
const getusers = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    const userId = decoded.userId;

    if (!dbPool)
      return res
        .status(500)
        .json({ error: "Database connection is not established" });

    const selectQuery = "SELECT * from users where user_id = ?";
    const [users] = await dbPool.query(selectQuery, [userId]);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    if (error.name === "JsonWebTokenError") {
      console.error("Error fetching users:", error);
      return res.status(401).json({ error: "Invalid token signature" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//--------------------------------------------------------------------------------------------------------------------

// Insert user into table
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!dbPool) {
      return res
        .status(500)
        .json({ error: "Database connection is not established" });
    }
    if (email === "" || password === "") {
      return res
        .status(401)
        .json({ message: "All the details should be provided" });
    } else {
      const [userExists] = await dbPool.query(
        `SELECT * FROM users WHERE email = ?`,
        [email]
      );

      if (userExists.length === 0) {
        const hashedPass = await bcrypt.hash(password, 10);
        const datenow = new Date();
        const formattedDate = `${datenow.getFullYear()}-${
          datenow.getMonth() + 1
        }-${datenow.getDate()} ${datenow.getHours()}:${datenow.getMinutes()}:${datenow.getSeconds()}`;

        // Insert into users
        const insertQuery = `
          INSERT INTO users (email, password, created_date)
          VALUES (?, ?, ?);
        `;
        const [userResponse] = await dbPool.query(insertQuery, [
          email,
          hashedPass,
          formattedDate,
        ]);
        // res.status(200).json({ message: "User registered successfully" });

        if (!userResponse) {
          console.error("issue in storing in investment: ");
        }
        const newUserId = userResponse.insertId;
        
        res.status(200).json({ message: "User registered successfully" });
      } else {
        res.status(400).json({ message: "User already Exists, Please Login!" });
      }
    }
  } catch (error) {
    console.error("🚀 ~ createUser ~ error:", error)
    // console.error("🚀 ~ createUser ~ error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

//--------------------------------------------------------------------------------------------------------------------

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email)
      return res.status(400).json({ message: "Please enter Email Address" });
    if (!password)
      return res.status(400).json({ message: "Please enter Password" });

    const isRegUser = `SELECT * FROM users WHERE email = ?;`;
    const [user] = await dbPool.query(isRegUser, [email]);
    if (user.length === 0) {
      return res.status(404).json({ message: "Invalid User. Please SignUp!" });
    }

    const compare = await bcrypt.compare(password, user[0].password);
    if (!compare) {
      return res
        .status(401)
        .json({ message: "Incorrect Password. Please try again!" });
    }

    const payload = {
      userId: user[0].user_id,
      name: user[0].name,
      email: user[0].email,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });

    return res
      .status(200)
      .json({ jwtToken: token, username: user[0].name });
  } catch (error) {
    console.error("Error in /user/signin:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};


module.exports={
    getusers, createUser, userSignin
}