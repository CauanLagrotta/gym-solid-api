import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { AuthenticateService } from "./authenticate.service";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService; // sut = system under test

describe("Auth Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    // running the test without create an user

    await expect(() =>
      sut.execute({
        email: "wrongemail@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
