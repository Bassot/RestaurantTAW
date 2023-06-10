"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tablesRouter = void 0;
const table = __importStar(require("../Models/Table"));
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
exports.tablesRouter = express.Router();
//tablesRouter.use(express.json());
exports.tablesRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tables = yield table.getModel().find({});
        res.status(200).send(JSON.stringify(tables));
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.tablesRouter.put("/:number", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const number = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.number;
    try {
        yield table.getModel().findOneAndUpdate({ number: number }, { isFree: false });
        res.status(200).send("Ok, table occupied");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
