import { authenticateController } from "./controllers/authenticate.controller";
import { registerController } from "./controllers/register.controller";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
}
