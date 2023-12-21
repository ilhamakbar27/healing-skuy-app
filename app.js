const express = require("express");
const Controller = require("./controller/controller");
const app = express();
const port = 3000;
const session = require("express-session");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(session({
    secret :'rahasialuu',
    resave : false,
    saveUninitialized: true
}))


function isAuthenticated(req, res, next) {
    if (req.session.user) {
        //jika user benar mengisi saat login maka akan diarahkan ke next page(home)
      next();
    } else {
      res.redirect("/login"); // User tidak benar saat login, redirect to the login page
    }
  }

app.get("/", Controller.showLogin);
app.get("/login", Controller.showLogin);
app.post("/login", Controller.handleLogin);
app.get("/home",isAuthenticated ,Controller.showHome );
app.get("/logout", Controller.logout);
app.get("/register", Controller.showRegister)
app.post("/register",Controller.handleRegister )
app.get("/trips",isAuthenticated, Controller.showTrips)
app.get("/profile/:id", Controller.showProfile)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

