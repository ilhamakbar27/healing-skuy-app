// const {User} = require("../models")
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { User } = require("../models");

class Controller {
  static async showLogin(req, res) {
    try {


      res.render("login");
    } catch (error) {
      res.send(error);
    }
  }
  static async handleLogin(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: { username: username },
      });

      if (!user) {
        return res.redirect("/login");
      }

      const findUser = await bcrypt.compare(password, user.password);

      if (!findUser) {
        return res.redirect("/login");
      }

      req.session.user = {
        id: user.id,
        username: user.username,
        password: user.password,
      };

      res.redirect("/home");
      //   res.redirect()
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async logout(req,res) {
    try {
        await req.session.destroy()
        res.redirect("/login")
    } catch (error) {
        res.send(error);
    }
  }

  static async showHome(req, res) {
    try {
    const {username} = req.session.user
        // console.log(req.session.user);
      res.render("home" , {username});
    } catch (error) {
      res.send(error);
    }
  }

  static async showRegister(req, res) {
    try {
      res.render("register");
    } catch (error) {
      res.send(error);
    }
  }

  static async showTrips(req, res) {
    try {
    const {username} = req.session.user
        // console.log(req.session.user);
      res.render("trips" , {username});
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
