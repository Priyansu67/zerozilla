const Agency = require("../model/agency");
const Client = require("../model/client");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const create = async (req, res) => {
  try {
    if (req.body.agencyId) {
      const agencyData = await Agency.findOrCreate(
        {
          agencyId: req.body.agencyId,
        },
        {
          agencyId: req.body.agencyId,
          name: req.body.agencyname,
          address1: req.body.address1,
          address2: req.body.address2,
          state: req.body.state,
          city: req.body.city,
          phone: req.body.phone,
        }
      );
      if (req.body.clientId) {
        const clientData = await Client.findOrCreate(
          {
            clientId: req.body.clientId,
          },
          {
            clientId: req.body.clientId,
            agencyId: req.body.agencyId,
            name: req.body.clientname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            totalBill: req.body.totalBill,
          }
        );
        res.status(201).json({ agencyData, clientData });
      } else {
        res.status(201).json({ agencyData });
      }
    } else {
      res.status(400).json({ message: "Agency ID is required" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const client = await Client.findOne({ clientId: req.params.clientId });
    if (client == null) {
      return res.status(404).json({ message: "Cannot find client" });
    }
    if (req.body.name != null) {
      client.name = req.body.name;
    }
    if (req.body.email != null) {
      client.email = req.body.email;
    }
    if (req.body.phoneNumber != null) {
      client.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.totalBill != null) {
      client.totalBill = req.body.totalBill;
    }
    const updatedClient = await client.save();
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const topClient = async (req, res) => {
  try {
    const clients = await Client.find().sort({ totalBill: -1 });
    const agency = await Agency.find({ agencyId: clients[0].agencyId });
    res.status(200).json({
      AgencyName: agency[0].name,
      ClientName: clients[0].name,
      TotalBill: clients[0].totalBill,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    const user = {
      username: "admin",
      password: "password",
    };
    const token = generateToken(user);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, process.env.SecretKey, options);
};

module.exports = {
  create,
  update,
  topClient,
  login,
};
