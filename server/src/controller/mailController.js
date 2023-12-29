const nodemailer = require("nodemailer");

// const adminEmail = "dangcapmaimaichico1xm@gmail.com";

const sendMail = async (req, res) => {
  const { fullName, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hiendb.uet@gmail.com",
      pass: "bpxnhcopbscdnarl",
    },
  });

  try {
    // Tạo nội dung email
    const mailOptions = {
      from: "hiendb.uet@gmail.com",
      to: `${email}`,
      subject: "New Message from Contact Form",
      text: `Full Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);

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

module.exports = {
  sendMail,
};
