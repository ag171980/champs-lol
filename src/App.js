import logo from './logo.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Champ from './components/champs/Champs';
import { FaSearch } from 'react-icons/fa';
import './App.css';

function App() {
  const [champs, setChamps] = useState([])
  const [champsFill, setChampsFill] = useState(false)
  const [champABuscar, setChampABuscar] = useState("")

  const getChamps = async () => {
    const response = await axios.get("http://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion.json")
    let arrAux = []
    let arrAux2 = []
    if (response.status === 200) {
      setChamps([])
      arrAux.push(response.data.data)

      arrAux.forEach((champ) => {
        arrAux2.push(Object.entries(champ))
        arrAux2 = arrAux2[0]
      })
      arrAux = []

      arrAux2.forEach((champ) => {
        arrAux.push(champ[1])
      })
      setChampsFill(true)
      setChamps(champs => [...champs, arrAux])
    }
  }

  let filteredData;
  if (champsFill) {
    filteredData = champs[0].filter((champ) => {
      return (champABuscar === '') ? champ : champ.name.toLowerCase().includes(champABuscar)
    })
  }

  const buscarChamp = (e) => {
    setChampABuscar(e.target.value)
  }
  useEffect(() => {
    getChamps()
  }, [champsFill])


  return (
    <div className="App">
      <h1>League of Legends</h1>
      <div className='buscador'>
        <input type="text" name="nombreChamp" placeholder='Buscar' onChange={buscarChamp} />
        <button><FaSearch /></button>
      </div>
      <div className='champs'>
        {champsFill === true &&
          filteredData.map((champ, idx) => {
            return (
              <Champ key={idx} dataChamp={champ} />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
