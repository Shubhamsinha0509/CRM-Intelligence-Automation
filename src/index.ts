import { app } from "./app.js";
import { config } from "./config.js";

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
