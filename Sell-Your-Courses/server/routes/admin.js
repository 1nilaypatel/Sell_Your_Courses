const express = require('express');
const mongoose = require('mongoose');
const {User, Admin, Course} = require('../db');
const {authenticateJwt, SECRET} = require('../middleware/auth.js');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({username: req.user.username});
    if(!admin){
        return res.status(403).json({msg: "Admin don't exist"});
    }
    res.json({username: admin.username});
});

router.post("/signup", async (req, res) => {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username});
    if(admin){
        res.status(403).json({msg: "Admin already exists"});
    }else{
        const obj = {username: username, password: password};
        const newAdmin = new Admin(obj);
        await newAdmin.save();
        const token = jwt.sign({username, role: 'admin'}, SECRET, {expiresIn: '1h'});
        res.json({message: "Admin created successfully", token});
    }
});

router.post("/login", async (req, res) => {
    const {username, password} = req.headers;
    const admin = await Admin.findOne({username, password});
    if(admin){
        const token = jwt.sign({username, role: 'admin'}, SECRET, {expiresIn: '1h'});
        res.json({message: "Logged in successfully", token});
    }else{
        res.status(403).json({ message: "Invalid username or password" });
    }
});

router.post("/courses", authenticateJwt, async (req, res) => {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.json({message: "Course created successfully", courseId: newCourse.id});
});

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
    const existingCourse = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new: true});
    if(existingCourse){
        res.json("Course updated successfully");
    }else{
        res.status(404).json({message: "Course not found"});
    }
});

router.get("/courses", authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({courses});
});

router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    res.json({course});
});

module.exports = router