import * as NetworkCore from '../src/networking/NetworkCore.mjs';
import * as Utils from '../src/util/Util.mjs';
import * as Logger from '../src/util/Logger.mjs';

async function startApp() {
  await NetworkCore.startServer(3001);
}

try {
    Logger.verbose(Utils.getConfigParam("TEST_VAL"));

} catch (e) {
    Logger.error(e);
}

startApp();
