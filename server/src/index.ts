import {Hono} from "hono";
import {serve} from '@hono/node-server';
import {logger} from 'hono/logger'
import user from "./routes/user.ts";
import {dbConnect} from "./lib/db-connect.ts";
import {env} from "./config/env.ts";
import {HTTP_STATUS} from "./config/http-status.ts";

const app = new Hono();
app.use(logger());
app.use("*", async (c, next) => {
    try {
        return await next();
    } catch (error) {
        console.log("Error", error);
        const message = error instanceof Error ? error.message : "Something went wrong";
        return c.json({ success: false, message }, HTTP_STATUS.BadRequest)
    }
});

app.get("/", (c) => {
    return c.json({message: "Welcome to social next"});
})

app.get("/health", (c) => {
    return c.json({success: true})
});

// Routes
app.route("/user", user);


dbConnect()
    .then(() => {
        console.info(`Server running on http://localhost:${env.PORT}`)
        serve({
            fetch: app.fetch,
            port: Number(env.PORT)
        });
    })