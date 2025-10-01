import {Hono} from "hono";


const info = {
    username: "praz",
    email: "praz@gmail.com",
    password: "praz123"
};

const userRoute = new Hono();

userRoute.get("/", (c) => {
    return c.json({user: info})
})


export default userRoute;