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
const user = __importStar(require("../Models/User"));
const express = require('express');
const index_1 = require("../index");
exports.tablesRouter = express.Router();
//tablesRouter.use(express.json());
exports.tablesRouter.get("/", (req, res) => {
    if (!req.params) {
        table.getModel().find({}).sort({ number: 1 }).then((tables) => {
            res.status(200).json(tables);
        }).catch((err) => {
            res.status(500).send('DB error: ' + err);
        });
    }
    else {
        const usermail = req.params.email;
        user.getModel().findOne({ email: usermail }).then((user) => {
            if (user) {
                table.getModel().find({ waiter: user._id }).sort({ number: 1 }).then((tables) => {
                    res.status(200).json(tables);
                });
            }
            else {
                res.status(404).send(`Failed to find the user`);
            }
        }).catch((err) => {
            res.status(500).send('DB error: ' + err);
        });
        table.getModel().find({}).sort({ number: 1 }).then((tables) => {
            res.status(200).json(tables);
        }).catch((err) => {
            res.status(500).send('DB error: ' + err);
        });
    }
});
exports.tablesRouter.put("/:number", (req, res) => {
    const usermail = req.params.email;
    user.getModel().findOne({ email: usermail }).then((user) => {
        if (user) {
            const filter = {
                number: req.params.number
            };
            let update = {};
            if (req.params.action == 'occupy')
                update = {
                    isFree: false,
                    waiter: user._id
                };
            else if (req.params.action == 'free')
                update = {
                    isFree: true,
                    waiter: null
                };
            table.getModel().findOneAndUpdate(filter, update, { new: true }).then((table) => {
                notify();
                res.status(200).send("Ok, table occupied: " + table);
            }).catch((err) => {
                res.status(500).send('DB error: ' + err);
            });
        }
    });
});
function notify() {
    let m = 'Hello';
    index_1.ios.emit('tables', m);
}
