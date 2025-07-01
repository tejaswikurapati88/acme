const express= require('express')
const cors= require('cors')
const userauthenticationRouter= require('./Routers/userAuthenticationRoute')
const bodyParser = require("body-parser");
const app = express()

// Middleware
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS policy: Not allowed"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(express.json());

// Handle preflight requests
//app.options("/*", cors());

// Error-handling middleware for JSON parse errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON payload:", err.message);
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  next();
});


//Routers

app.use("/users", userauthenticationRouter);


const connectAndStartServer = async () => {
  try {
    console.info("Connected to the database!");
    const PORT = 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error While Connecting:", err);
    process.exit(1);
  }
};

connectAndStartServer()