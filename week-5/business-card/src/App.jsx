import "./index.css"
import Card from "./components/Card"
import InputForm from "./components/InputForm"
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL, PORT } from "./config";

let alreadyCalled = false;

function App() {
  const [isGetCardsEnabled, setIsGetCardsEnabled] = useState(false);
  const [cards, setCards] = useState([]);


  const handleGetCard = async (e) => {
    if (alreadyCalled) return alert("Cards already rendered on the left")
    e.preventDefault();
    try {
      const response = await axios.get(`${BACKEND_URL}:${PORT}/cards`);
      console.log(response.data);
      setCards(response.data);
    } catch (e) {
      return console.error(e);
    }
    alreadyCalled = true;
  }

  return (
    <div>
      <header className="heading-div">
        <h1 className="heading">Create your Card 💳</h1>
      </header>

      <section>
        <button className={`get-card-btn ${!isGetCardsEnabled ? "disabled" : ""}`} disabled={!isGetCardsEnabled} type="submit" onClick={handleGetCard}>
          Get Cards
        </button>
        <div className="main-div">
          <InputForm enableGetBtn={() => setIsGetCardsEnabled(true)} />
          <div>
            {cards && cards.map((card, index) => (
              <Card
                key={index}
                name={card.name}
                description={card.description}
                interestList={card.interestList}
                socialMediaList={card.socialMediaList}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default App
