import * as NetworkCore from "../src/networking/NetworkCore.mjs";

async function startApp() {
  await NetworkCore.startServer(3001);
}

startApp();
