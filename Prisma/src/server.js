import 'dotenv/config'
import app from "./app.js";

app.listen(9000, () => {
  console.log("Server running on port 9000");
})