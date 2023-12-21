// const {User} = require("../models")
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { User, Trip } = require("../models");

class Controller {
  static async showLogin(req, res) {
    try {
      const { errors } = req.query;
      res.render("login", { errors });
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

      let inputErrors = "username or password not correct!";

      if (!user) {
        return res.redirect(`/login?errors=${inputErrors}`);
      }

      const findUser = await bcrypt.compare(password, user.password);
      if (!findUser) {
        return res.redirect(`/login?errors=${inputErrors}`);
      }

      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      console.log(req.session.user);
      res.redirect("/home");
      //   res.redirect()
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async logout(req, res) {
    try {
      await req.session.destroy();
      res.redirect("/login");
    } catch (error) {
      res.send(error);
    }
  }

  static async showHome(req, res) {
    try {
      const { username, id } = req.session.user;
      res.render("home", { username, id });
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

  static async handleRegister(req, res) {
    try {
      const { username, password } = req.body;
      await User.create({ username, password });
      res.redirect("/login");
    } catch (error) {
      res.send(error);
    }
  }

  static async showTrips(req, res) {
    try {
      const trip = await Trip.findAll();
      const { username, id } = req.session.user;

      //   console.log(trip);
      // console.log(req.session.user);
      res.render("trips", { username, id, trip });
    } catch (error) {
      res.send(error);
    }
  }

  static async showProfile(req, res) {
    try {
      const { username, id } = req.session.user;
      // //  const {id} = req.session.user
      //     console.log(req.session.user);
      res.render("profile", { username, id });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
