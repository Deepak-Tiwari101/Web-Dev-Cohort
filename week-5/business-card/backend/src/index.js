const express = require('express');
const cors = require('cors');
const app = express();
const config = require("./config");

app.use(cors())
app.use(express.json());

class InvalidInputError extends Error {
    constructor(message, status_code) {
        super(message);
        this.name = 'InvalidInputError';
        this.status_code = status_code;
    }
}

const Storage = [];  // this is the persistent data in the absence of DB 😊

let globalInterestId = 1;
let globalMediaId = 1;

const processData = (data) => {
    const obj = {};
    obj.name = data.name;
    obj.description = data.description;
    obj.interestList = [];
    obj.socialMediaList = [];

    const interests = data.cleanInterests;
    const socialMedia = data.cleanSocialMedia;

    interests.forEach((interest) => {
        if (interest === '') throw new InvalidInputError("Invalid Data - Interests", 400);
        obj.interestList.push({ id: globalInterestId++, value: interest });
    })

    socialMedia.forEach((media) => {
        if (media === '') throw new InvalidInputError("Invalid Data - Social Media", 400);
        const [name, url] = media.split(',');
        if (name === '' || url === '') throw new InvalidInputError("Invalid Data - Social Media - name or url issue", 400);
        obj.socialMediaList.push({ id: globalMediaId++, url, name });
    })

    return obj;
}

app.post("/card", (req, res) => {
    const data = req.body;

    try {
        const responseData = processData(data);
        Storage.push(responseData);  // save into the list
        res.send("Card Data Saved in the backend");
    } catch (e) {
        res.status(e.status_code).json({ error: e.name, message: e.message })
    }
})

app.get("/cards", (req, res) => {
    res.json(Storage);
})

app.listen(config.PORT, () => console.log(`Server is running on http://localhost:${config.PORT}`));