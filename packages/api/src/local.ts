import { app } from "./server";
import http from "http";

const httpServer = http.createServer(app);

new Promise<void>((resolve) => httpServer.listen({ port: 9000 }, resolve));
