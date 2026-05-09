const Registration = require("../models/Registration");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

async function registerRoute(fastify) {
  fastify.post("/register", async (request, reply) => {
    const { fullName, email, password } = request.body || {};

    if (!fullName || !email || !password) {
      return reply.code(400).send({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return reply.code(400).send({ message: "Password must be at least 6 characters." });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await Registration.create({
        fullName,
        email,
        password: hashedPassword,
      });
      return reply.code(201).send({
        message: "Registration successful.",
        user: { id: user._id, fullName: user.fullName, email: user.email },
      });
    } catch (error) {
      if (error && error.code === 11000) {
        return reply.code(409).send({ message: "Email already exists." });
      }

      request.log.error(error);
      return reply.code(500).send({ message: "Something went wrong." });
    }
  });
}

module.exports = registerRoute;
