import { useState, useEffect } from 'react';
import leftChevron from '../../assets/left-arrow.svg'; // Import de la flèche gauche
import rightChevron from '../../assets/right-arrow.svg'; // Import de la flèche droite
import './Slider.css'; // Import du fichier de style CSS
import sliderData from '../../data/sliderData'; // Import des données du slider

function Slider() {
  const [slideIndex, setSlideIndex] = useState(1); // Déclaration de l'état pour l'index du slide
  const totalSlides = sliderData.length; // Calcul du nombre total de slides

  const currentSlide = sliderData.find(obj => obj.id === slideIndex); // Recherche du slide actuel dans les données

  // Fonction pour changer le slide
  function toggleImage(indexPayload) {
    let newState;
    if (indexPayload + slideIndex > totalSlides) { // Si le nouvel index dépasse le nombre total de slides
      newState = 1; // Revenir au premier slide
    } else if (indexPayload + slideIndex < 1) { // Si le nouvel index est inférieur à 1
      newState = totalSlides; // Aller au dernier slide
    } else {
      newState = indexPayload + slideIndex; // Sinon, mettre à jour l'index du slide
    }
    setSlideIndex(newState); // Mettre à jour l'index du slide
  }

  // Effet de défilement automatique
  useEffect(() => {
    const intervalID = setInterval(() => toggleImage(1), 2000); // Déclencher le changement de slide toutes les 2 secondes
    return () => clearInterval(intervalID); // Nettoyer l'intervalle lors du démontage du composant
  }, [slideIndex]); // Déclencher l'effet lorsque l'index du slide change

  return (
    <>
      <p className="index-info">{slideIndex} / {totalSlides}</p> {/* Affichage de l'index actuel et du nombre total de slides */}
      <div className="slider">
        <p className="image-info">{currentSlide.description}</p> {/* Affichage de la description du slide actuel */}
        <img src={`../../public/images/img-${slideIndex}.jpg`} alt="estate's rooms" className="slider-img" /> {/* Affichage de l'image du slide actuel */}
        <button onClick={() => toggleImage(-1)} className="navigation-button prev-button">
          <img src={leftChevron} alt="previous image" /> {/* Bouton pour passer au slide précédent */}
        </button>
        <button onClick={() => toggleImage(1)} className="navigation-button next-button">
          <img src={rightChevron} alt="next image" /> {/* Bouton pour passer au slide suivant */}
        </button>
      </div>
    </>
  );
}

export default Slider;