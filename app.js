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

app.get("/", Controller.showLogin);
app.get("/login", Controller.showLogin);
app.post("/login", Controller.handleLogin);
app.get("/home", Controller.showHome);
app.get("/logout", Controller.logout);
app.get("/register", Controller.showRegister)
app.get("/trips", Controller.showTrips)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

