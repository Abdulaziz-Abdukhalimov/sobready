import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_UR as string, {})
  .then((data) => {
    console.log("MongoDb connection succeed");
    const PORT = process.env.PORT ?? 3004;
    app.listen(PORT, function () {
      console.info(`The server is running successfully on PORT: ${PORT}`);
      console.info(
        `Admin project running successfully on http://localhost:${PORT}/admin`
      );
    });
  })
  .catch((err) => console.log("Error on mongodb connection"));
