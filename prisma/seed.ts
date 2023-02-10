import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";

export const main = async () => {
  const admin = await db.user.upsert({
    where: { email: "admin@sample.com" },
    update: {},
    create: {
      firstName: "Daniel",
      lastName: "Pena",
      email: "admin@sample.com",
      password: await hashPassword("password"),
    },
  });

  const mirzaApp = await db.app.upsert({
    where: { name: "MIRZA" },
    update: {},
    create: {
      name: "MIRZA",
      mainUrl: "http://localhost:9090/api/kpi",
      apiKey: "some-secure-api-key",
    },
  });
  const payplanApp = await db.app.upsert({
    where: { name: "PAYPLAN" },
    update: {},
    create: {
      name: "PAYPLAN",
      mainUrl: "http://localhost:9090/api/kpi",
      apiKey: "some-secure-api-key",
    },
  });

  const kpis = [];
  const totalUsersKpi = await db.kpi.upsert({
    where: { name_appName: { name: "TOTAL_USERS", appName: "MIRZA" } },
    update: {},
    create: {
      name: "TOTAL_USERS",
      desc: "Total users",
      appName: "MIRZA",
      value: "0",
      type: "NUMBER",
    },
  });
  kpis.push(totalUsersKpi);
  const totalLoans = await db.kpi.upsert({
    where: { name_appName: { name: "TOTAL_LOANS", appName: "MIRZA" } },
    update: {},
    create: {
      name: "TOTAL_LOANS",
      desc: "Total loans",
      appName: "MIRZA",
      value: "0",
      type: "NUMBER",
    },
  });
  kpis.push(totalLoans);
  const totalUsersWithLoanKpi = await db.kpi.upsert({
    where: {
      name_appName: { name: "TOTAL_USER_WITH_LOANS", appName: "MIRZA" },
    },
    update: {},
    create: {
      name: "TOTAL_USER_WITH_LOANS",
      desc: "Total Users with a loan",
      appName: "MIRZA",
      value: "0",
      type: "NUMBER",
    },
  });
  kpis.push(totalUsersWithLoanKpi);
  const totalSyncteraCallsKpi = await db.kpi.upsert({
    where: { name_appName: { name: "TOTAL_SYNCTERA_CALLS", appName: "MIRZA" } },
    update: {},
    create: {
      name: "TOTAL_SYNCTERA_CALLS",
      desc: "Total Synctera requests",
      appName: "MIRZA",
      value: "0",
      type: "NUMBER",
    },
  });
  kpis.push(totalSyncteraCallsKpi);
  const totalCompaniesKpi = await db.kpi.upsert({
    where: { name_appName: { name: "TOTAL_COMPANIES", appName: "MIRZA" } },
    update: {},
    create: {
      name: "TOTAL_COMPANIES",
      desc: "Total companies",
      appName: "MIRZA",
      value: "0",
      type: "NUMBER",
    },
  });
  kpis.push(totalCompaniesKpi);
  const totalArgyleCallsKpi = await db.kpi.upsert({
    where: { name_appName: { name: "TOTAL_ARGYLE_CALLS", appName: "MIRZA" } },
    update: {},
    create: {
      name: "TOTAL_ARGYLE_CALLS",
      desc: "Total argyle requests",
      appName: "MIRZA",
      value: "0",
      type: "NUMBER",
    },
  });
  kpis.push(totalArgyleCallsKpi);
  const totalServerMemory = await db.kpi.upsert({
    where: { name_appName: { name: "TOTAL_SERVER_MEMORY", appName: "MIRZA" } },
    update: {},
    create: {
      name: "TOTAL_SERVER_MEMORY",
      desc: "Total server memory (mb)",
      appName: "MIRZA",
      value: "0",
      type: "MB",
    },
  });
  kpis.push(totalServerMemory);
  const totalServerAvailMemoryKpi = await db.kpi.upsert({
    where: {
      name_appName: { name: "TOTAL_SERVER_AVAIL_MEMORY", appName: "MIRZA" },
    },
    update: {},
    create: {
      name: "TOTAL_SERVER_AVAIL_MEMORY",
      desc: "Total server available memory (mb)",
      appName: "MIRZA",
      value: "0",
      type: "MB",
    },
  });
  kpis.push(totalServerAvailMemoryKpi);
  const totalLoanAmountKpi = await db.kpi.upsert({
    where: { name_appName: { name: "TOTAL_LOAN_AMOUNT", appName: "MIRZA" } },
    update: {},
    create: {
      name: "TOTAL_LOAN_AMOUNT",
      desc: "Total loan amount",
      appName: "MIRZA",
      value: "0",
      type: "CURRENCY",
    },
  });
  kpis.push(totalLoanAmountKpi);

  console.log({ admin, mirzaApp, payplanApp, kpis });
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
