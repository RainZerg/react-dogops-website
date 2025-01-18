import Fastify from "fastify";
import FastifyVite from "@fastify/vite";
import products from "./client/src/products.json" with {type: "json"};
import fastifyCors from "@fastify/cors";

const server = Fastify();

server.register(fastifyCors, {
  origin:"http://localhost:3002",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

await server.register(FastifyVite, {
  root: import.meta.url,
  dev: process.argv.includes("--dev"),
  spa: true,
  middlewareMode: true,
  base: "/",
  appPath: './client',
});

server.get("/api/products", async (request, reply) => {
  const { selectedCategory } = request.query;

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

  reply.send(filteredProducts);
});

await server.vite.ready();
await server.listen({ port: 3000 });
