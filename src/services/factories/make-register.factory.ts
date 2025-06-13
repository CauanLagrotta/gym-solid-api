import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository";
import { RegisterService } from "../register-service/register.service";

export function makeRegisterFactory() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerService = new RegisterService(prismaUsersRepository);

  return registerService;
}
