/* eslint-disable react/prop-types */
import '../index.css'

const Card = ({ name, description, interestList, socialMediaList }) => {
    return (
        <div className="container">
            <h3>{name}</h3>
            <p>{description}</p>

            {interestList && <h4>Interests</h4>}
            <ul>
                {
                    interestList && Array.isArray(interestList) && interestList.map(interest => (
                        <li key={interest.id}>{interest.value}</li>
                    ))
                }
            </ul>

            <div className="buttons">
                {
                    socialMediaList && socialMediaList.map(media => (
                        <a key={media.id} className="handle-btn" href={media.url}>{media.name}</a>
                    ))
                }
            </div>
        </div>
    );
}

export default Card;
