const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");


// Admin Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) return res.status(400).json({ error: 'Admin Username is already taken' });

    const admin = new Admin({
        username,
        password,
    });
    // Save the admin to the database
    admin.save().then(() => {
        return res.json({ message: 'Admin created successfully' })
    }).catch(err => {
        console.error('Error saving admin:', err);
        res.status(500).json({ error: 'An error occurred while creating the admin' });
    })
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: 'Username and password are required' });

    const admin = await Admin.findOne({ username });
    if (!admin || admin.password != password)
        return res.status(401).json({ error: 'Invalid credentials' });

    const payload = {
        id: admin._id,
        username: admin.username,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic

    // Output: { message: 'Course created successfully', courseId: "new course id" }
    const { title, description, price, imageLink } = req.body;
    const course = new Course({
        title,
        description,
        price,
        imageLink
    });
    // Save the course to the database
    course.save().then(() => {
        return res.json({ message: 'Course created successfully', courseId: course._id });
    }).catch(err => {
        console.error('Error saving course:', err);
        res.status(500).json({ error: 'An error occurred while creating the course' });
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find();
    return res.status(200).json(courses);
});

module.exports = router;