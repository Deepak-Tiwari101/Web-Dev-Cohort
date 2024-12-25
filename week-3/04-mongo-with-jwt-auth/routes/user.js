const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require('../db');

// User Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: 'Username and password are required' });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username is already taken' });
    const user = new User({
        username,
        password,
    });
    user.save().then(() => {
        return res.json({ message: 'User created successfully' })
    }).catch(err => {
        console.log("Error in saving user", err);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    })
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: 'Username and password are required' });

    const user = await User.findOne({ username });
    if (!user || user.password != password)
        return res.status(401).json({ error: 'Invalid credentials' });

    const payload = {
        id: user._id,
        username: user.username,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

router.get('/courses', async (req, res) => {
    const courses = await Course.find();
    return res.status(200).json(courses);
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const user = req.user;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
        return res.status(404).json({ error: 'Course not found' });
    }
    // Check if already purchased
    if (user.purchasedCourses.includes(courseId)) {
        return res.status(400).json({ error: 'Course already purchased' });
    }
    user.purchasedCourses.push(courseId);

    try {
        await user.save();
        return res.json({ message: 'Course purchased successfully' });
    } catch (err) {
        console.log("Error purchasing the course:", err);
        res.status(500).json({ error: 'An error occurred while purchaing course for the user' });
    }
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    const user = req.user;
    return res.json({ purchasedCourses: user.purchasedCourses })
});

module.exports = router