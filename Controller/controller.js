// const {User} = require("../models")
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { Op } = require("sequelize");
const {
  User,
  Trip,
  Profile,
  Destination,
  TripDestination,
} = require("../models");

// const destination = require("../models/destination");
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

      console.log(req.session.user);
      //   const {role} = req.session.user
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      if (!req.session.user) {
        let errorMessage = "you have to login first!";
        res.redirect(`/login?errors=${errorMessage}`);
      } else if (req.session.user.role === "admin") {
        res.redirect("/admin");
      } else {
        res.redirect("/home");
      }
      //   console.log(req.session.user);
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

      const profiles = await Profile.findOne({
        where: { UserId: id },
      });
      // console.log(profiles);
      res.render("home", { username, profiles, id });
    } catch (error) {
      res.send(error);
    }
  }

  static async showAdmin(req, res) {
    try {
      const { username, id } = req.session.user;

      const profiles = await Profile.findOne({
        where: { UserId: id },
      });
      // console.log(profiles);
      res.render("admin", { username, profiles, id });
    } catch (error) {
      res.send(error);
    }
  }

  static async managePage(req, res) {
    try {
      const { username, id } = req.session.user;
    //   const {idTrip} =req.params
      const profiles = await Profile.findOne({
        where: { UserId: id },
      });
      const trip = await Trip.findAll({
        include: [Destination],
      });
      res.render("manage", { username, id, profiles, trip });
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
      const { username, password, name, gender, age } = req.body;
      //   console.log(req.body);
      let newUser = await User.create({ username, password });
      await Profile.create({ name, gender, age, UserId: newUser.id });

      res.redirect("/login");
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        let inputErrors = error.errors.map((el) => {
          return el.message;
        });
        res.send(inputErrors);
        // res.send(error.
      } else {
        res.send(error);
      }
    }
  }

  static async showTrips(req, res) {
    try {
      // const profiles = await Profile.findAll()
      const { username, id } = req.session.user;

      const { search } = req.query;

      const option = {};
      option.include = Destination;

      if (search) {
        option.where = { name: { [Op.iLike]: `%${search}%` } };
      }

      option.order = [["name", "desc"]];
      const trip = await Trip.findAll(option);

      //   console.log(destination);

      const profiles = await Profile.findOne({
        where: { UserId: id },
      });
      //   console.log(trip);
      // console.log(req.session.user);
      res.render("trips", { username, id, profiles, trip });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async showProfile(req, res) {
    try {
      const { username, id } = req.session.user;
      const profiles = await Profile.findOne({
        where: { UserId: id },
      });
      res.render("profile", { username, id, profiles });
    } catch (error) {
      res.send(error);
    }
  }

  static async handleProfile(req, res) {
    try {
      const { id } = req.session.user;
      const { name, gender, age, profilePicture } = req.body;

      await Profile.update(
        { name, gender, age, profilePicture },
        {
          where: { UserId: id },
        }
      );

      res.redirect("/home");
      //   res.render("profile", { username, id, profiles });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async handleDelete(req,res) {
    try {
        const {id} = req.params
        await Trip.destroy({
            where : {id}
        })
        
        res.redirect('/admin/manage')
    } catch (error) {
        console.log(error);
        res.send(error);
    }
  }
}

module.exports = Controller;
