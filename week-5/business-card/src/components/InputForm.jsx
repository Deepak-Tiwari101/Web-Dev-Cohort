/* eslint-disable no-unused-vars */
import "../index.css";
import { useState } from "react";


const InputForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [interest, setInterest] = useState([]);
    const [socialMedia, setSocialMedia] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, description, interest, socialMedia)

        setName("")
        setDescription("")
        setInterest([])
        setSocialMedia([])
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleInterestChange = (e) => {
        const interestArray = e.target.value.split(":")
            .filter(item => item !== '')
            .map((item) => item.trim());
        setInterest(interestArray);
    };

    const handleSocialMediaChange = (e) => {
        const socialMediaArray = e.target.value
            .split(":")
            .filter(item => item !== '')
            .map((item) => item.trim());
        setSocialMedia(socialMediaArray);
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
                        value={interest.join(": ")}
                        onChange={handleInterestChange}
                        placeholder="Interests - colon separated (chess: badminton: ...)"
                    />
                </label>

                <label>
                    <div>Social Media:</div>
                    <input
                        type="text"
                        value={socialMedia.join(": ")}
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

export default InputForm;
