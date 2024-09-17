import { Hero } from './heroesData'

export function assignLine(hero: Hero): string {
  const { roles } = hero;

  if (roles.includes("Carry") && !roles.includes("Support")) {
    return "Hard Carry";
  }

  if ((roles.includes("Nuker") || roles.includes("Carry")) && !roles.includes("Support")) {
    return "Mid";
  }

  if (roles.includes("Durable") || roles.includes("Initiator")) {
    return "Offlane";
  }

  if (roles.includes("Support")) {
    if (roles.includes("Nuker") || roles.includes("Disabler")) {
      return "Secondary Support";
    }
    return "Primary Support";
  }

  // Fallback: assign based on primary attribute
  return hero.primary_attr === "str" ? "Offlane" : (hero.primary_attr === "agi" ? "Hard Carry" : "Mid");
}