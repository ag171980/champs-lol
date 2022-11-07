import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import "./ChampDetail.css"
const ChampDetail = () => {
    const { id } = useParams();
    const [champs, setChamps] = useState([])
    const [champsFill, setChampsFill] = useState(false)
    // const [champABuscar, setChampABuscar] = useState("")

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
            arrAux2 = []
            arrAux2 = arrAux.filter((champ) => champ.key === id)
            setChampsFill(true)
            setChamps(champs => [...champs, arrAux2])
            console.log(champs)
        }
    }

    // let filteredData;
    // if (champsFill) {
    //     filteredData = champs[0].filter((champ) => {
    //         return (champABuscar === '') ? champ : champ.name.toLowerCase().includes(champABuscar.toLowerCase())
    //     })
    // }

    getChamps()
    useEffect(() => {
    }, [champsFill])


    return (
        <div className="ChampDetail">
            {champsFill === true &&
                champs[0].map((champ) => {
                    return (
                        <h1>{champ.name}</h1>
                    )
                })
            }
        </div>
    )
}

export default ChampDetail;