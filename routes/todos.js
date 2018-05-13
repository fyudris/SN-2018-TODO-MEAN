var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

// DATA BASE
// var dbURL = 'mongodb://fyudris:oreo@ds125489.mlab.com:25489/mytasklist_db';
var dbURL = 'mongodb://fyudris:oreo@ds123124.mlab.com:23124/todolist_db';
var db = mongojs(dbURL, ['todos']);

// GET ALL TODOS
router.get('/todos', function (req, res, next) {
    db.todos.find(function (err, todos) {
        if(err){
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});


// GET SINGLE TODOS
router.get('/todos/:id', function (req, res, next) {
    db.todos.findOne({_id: mongojs.ObjectId(req.params.id)},function (err, todos) {
        if(err){
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});


// SAVE A NEW TODO
router.post('/todo', function (req, res, next) {
    var todo = req. body;
    // if(!todo.text || !(todo.isCompleted + '')){
    //     res.status(400);
    //     res.json({"error": "Invalid Data in save"});
    // }
    //  else {
        db.todos.save(todo, function (err, result) {
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    // }
});


// UPDATE A TODO
router.put('/todo/:id', function (req, res, next) {
    var todo = req. body;
    var updatedObj = {};

    if(todo.isCompleted){
        updatedObj.isCompleted = todo.isCompleted;
    }

    if(todo.text){
        updatedObj.text = todo.text;
    }

    if(!updatedObj){
        res.status(400);
        res.json({"error": "Invalid Data"});
    } else {
        db.todos.update({_id: mongojs.ObjectId(req.params.id)}, updatedObj, {}, function (err, result) {
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }

});


// DELETE A TODO
router.delete('/todo/:id', function (req, res, next) {
    db.todos.remove({_id: mongojs.ObjectId(req.params.id)}, '', function (err, result) {
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });

});


module.exports = router;
