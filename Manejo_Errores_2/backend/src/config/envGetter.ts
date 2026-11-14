import 'dotenv/config';

const envGetter = () => {

    const getter = (valor: string) => {

        const valorEnv = process.env[valor];

        if (!valorEnv) {
            throw new Error("La variable de entorno no existe");
        }

        return valorEnv;
    }

    const DB_HOST = getter("DB_HOST");
    const DB_USER = getter("DB_USER");
    const DB_PASSWORD = getter("DB_PASSWORD");
    const DATABASE = getter("DB_DATABASE");
    const PORT = getter("PORT");
    const JWT_SECRET_KEY = getter("JWT_SECRET_KEY");

    return { DB_HOST, DB_USER, DB_PASSWORD, DATABASE, PORT, JWT_SECRET_KEY };

};

export default envGetter;
