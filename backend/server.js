const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const mongoose = require("mongoose");
const registerRoute = require("./routes/registerRoute");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/registration_app";

async function buildServer() {
  await fastify.register(cors, {
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      const allowedOrigins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
      ];

      const isRenderOrigin = origin.endsWith(".onrender.com");
      if (allowedOrigins.includes(origin) || isRenderOrigin) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"), false);
    },
    methods: ["GET", "POST"],
  });

  fastify.get("/api/health", async () => ({ ok: true }));
  await fastify.register(registerRoute, { prefix: "/api" });

  try {
    await mongoose.connect(MONGODB_URI);
    fastify.log.info("Connected to MongoDB");
    await fastify.listen({ port: Number(PORT), host: "0.0.0.0" });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

buildServer();
