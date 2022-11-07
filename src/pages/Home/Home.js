import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Champ from '../../components/champs/Champs';
import { Animated } from "react-animated-css";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const Home = () => {
    const [champs, setChamps] = useState([])
    const [champsFill, setChampsFill] = useState(false)
    const [champABuscar, setChampABuscar] = useState("")

    const getChamps = async () => {
        const response = await axios.get("https://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion.json")
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
            return (champABuscar === '') ? champ : champ.name.toLowerCase().includes(champABuscar.toLowerCase())
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
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} style={{ animationDelay: "0." + idx + "s" }}>
                                <Link to={`/champ/${champ.key}`}>
                                    <Champ key={idx} dataChamp={champ} />
                                </Link>
                            </Animated>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;