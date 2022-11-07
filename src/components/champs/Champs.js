import './champs.css';
const Champ = ({ dataChamp = [] }) => {
    return (
        <div className="champ">
            <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${dataChamp.id}_0.jpg`} alt="a" />
            {/* <img src={`http://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${dataChamp.id}.png`} /> */}
            <div className='name'>
                <h2>{dataChamp.name}</h2>
            </div>
        </div>
    )
}
export default Champ;