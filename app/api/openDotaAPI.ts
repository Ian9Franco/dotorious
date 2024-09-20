// src/api/openDotaAPI.ts
export async function fetchRecentHeroes(playerId: string) {
    try {
      const response = await fetch(`https://api.opendota.com/api/players/${playerId}/recentMatches`);
  
      if (!response.ok) {
        throw new Error('Error fetching data from OpenDota');
      }
  
      const matches = await response.json();
  
      // Extraer los héroes jugados de los últimos 5 partidos
      const heroIds = matches.map((match: any) => ({
        hero_id: match.hero_id,
        win: match.radiant_win === (match.player_slot < 128), // Si ganó o no el héroe
      }));
  
      return heroIds.slice(0, 5); // Solo los últimos 5 héroes
    } catch (error) {
      console.error('Error fetching OpenDota heroes:', error);
      return [];
    }
  }
  