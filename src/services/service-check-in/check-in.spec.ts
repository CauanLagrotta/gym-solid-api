import { expect, describe, it, beforeEach, vi, afterAll } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { CheckInService } from "./check-in.service";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym.repository";
import { Decimal } from "generated/prisma/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService; // sut = system under test

describe("CheckIn Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should be able to checkIn", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be able to checkIn twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)); // 2022-01(jan)-20 08:00:00z

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to checkIn twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)); // 2022-01(jan)-20 08:00:00z

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0)); // 2022-01(jan)-20 08:00:00z

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
