import db from '../models/db.js';
import Transaction from '../models/TransactionModel.js';

import express from 'express';

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {
        console.log('getIndex');
        db.findMany(Transaction,{},{name:1,amount:1,refno:1,_id:0},(result)=>{
            if(result){
                //console.log(result);
                res.render('index',{
                    transactions: result,
                    helpers:{
                        name(obj){
                            var raw_name = JSON.stringify(obj.name);
                            return raw_name.substring(1,raw_name.lastIndexOf('\"'));
                        },
                        refno(obj){
                            return JSON.stringify(obj.refno);
                        },
                        amount(obj){
                            return Number(JSON.stringify(obj.amount)).toFixed(2);
                        },
                    }
                });
            }else{
                console.error('Error retrieving data from database');
            }
        });
    },

    getCheckRefNo: function(req, res) {
        console.log('getCheckRefNo');
        var refno = JSON.parse(String(req.headers['data']))['refno'];
        db.findOne(Transaction,{refno: Number(refno)},{refno:1},(result)=>{
            if(result){
                res.json({exists:true});
            }else{
                res.json({exists:false});
            }
        })
    },

    getAdd: function(req, res) {
        console.log('getAdd');
        var transaction = JSON.parse(String(req.headers['data']));
        db.insertOne(Transaction, transaction, (success)=>{
            if(!success){
                res.sendStatus(500);
            }else{
                res.json(transaction);
            }   
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the transaction
            from the database, then removes the transaction from the list of
            transactions in `index.hbs`.
    */
    getDelete: function (req, res) {
        var target = Number(JSON.parse(String(req.headers['data']))['refno']);
        db.deleteOne(Transaction, {refno:target},(success)=>{
            if(success){
                res.sendStatus(200);
            }else{
                res.sendStatus(500);
            }
        });
        
    }

}

export default controller;