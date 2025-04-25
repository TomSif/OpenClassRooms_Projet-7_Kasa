import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/fetchData';  // Importation de la fonction fetchData

const AppartementList = () => {
  const [appartements, setAppartements] = useState([]); // useState pour gérer l'état des appartements
  const [loading, setLoading] = useState(true);  // useState pour gérer l'état de chargement
  const [error, setError] = useState(null);  // useState pour gérer les erreurs

  useEffect(() => {
    const getAppartements = async () => {  // Fonction asynchrone pour récupérer les données
      try {
        const data = await fetchData();  // Appel de la fonction fetchData
        setAppartements(data);  // Mise à jour de l'état des appartements
        setLoading(false);  // Indiquer que le chargement est terminé
      } catch (error) {
        setError(error);  // Si une erreur se produit, on met à jour l'état des erreurs
        setLoading(false);  // Fin du chargement même en cas d'erreur
      }
    };
    
    getAppartements();  // Appel de la fonction qui récupère les données
  }, []);  // Le tableau vide [] indique que cet effet ne se déclenche qu'une fois (comportement "componentDidMount")

  if (loading) {  // Si les données sont encore en train de charger
    return <div>Loading...</div>;
  }

  if (error) {  // Si une erreur survient pendant le chargement des données
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul className='cards__container'>
    {appartements.map(appartement => (
    <li key={appartement.id} className='cards'>
      <a href="#"  className="cards__link"> 
        <img src={appartement.cover} alt={appartement.title} />
        <span className='cards-title'>{appartement.title}</span>
      </a>
    </li>
  ))}
    </ul>
  );
};

export default AppartementList;
