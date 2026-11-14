import app from "./app.js";
import envGetter from "./config/envGetter.js";

const { PORT } = envGetter();

app.listen(PORT, () => {
    console.log(`Backend escuchando por el puerto http://localhost:${PORT}`);
})