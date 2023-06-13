import * as table from "../Models/Table";
import {expressjwt as jwt} from "express-jwt";
const dotenv = require('dotenv').config();
const express = require('express');

/*
if (dotenv.error) {
    console.log("Unable to load \".env\" file. Please provide one to store the JWT secret key".red);
    process.exit(-1);
} else if (!process.env.JWT_SECRET) {
    console.log("\".env\" file loaded but JWT_SECRET=<secret> key-value pair was not found".red);
    process.exit(-1);
}

/*
userRouter.use(function (req: any, res) {
    if (!req.auth.isadmin) return res.sendStatus(401);
    res.sendStatus(200);
});
 */
export const tablesRouter = express.Router();
//tablesRouter.use(express.json());
tablesRouter.get("/", async (req, res) => {
    try {
        let tables = await table.getModel().find({}).sort({number: 1});
        res.status(200).send(JSON.stringify(tables));
    }
    catch (error :any) {
        res.status(500).send(error.message);
    }
});


tablesRouter.put("/:number", async (req, res) => {
    const number = req?.params?.number;
    try {
        await table.getModel().findOneAndUpdate({number: number}, {isFree: false});
        res.status(200).send("Ok, table occupied");
    }
    catch (error :any) {
        res.status(500).send(error.message);
    }
});







