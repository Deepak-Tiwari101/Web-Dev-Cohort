import axios from "axios";
import "../index.css";
import { useState } from "react";
import { BACKEND_URL, PORT } from "../config";

const InputForm = ({ enableGetBtn }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [interest, setInterest] = useState([]);
    const [socialMedia, setSocialMedia] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanInterests = interest.filter((item) => item !== "");
        const cleanSocialMedia = socialMedia.filter((item) => {
            if (item === "") return null;
            const tempArr = item.split(",");
            if (
                tempArr.length <= 1 ||
                tempArr[0].trim() === "" ||
                tempArr[1].trim() === ""
            )
                return null;
            return true;
        });

        if (
            name === "" ||
            description === "" ||
            cleanInterests.length === 0 ||
            cleanSocialMedia.length === 0
        )
            return alert("Fill all the details properly");

        const data = {
            name,
            description,
            cleanInterests,
            cleanSocialMedia,
        };

        try {
            const response = await axios.post(`${BACKEND_URL}:${PORT}/card`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert(response.data);
            setName("");
            setDescription("");
            setInterest([]);
            setSocialMedia([]);

            enableGetBtn();
        } catch (e) {
            return console.error(e);
        }
    };


    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handleInterestChange = (e) => {
        setInterest(e.target.value.split(":").map((item) => item.trim()));
    };
    const handleSocialMediaChange = (e) => {
        setSocialMedia(e.target.value.split(":").map((item) => item.trim()));
    };
    return (
        <section>
            <form>
                <label>
                    <div>Name:</div>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter Full Name"
                    />
                </label>

                <label>
                    <div>Description:</div>
                    <input
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Write something about you "
                    />
                </label>

                <label>
                    <div>Interest:</div>
                    <input
                        type="text"
                        value={interest.join(":")}
                        onChange={handleInterestChange}
                        placeholder="Interests - colon separated (chess: badminton: ...)"
                    />
                </label>

                <label>
                    <div>Social Media:</div>
                    <input
                        type="text"
                        value={socialMedia.join(":")}
                        onChange={handleSocialMediaChange}
                        placeholder="Social Media - colon separated (linkedIn,url: X, url: ...)"
                    />
                </label>
                <button type="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </section>
    );
};



import PropTypes from 'prop-types';
InputForm.propTypes = {
    enableGetBtn: PropTypes.func.isRequired
};

export default InputForm;
