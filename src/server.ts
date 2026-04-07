import app from "./app.js";

const PORT: string = process.env.PORT as string;

app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});