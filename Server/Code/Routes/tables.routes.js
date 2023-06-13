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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tablesRouter = void 0;
const table = __importStar(require("../Models/Table"));
const express = require('express');
const index_1 = require("../index");
exports.tablesRouter = express.Router();
//tablesRouter.use(express.json());
exports.tablesRouter.get("/", (req, res) => {
    table.getModel().find({}).sort({ number: 1 }).then((tables) => {
        res.status(200).json(tables);
    }).catch((err) => {
        res.status(500).send('DB error: ' + err);
    });
});
exports.tablesRouter.put("/:number", (req, res) => {
    var _a;
    const number = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.number;
    table.getModel().findOneAndUpdate({ number: number }, { isFree: false }, { new: true }).then((table) => {
        notify();
        res.status(200).send("Ok, table occupied: " + table);
    }).catch((err) => {
        res.status(500).send('DB error: ' + err);
    });
});
function notify() {
    let m = 'Hello';
    index_1.ios.emit('tables', m);
}
