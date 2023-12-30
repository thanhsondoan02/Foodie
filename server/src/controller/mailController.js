import {
  addContact,
  getContactList,
  getContactByPagination,
} from "../service/contactService";
// import db from "../models/index";

const nodemailer = require("nodemailer");

// const adminEmail = "dangcapmaimaichico1xm@gmail.com";

const sendMail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hiendb.uet@gmail.com",
      pass: "bpxnhcopbscdnarl",
    },
  });

  try {
    // Lấy danh sách các địa chỉ email từ model Contact
    const contacts = await getContactList();
    const emailList = contacts.DT.map((contact) => contact.email);

    const { messageBody } = req.body;

    // Gửi email cho từng địa chỉ email trong danh sách
    for (const email of emailList) {
      const mailOptions = {
        from: "hiendb.uet@gmail.com",
        to: `${email}`,
        subject: "New Message from Contact Form",
        html: messageBody,
      };

      await transporter.sendMail(mailOptions);
    }

    // Gửi phản hồi thành công
    return res.status(200).json({
      EM: "Email sent successfully",
      EC: 0, // -1 -> error, 0 -> success,
      DT: "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

const contactEmailOfUser = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    let data = await addContact(fullName, email, message);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // -1 -> error, 0 -> success,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

const getAllContact = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await getContactByPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // -1 -> error, 0 -> success,
        DT: data.DT,
      });
    } else {
      let data = await getContactList();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // -1 -> error, 0 -> success,
        DT: data.DT,
      });
    }
  } catch (e) {
    return res.status(500).json({
      EM: "Error From Server",
      EC: "-1", // -1 -> error, 0 -> success,
      DT: "",
    });
  }
};

module.exports = {
  sendMail,
  contactEmailOfUser,
  getAllContact,
};
