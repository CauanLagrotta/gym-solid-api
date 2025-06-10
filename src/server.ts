import { app } from "./app";
import { env } from "./env";

app.listen({
  host: "0.0.0.0", // permite acesso ao frontend
  port: env.PORT,
}).then(() => {
    console.log("HTTP server running on http://localhost:3333")
})
