import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bulma/css/bulma.css'
import title from '../assets/title.png'
import { useQuery, gql } from "@apollo/client";


const QUERY = gql`
  query pokemons($first: Int!){
      pokemons(first: $first){
        id
        number
        name
        weight{
          minimum
          maximum
        }
        height{
          minimum
          maximum
        }
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        maxHP
        image
      }
    }`;

function HomePage() {

  const [first, setPokemonNumber] = useState(20);

  const tagColor = ['is-success', 'is-link', 'is-danger', 'is-warning', 'is-light', 'is-primary', 'is-info', 'is-dark', 'is-link']
 
  const [numItemsToShow, setNumItemsToShow] = useState(40);
  const [shouldRedirect, setShouldRedirect] = useState(false);


  let { loading, error, data, fetchMore } = useQuery(QUERY, {
      variables: { 
          first
       },
    });
  const handleLoadMore = () => {
    setNumItemsToShow(numItemsToShow + 20)
    fetchMore({
      variables: {
        first: numItemsToShow
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          pokemons: fetchMoreResult.pokemons
        };
      }
    });
  };

  let pokemons = data?.pokemons || [];

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirect) {
        navigate("/details",  { state: shouldRedirect });
    }
  }, [shouldRedirect]);

  const itemsToShow = pokemons.slice(0, numItemsToShow);

    return (
      <div style={{ padding: '20px' }}>
        <img src={title} style={{ height: '120px', width: '180px' }}/>
        <div className="columns is-multiline is-mobile">
          {
                itemsToShow.map((pokemon) =>
                    <div key={pokemon.id} className="column is-2 is-hoverable is-vcentered" style={{ cursor: 'pointer', background: 'none' }} onClick={() => setShouldRedirect(pokemon)}>
                        <div className='card' style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                            <div className="card-image"  style={{ opacity: '0.8' }}>
                                <figure className="image is-4by3">
                                    <img src={pokemon.image} alt="Placeholder image"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <h6>#{pokemon.number}</h6>
                                    <p style={{ color: 'black' }}>{pokemon.name}</p>
                                    <div className='tags'>
                                        {
                                            pokemon.types.map((type, index) => 
                                            <div className={`tag ${tagColor[index]}`}>
                                            {type}
                                            </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
           }
        </div>
        <div className="box has-text-centered" style={{ background: 'rgba(255, 255, 255, 0)' }}>
            <button className={`button is-primary is-centered ${loading ? 'is-loading' : ''}`} style={{ opacity: '0.7', color: 'white' }} onClick={handleLoadMore}>Load More</button>
        </div>
      </div>
    );
}

export default HomePage;
