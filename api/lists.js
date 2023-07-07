const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const ListModel = require('../models/ListModel');
const { appendFileSync } = require('fs');
const uuid = require("uuid").v4;

router.post("/", authMiddleware, async(req, res) => {
    const { text, url } = req.body;
    if (text.length < 1) {
        return res.status(401).send("Text must be atleast 1 character");
    }


    try {
        const newList = {
            user: req.userId,
            text,
            url
        };

        const list = await new ListModel(newList).save();
        return res.json(list);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error`);
    }
});

router.get("/", authMiddleware, async(req, res) => {
    const { pageNumber } = req.query;

    const number = Number(pageNumber);
    const size = 8;

    const { userId } = req;
    try {
        let lists;

        if (number === 1) {
            lists = await ListModel.find({ user: userId })
                .limit(size)
                .sort({ createdAt: -1 })
                .populate("user")
                .populate("todo.user");
        }
        //
        else {
            const skips = size * (number - 1);
            lists = await ListModel.find({ user: userId.username })
                .skip(skips)
                .limit(size)
                .sort({ createdAt: -1 })
                .populate("user")
                .populate("todo.user");
        }

        return res.json(lists);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error`);
    }
});


router.get("/:listId", authMiddleware, async(req, res) => {
    try {
        const list = await ListModel.findById(req.params.listId)
            .populate("user")
            .populate("todo.user");

        if (!list) {
            return res.status(404).send("List not found");
        }

        return res.json(list);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error`);
    }
});


router.get("/todo/:username", authMiddleware, async(req, res) => {
    try {
        const { username } = req.params;

        const user = await UserModel.findOne({ username: username.toLowerCase() });
        if (!user) {
            return res.status(404).send("No User Found");
        }
        const list = await ListModel.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate("user")
            .populate("todo.user");

        return res.json(list);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error`);
    }
});


router.post('/update/:listId', authMiddleware, async(req, res) => {

    try {
        const { listId } = req.params;


        const { text } = req.body;
        console.log(text);
        console.log(text);

        const listData = await ListModel.findById(listId);

        listData.text = await text;
        await listData.save();

        return res.status(200).send("Success");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
});

router.delete('/:listId', authMiddleware, async(req, res) => {
    try {
        const { listId } = req.params;
        const { userId } = req;

        await ListModel.findByIdAndDelete(listId);
        return res.status(200).send("Success");
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error`);
    }

});

router.post('/todo/:listId', authMiddleware, async(req, res) => {
    try {
        const { listId } = req.params;
        const { userId } = req;
        const { text } = req.body;

        if (text.length < 1)
            return res.status(401).send("Text must be atleast 1 character");

        const list = await ListModel.findById(listId);

        if (!list) return res.status(404).send("List not found");

        const newTodo = {
            _id: uuid(),
            text,
            user: userId,
            date: Date.now()
        };

        list.todo.unshift(newTodo);
        await list.save();

        return res.status(200).json(newTodo._id);
    } catch (err) {
        console.error(error);
        return res.status(500).send(`Server error`);
    }
});

router.get('/todo/:listId', authMiddleware, async(req, res) => {
    try {
        const { listId } = req.params;
        const { userId } = req;

        const list = await ListModel.findById(listId)
            .sort({ createdAt: -1 })
            .populate("user")
            .populate("todo.user");

        return res.json(list);
    } catch (err) {
        console.log(err);
    }
})

router.post('/update/:listId/:todoId', authMiddleware, async(req, res) => {

    try {
        // const { listId } = list;

        const { listId, todoId } = req.params;


        const { text } = req.body;
        console.log(text);

        const list = await ListModel.findById(listId)
        const index = list.todo.findIndex(todo => todo._id === todoId);

        const todo = list.todo[index];

        todo.text = await text;
        await list.save();

        return res.status(200).send("Success");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
});

router.delete('/todo/:listId/:todoId', authMiddleware, async(req, res) => {
    try {
        const { listId, todoId } = req.params;
        const { userId } = req;

        const list = await ListModel.findById(listId);
        if (!list) return res.status(404).send("List not found");
        const index = list.todo.findIndex(todo => todo._id === todoId);
        if (index === -1) {
            return res.status(404).send("No Todo found");
        }

        const todo = list.todo[index];

        const deleteComment = async() => {
            list.todo.splice(index, 1);

            await list.save();

            return res.status(200).send("Deleted Successfully");
        };

        // if (todo.user.toString() !== userId) {
        //     const user = await UserModel.findById(userId);
        //     if (user.role === "root") {
        //         await deleteComment();
        //     } else {
        //         return res.status(401).send("Unauthorized");
        //     }
        // }

        await deleteComment();
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error`);
    }
});



module.exports = router;