const axios = require('axios');
const fs = require('fs');
const path = require('path');

// URL de la API de OpenDota para obtener los héroes
const HEROES_API_URL = 'https://api.opendota.com/api/heroes';

// Ruta a la carpeta de imágenes locales
const IMAGES_DIR = path.resolve(__dirname, '../public/images/heroesIMG');

// Función para obtener héroes de la API de OpenDota
const getHeroes = async () => {
  try {
    const response = await axios.get(HEROES_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching heroes from OpenDota API:', error);
    return [];
  }
};

// Función para obtener la ruta de la imagen del héroe
const getHeroImagePath = (heroName) => {
  // La ruta de la imagen es relativa a la carpeta 'public'
  return `images/heroesIMG/${heroName.replace(/\s+/g, '_').toLowerCase()}.png`;
};

// Función para guardar los héroes en un archivo JSON
const saveHeroesToFile = (heroes) => {
  const heroesData = heroes.map(hero => ({
    id: hero.id,
    name: hero.localized_name,
    primary_attr: hero.primary_attr,
    attack_type: hero.attack_type,
    roles: hero.roles,
    image: getHeroImagePath(hero.localized_name)  // Ruta de la imagen
  }));

  const filePath = path.join(__dirname, '../public/heroesID.json');

  // Crear la carpeta si no existe
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(heroesData, null, 2));
  console.log('Heroes data saved to heroesID.json');
};

// Función principal
const main = async () => {
  const heroes = await getHeroes();
  saveHeroesToFile(heroes);
};

main();
