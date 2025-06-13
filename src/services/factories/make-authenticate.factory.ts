import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository";
import { AuthenticateService } from "../authenticate-service/authenticate.service";

export function makeAuthenticateFactory() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(prismaUsersRepository);

  return authenticateService;
}
