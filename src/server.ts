import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";


const PORT = config.PORT;
async function main() {

    try {
        await prisma.$connect();
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log("Server running on port ", PORT);
        });

    } catch (error) {
        console.log("Error starting server", error);
        await prisma.$disconnect();
        process.exit(1);
    }

}

main();