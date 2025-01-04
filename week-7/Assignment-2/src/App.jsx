/* eslint-disable react/prop-types */
import "./index.css"
import { useRecoilState, useRecoilValue, RecoilRoot } from 'recoil'
import { colorsAtom, themeAtom } from "./store"

function App() {
  return (
    <RecoilRoot>
      <MyApp />
    </RecoilRoot>
  )
}

const MyApp = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const handleClick = (color) => setTheme(color);
  return (
    <div style={{ height: "100vh", position: "relative", backgroundColor: theme }}>
      <ColorPallette handleClick={handleClick} />
    </div>
  )
}

const ColorPallette = (props) => {
  const colors = useRecoilValue(colorsAtom);
  return <div className="container">
    {colors.map(item => {
      return <button key={item.colorName} className="color-btn" style={{ backgroundColor: item.color, color: item.textColor }} onClick={() => props.handleClick(item.color)}>{item.colorName}</button>
    })}
  </div>
}
export default App
