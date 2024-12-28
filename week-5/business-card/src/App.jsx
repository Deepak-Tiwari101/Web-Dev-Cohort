import "./index.css"
import Card from "./components/Card"

function App() {

  return (
    <div>
      <header className="heading-div">
        <h1 className="heading">Create your Card 💳</h1>
      </header>

      <div className="main-div">
        <section>
          <form>
            <label>
              Name:
              <input type="text" placeholder="Name" />
            </label>

            <label>
              Description:
              <input type="text" placeholder="Description" />
            </label>

            <label>
              Interest:
              <input type="text" placeholder="Interest" />
            </label>

            <label>
              Social Media:
              <input type="text" placeholder="Social Media" />
            </label>
          </form>
        </section>

        <aside>
          <Card
            name={"Deepak"}
            description={"I am working for Ford IVI"}
            interestList={[
              { id: 1, value: "Badminton" },
              { id: 2, value: "Chess" },
              { id: 3, value: "Video games" }
            ]}
            socialMediaList={[
              { id: 1, url: "https://www.linkedin.com/", name: "LinkedIn" },
              { id: 2, url: "https://x.com/", name: "X (Twitter)" },
            ]} />
        </aside>
      </div>
    </div>
  )
}

export default App
