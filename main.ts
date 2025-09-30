import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello World"));

Deno.serve({
  port: 8080,
  handler: app.fetch,
  onListen: () => {
    console.log("Server is running on port 8080");
  },  
});
