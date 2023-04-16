import React, { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bulma/css/bulma.css'
import Evolutions from "./Evolutions";


function DetailsPage (props) {
    const {state} = useLocation();
    const [openEvolution, setEvolutionModalValue] = useState(false)

    const tagColor = ['is-success', 'is-link', 'is-danger', 'is-warning', 'is-light', 'is-primary', 'is-info', 'is-dark', 'is-link']

    const openEvolutionModal = () => {
        setEvolutionModalValue(true);
    };

    const handleDataFromChild = (data) => {
        setEvolutionModalValue(data);
    };

    return (
        <div className="box" style={{ padding: '40px', color: '#555555', background: 'none', position: 'relative' }}>
            <div className="columns is-vcentered">
               <div className="column is-6 is-narrow has-text-centered">
                 <img src={state.image} style={{ opacity: '0.8', borderRadius: '20px' }}/>
               </div>
               <div className="column is-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} >
                 <p style={{ marginLeft: '20px', fontStyle: 'italic', color:'white' }}>{state.name}</p>
                    <div className="tile is-parent box is-vertical" style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                      <div className="tile is-child box" style={{minHeight: '20px !important', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.4)', color: 'white'}}>
                         <p style={{ fontWeight: 'bolder' }}>Height:</p>
                         <span>{state.height.minimum} - {state.height.maximum}</span>
                      </div>
                      <div className="tile is-child box" style={{minHeight: '20px !important', padding: '10px',  backgroundColor: 'rgba(255, 255, 255, 0.4)', color: 'white'}}>
                         <p style={{ fontWeight: 'bolder' }}>Weight:</p>
                         <span>{state.weight.minimum} - {state.weight.maximum}</span>
                      </div>
                      <div className="tile is-child box" style={{minHeight: '20px !important', padding: '10px',  backgroundColor: 'rgba(255, 255, 255, 0.4)', color: 'white'}}>
                         <p style={{ fontWeight: 'bolder' }}>Classification:</p>
                         <span>{state.classification}</span>
                      </div>
                      <div className="tile is-child box" style={{minHeight: '20px !important', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.4)', color: 'white'}}>
                         <p style={{ fontWeight: 'bolder' }}>Type:</p>
                         <div className='tags'>
                            {
                                state.types.map((type, index) => 
                                <div className={`tag ${tagColor[index]}`}>
                                {type}
                                </div>
                                )
                            }
                         </div>
                      </div>
                      <div className="tile is-child box" style={{minHeight: '20px !important', padding: '10px',  backgroundColor: 'rgba(255, 255, 255, 0.4)', color: 'white'}}>
                         <p style={{ fontWeight: 'bolder' }}>Weakness:</p>
                         <div className='tags'>
                            {
                                state.weaknesses.map((weakness, index) => 
                                <div className={`tag ${tagColor[index]}`}>
                                {weakness}
                                </div>
                                )
                            }
                         </div>
                      </div>
                      <div className="tile is-child box" style={{minHeight: '20px !important', padding: '10px',  backgroundColor: 'rgba(255, 255, 255, 0.4)', color: 'white'}}>
                         <p style={{ fontWeight: 'bolder' }}>Resistance:</p>
                         <div className='tags'>
                            {
                                state.resistant.map((resistance, index) => 
                                <div className={`tag ${tagColor[index]}`}>
                                {resistance}
                                </div>
                                )
                            }
                         </div>
                      </div>
                    </div>
               </div>
            </div>
            <div className="box has-text-centered" style={{ background: 'none' }}>
                <button className="button is-info is-centered" onClick={openEvolutionModal}>Evolutions</button>
            </div>
            {
               openEvolution && 
                <div className="evolutions" style={{ zIndex: '1111', height: '400px', width: '400px', position: 'absolute' }}>
                    <Evolutions pokemon={state} onCloseModal={handleDataFromChild}/>
                </div>
            }
        </div>
    )

}

export default DetailsPage;