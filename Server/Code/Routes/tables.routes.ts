import * as table from "../Models/Table";
import * as user from "../Models/User";

const express = require('express');
import {ios} from '../index';

export const tablesRouter = express.Router();
//tablesRouter.use(express.json());
tablesRouter.get("/", (req, res) => {
    if(!req.params) {
        table.getModel().find({}).sort({number: 1}).then((tables) => {
            res.status(200).json(tables);
        }).catch((err) => {
            res.status(500).send('DB error: ' + err);
        });
    }
    else{
        const usermail = req.params.email;
        user.getModel().findOne({email: usermail}).then((user) => {
            if(user) {
                table.getModel().find({waiter: user._id}).sort({number: 1}).then((tables) => {
                    res.status(200).json(tables);
                });
            }
            else{
                res.status(404).send(`Failed to find the user`);
            }
        }).catch((err) => {
            res.status(500).send('DB error: ' + err);
        });



        table.getModel().find({}).sort({number: 1}).then((tables) => {
            res.status(200).json(tables);
        }).catch((err) => {
            res.status(500).send('DB error: ' + err);
        });
    }
});


tablesRouter.put("/:number", (req, res) => {
    const usermail = req.params.email;
    user.getModel().findOne({email: usermail}).then((user) => {
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
            table.getModel().findOneAndUpdate(filter, update, {new: true}).then((table) => {
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
    ios.emit('tables', m);
}







