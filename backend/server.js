import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
