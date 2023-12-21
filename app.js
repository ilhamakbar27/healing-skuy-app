const express = require("express");
const Controller = require("./controller/controller");
const app = express();
const port = 3000;
const session = require("express-session");
const { rateLimit } = require('express-rate-limit');



const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Too many requests from this IP, please try again for 1 minutes.",
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.
// app.use(limiter)

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(session({
    secret :'rahasialuu',
    resave : false,
    saveUninitialized: true
}))
app.use(limiter)



function isAuthenticated(req, res, next) {
    if (req.session.user) {
        //jika user benar mengisi saat login maka akan diarahkan ke next page(home)
      next();
    } else {
      res.redirect("/login"); // User tidak benar saat login, redirect to the login page
    }
  }


function isAdmin(req, res, next) {
    if (req.session.user?.role === 'admin') {
      next();
    } else {
      res.redirect("/home"); // User tidak benar saat login, redirect to the login page
    }
  }


app.get("/", Controller.showLogin);
app.get("/login", Controller.showLogin);
app.post("/login",limiter, Controller.handleLogin);
app.get("/home",isAuthenticated ,Controller.showHome );
app.get("/logout", Controller.logout);
app.get("/register", Controller.showRegister)
app.post("/register",limiter,Controller.handleRegister )
app.get("/trips",isAuthenticated, Controller.showTrips)
app.get("/admin",isAdmin ,Controller.showAdmin)
app.get("/admin/manage",isAdmin, Controller.managePage)
app.get("/profile/:id", Controller.showProfile)
app.post("/profile/:id", Controller.handleProfile)
app.get('/admin/manage/:id/delete', Controller.handleDelete)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

