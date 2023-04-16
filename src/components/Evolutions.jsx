import React from 'react';
import { useQuery, gql } from "@apollo/client";
import 'bulma/css/bulma.css'
import arrow from '../assets/arrow.png'



function Evolutions (props) {

    const QUERY = gql`
       query pokemon($id: String, $name: String){
            pokemon(id: $id, name: $name){
              id
              number
              name
              evolutions{
                id
                number
                name
                classification
                types
                resistant
                weaknesses
                fleeRate
                maxCP
                maxHP
                image
              }
            }
          }
     `;
   const id = props?.pokemon?.id;
   const name = props?.pokemon?.name;
   const { data, loading, error } = useQuery(QUERY, {
        variables: { 
            id, name
         },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let itemsToShow = [props.pokemon].concat(data?.pokemon?.evolutions) || [];

    const handleClose = () => {
        props.onCloseModal(false);
    };


   return (
    <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Evolutions</p>
                <button className="delete" aria-label="close" onClick={handleClose}></button>
            </header>
            <section className="modal-card-body">
                <div className='columns'>
                {
                    itemsToShow.map((pokemon, index) =>
                        <div key={pokemon.id} className="column is-4 is-hoverable" style={{ cursor: 'pointer' }} onClick={() => setShouldRedirect(pokemon)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className='card'>
                                        <div className="card-image" style={{ paddingTop: '10px' }}>
                                            <figure className="image is-4by3">
                                                <img src={pokemon.image} alt="Placeholder image" />
                                            </figure>
                                        </div>
                                        <div className="card-content">
                                            <div className="content">
                                                <h6 style={{ color: "grey" }}>#{pokemon.number}</h6>
                                                <p>{pokemon.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                    {
                                        index < itemsToShow.length - 1 && 
                                        <div style={{ marginTop: '100px' }}>
                                            <img src={arrow} style={{ height: '20px', width: '20px' }}/>
                                        </div>
                                    }
                                    </div>
                                </div>
                            </div>                         
                    )
                }
                </div>
            </section>
        </div>
    </div>
   )
}

export default Evolutions;