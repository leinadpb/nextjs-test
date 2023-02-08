import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";

export const main = async () => {
  const admin = await db.user.upsert({
    where: { email: "admin@danielpb.com" },
    update: {},
    create: {
      firstName: "Business",
      lastName: "Warrior",
      email: "admin@danielpb.com",
      password: await hashPassword("password"),
    },
  });

  console.log({ admin });
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
