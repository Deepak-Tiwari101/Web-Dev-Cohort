const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tiwarideepak:pa55w0rd@cluster0.ekilk.mongodb.net/courlib');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: 'string',
    password: 'string'
});

const UserSchema = new mongoose.Schema({
    username: 'string',
    password: 'string',
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: [] }]
});

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        min: 0, // Ensure prices are non-negative
        required: true,
    },
    imageLink: {
        type: String,
        validate: {
            validator: (v) => {
                return /https?:\/\/.+/.test(v);
            },
            message: "Not a valid image URL"
        }
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}