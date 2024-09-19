const { heroesData } = require('../data/heroesData');

const getHeroCounters = async () => {
  // Extrae los IDs de los héroes
  const heroIds = heroesData.map(hero => hero.id);

  console.log('Hero IDs:', heroIds);

  // Inicializa el objeto de counters
  const heroCounters = heroIds.reduce((acc, id) => {
    acc[id] = []; // Inicializa el array de counters para cada héroe
    return acc;
  }, {});

  // Guarda el resultado en un archivo JSON
  const filePath = path.join(__dirname, '../data/heroCounters.json');
  fs.writeFileSync(filePath, JSON.stringify(heroCounters, null, 2), 'utf-8');
  console.log('Hero counters saved to', filePath);
};

// Ejecuta la función
getHeroCounters().catch(err => {
  console.error('Error fetching hero counters:', err);
});

