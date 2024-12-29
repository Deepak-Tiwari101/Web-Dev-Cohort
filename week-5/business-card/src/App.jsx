import "./index.css"
import Card from "./components/Card"
import InputForm from "./components/InputForm"

function App() {

  return (
    <div>
      <header className="heading-div">
        <h1 className="heading">Create your Card 💳</h1>
      </header>

      <div>
        <div className="main-div">
          <InputForm />
          <Card
            name={"Deepak"}
            description={"I am working for Ford IVI"}
            interestList={[
              { id: 1, value: "Badminton" },
              { id: 2, value: "Chess" },
              { id: 3, value: "Video games" },
            ]}
            socialMediaList={[
              { id: 1, url: "https://www.linkedin.com/", name: "LinkedIn" },
              { id: 2, url: "https://x.com/", name: "X (Twitter)" },
            ]}
          />
        </div>
      </div>

    </div>
  )
}

export default App
