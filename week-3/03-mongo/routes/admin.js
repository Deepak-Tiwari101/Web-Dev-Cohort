const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
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