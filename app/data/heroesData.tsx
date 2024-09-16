// heroesData.tsx

interface Hero {
    id: number;
    name: string;
    primary_attr: string;
    attack_type: string;
    roles: string[];
    image: string;
  }
  
  // Exporta los datos de héroes
  export const heroesData: Hero[] = [
    {
        "id": 1,
        "name": "Anti-Mage",
        "primary_attr": "agi",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Escape",
          "Nuker"
        ],
        "image": "/images/heroesIMG/antimage.png"
      },
      {
        "id": 2,
        "name": "Axe",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Initiator",
          "Durable",
          "Disabler",
          "Carry"
        ],
        "image": "/images/heroesIMG/axe.png"
      },
    {
      "id": 3,
      "name": "Bane",
      "primary_attr": "all",
      "attack_type": "Ranged",
      "roles": [
        "Support",
        "Disabler",
        "Nuker",
        "Durable"
      ],
      "image": "/images/heroesIMG/bane.png"
    },
    {
      "id": 4,
      "name": "Bloodseeker",
      "primary_attr": "agi",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Disabler",
        "Nuker",
        "Initiator"
      ],
      "image": "/images/heroesIMG/bloodseeker.png"
    },
    {
      "id": 5,
      "name": "Crystal Maiden",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Support",
        "Disabler",
        "Nuker"
      ],
      "image": "/images/heroesIMG/crystal_maiden.png"
    },
    {
      "id": 6,
      "name": "Drow Ranger",
      "primary_attr": "agi",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Disabler",
        "Pusher"
      ],
      "image": "/images/heroesIMG/drow_ranger.png"
    },
    {
      "id": 7,
      "name": "Earthshaker",
      "primary_attr": "str",
      "attack_type": "Melee",
      "roles": [
        "Support",
        "Initiator",
        "Disabler",
        "Nuker"
      ],
      "image": "/images/heroesIMG/earthshaker.png"
    },
    {
      "id": 8,
      "name": "Juggernaut",
      "primary_attr": "agi",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Pusher",
        "Escape"
      ],
      "image": "/images/heroesIMG/juggernaut.png"
    },
    {
      "id": 9,
      "name": "Mirana",
      "primary_attr": "all",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Support",
        "Escape",
        "Nuker",
        "Disabler"
      ],
      "image": "/images/heroesIMG/mirana.png"
    },
    {
      "id": 10,
      "name": "Morphling",
      "primary_attr": "agi",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Escape",
        "Durable",
        "Nuker",
        "Disabler"
      ],
      "image": "/images/heroesIMG/morphling.png"
    },
    {
      "id": 11,
      "name": "Shadow Fiend",
      "primary_attr": "agi",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Nuker"
      ],
      "image": "/images/heroesIMG/nevermore.png"
    },
    {
      "id": 12,
      "name": "Phantom Lancer",
      "primary_attr": "agi",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Escape",
        "Pusher",
        "Nuker"
      ],
      "image": "/images/heroesIMG/phantom_lancer.png"
    },
    {
      "id": 13,
      "name": "Puck",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Initiator",
        "Disabler",
        "Escape",
        "Nuker"
      ],
      "image": "/images/heroesIMG/puck.png"
    },
    {
      "id": 14,
      "name": "Pudge",
      "primary_attr": "str",
      "attack_type": "Melee",
      "roles": [
        "Disabler",
        "Initiator",
        "Durable",
        "Nuker"
      ],
      "image": "/images/heroesIMG/pudge.png"
    },
    {
      "id": 15,
      "name": "Razor",
      "primary_attr": "agi",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Durable",
        "Nuker",
        "Pusher"
      ],
      "image": "/images/heroesIMG/razor.png"
    },
    {
      "id": 16,
      "name": "Sand King",
      "primary_attr": "all",
      "attack_type": "Melee",
      "roles": [
        "Initiator",
        "Disabler",
        "Support",
        "Nuker",
        "Escape"
      ],
      "image": "/images/heroesIMG/sand_king.png"
    },
    {
      "id": 17,
      "name": "Storm Spirit",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Escape",
        "Nuker",
        "Initiator",
        "Disabler"
      ],
      "image": "/images/heroesIMG/storm_spirit.png"
    },
    {
      "id": 18,
      "name": "Sven",
      "primary_attr": "str",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Disabler",
        "Initiator",
        "Durable",
        "Nuker"
      ],
      "image": "/images/heroesIMG/sven.png"
    },
    {
      "id": 19,
      "name": "Tiny",
      "primary_attr": "str",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Nuker",
        "Pusher",
        "Initiator",
        "Durable",
        "Disabler"
      ],
      "image": "/images/heroesIMG/tiny.png"
    },
    {
      "id": 20,
      "name": "Vengeful Spirit",
      "primary_attr": "all",
      "attack_type": "Ranged",
      "roles": [
        "Support",
        "Initiator",
        "Disabler",
        "Nuker",
        "Escape"
      ],
      "image": "/images/heroesIMG/vengefulspirit.png"
    },
    {
      "id": 21,
      "name": "Windranger",
      "primary_attr": "all",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Support",
        "Disabler",
        "Escape",
        "Nuker"
      ],
      "image": "/images/heroesIMG/windrunner.png"
    },
    {
      "id": 22,
      "name": "Zeus",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Nuker",
        "Carry"
      ],
      "image": "/images/heroesIMG/zuus.png"
    },
    {
      "id": 23,
      "name": "Kunkka",
      "primary_attr": "str",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Support",
        "Disabler",
        "Initiator",
        "Durable",
        "Nuker"
      ],
      "image": "/images/heroesIMG/kunkka.png"
    },
    {
      "id": 25,
      "name": "Lina",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Support",
        "Carry",
        "Nuker",
        "Disabler"
      ],
      "image": "/images/heroesIMG/lina.png"
    },
    {
      "id": 26,
      "name": "Lion",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Support",
        "Disabler",
        "Nuker",
        "Initiator"
      ],
      "image": "/images/heroesIMG/lion.png"
    },
    {
      "id": 27,
      "name": "Shadow Shaman",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Support",
        "Pusher",
        "Disabler",
        "Nuker",
        "Initiator"
      ],
      "image": "/images/heroesIMG/shadow_shaman.png"
    },
    {
      "id": 28,
      "name": "Slardar",
      "primary_attr": "str",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Durable",
        "Initiator",
        "Disabler",
        "Escape"
      ],
      "image": "/images/heroesIMG/slardar.png"
    },
    {
      "id": 29,
      "name": "Tidehunter",
      "primary_attr": "str",
      "attack_type": "Melee",
      "roles": [
        "Initiator",
        "Durable",
        "Disabler",
        "Nuker",
        "Carry"
      ],
      "image": "/images/heroesIMG/tidehunter.png"
    },
    {
      "id": 30,
      "name": "Witch Doctor",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Support",
        "Nuker",
        "Disabler"
      ],
      "image": "/images/heroesIMG/witch_doctor.png"
    },
    {
      "id": 31,
      "name": "Lich",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Support",
        "Nuker"
      ],
      "image": "/images/heroesIMG/lich.png"
    },
    {
      "id": 32,
      "name": "Riki",
      "primary_attr": "agi",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Escape",
        "Disabler"
      ],
      "image": "/images/heroesIMG/riki.png"
    },
    {
      "id": 33,
      "name": "Enigma",
      "primary_attr": "all",
      "attack_type": "Ranged",
      "roles": [
        "Disabler",
        "Initiator",
        "Pusher"
      ],
      "image": "/images/heroesIMG/enigma.png"
    },
    {
      "id": 34,
      "name": "Tinker",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Nuker",
        "Pusher"
      ],
      "image": "/images/heroesIMG/tinker.png"
    },
    {
      "id": 35,
      "name": "Sniper",
      "primary_attr": "agi",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Nuker"
      ],
      "image": "/images/heroesIMG/sniper.png"
    },
    {
      "id": 36,
      "name": "Necrophos",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Nuker",
        "Durable",
        "Disabler"
      ],
      "image": "/images/heroesIMG/necrolyte.png"
    },
    {
      "id": 37,
      "name": "Warlock",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Support",
        "Initiator",
        "Disabler"
      ],
      "image": "/images/heroesIMG/warlock.png"
    },
    {
      "id": 38,
      "name": "Beastmaster",
      "primary_attr": "all",
      "attack_type": "Melee",
      "roles": [
        "Initiator",
        "Disabler",
        "Durable",
        "Nuker"
      ],
      "image": "/images/heroesIMG/beastmaster.png"
    },
    {
      "id": 39,
      "name": "Queen of Pain",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Nuker",
        "Escape"
      ],
      "image": "/images/heroesIMG/queenofpain.png"
    },
    {
      "id": 40,
      "name": "Venomancer",
      "primary_attr": "all",
      "attack_type": "Ranged",
      "roles": [
        "Support",
        "Nuker",
        "Initiator",
        "Pusher",
        "Disabler"
      ],
      "image": "/images/heroesIMG/venomancer.png"
    },
    {
      "id": 41,
      "name": "Faceless Void",
      "primary_attr": "agi",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Initiator",
        "Disabler",
        "Escape",
        "Durable"
      ],
      "image": "/images/heroesIMG/faceless_void.png"
    },
    {
      "id": 42,
      "name": "Wraith King",
      "primary_attr": "str",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Support",
        "Durable",
        "Disabler",
        "Initiator"
      ],
      "image": "/images/heroesIMG/skeleton_king.png"
    },
    {
      "id": 43,
      "name": "Death Prophet",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Pusher",
        "Nuker",
        "Disabler"
      ],
      "image": "/images/heroesIMG/death_prophet.png"
    },
    {
      "id": 44,
      "name": "Phantom Assassin",
      "primary_attr": "agi",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Escape"
      ],
      "image": "/images/heroesIMG/phantom_assassin.png"
    },
    {
      "id": 45,
      "name": "Pugna",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Nuker",
        "Pusher"
      ],
      "image": "/images/heroesIMG/pugna.png"
    },
    {
      "id": 46,
      "name": "Templar Assassin",
      "primary_attr": "agi",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Escape"
      ],
      "image": "/images/heroesIMG/templar_assassin.png"
    },
    {
      "id": 47,
      "name": "Viper",
      "primary_attr": "agi",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Durable",
        "Initiator",
        "Disabler"
      ],
      "image": "/images/heroesIMG/viper.png"
    },
    {
      "id": 48,
      "name": "Luna",
      "primary_attr": "agi",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Nuker",
        "Pusher"
      ],
      "image": "/images/heroesIMG/luna.png"
    },
    {
      "id": 49,
      "name": "Dragon Knight",
      "primary_attr": "str",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Pusher",
        "Durable",
        "Disabler",
        "Initiator",
        "Nuker"
      ],
      "image": "/images/heroesIMG/dragon_knight.png"
    },
    {
      "id": 50,
      "name": "Dazzle",
      "primary_attr": "all",
      "attack_type": "Ranged",
      "roles": [
        "Support",
        "Nuker",
        "Disabler"
      ],
      "image": "/images/heroesIMG/dazzle.png"
    },
    {
      "id": 51,
      "name": "Clockwerk",
      "primary_attr": "all",
      "attack_type": "Melee",
      "roles": [
        "Initiator",
        "Disabler",
        "Durable",
        "Nuker"
      ],
      "image": "/images/heroesIMG/rattletrap.png"
    },
    {
      "id": 52,
      "name": "Leshrac",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Support",
        "Nuker",
        "Pusher",
        "Disabler"
      ],
      "image": "/images/heroesIMG/leshrac.png"
    },
    {
      "id": 53,
      "name": "Nature's Prophet",
      "primary_attr": "int",
      "attack_type": "Ranged",
      "roles": [
        "Carry",
        "Pusher",
        "Escape",
        "Nuker"
      ],
      "image": "/images/heroesIMG/furion.png"
    },
    {
      "id": 54,
      "name": "Lifestealer",
      "primary_attr": "str",
      "attack_type": "Melee",
      "roles": [
        "Carry",
        "Durable",
        "Escape",
        "Disabler"
      ],
      "image": "/images/heroesIMG/life_stealer.png"
    },
      {
        "id": 55,
        "name": "Dark Seer",
        "primary_attr": "all",
        "attack_type": "Melee",
        "roles": [
          "Initiator",
          "Escape",
          "Disabler"
        ],
        "image": "/images/heroesIMG/dark_seer.png"
      },
      {
        "id": 56,
        "name": "Clinkz",
        "primary_attr": "agi",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Escape",
          "Pusher"
        ],
        "image": "/images/heroesIMG/clinkz.png"
      },
      {
        "id": 57,
        "name": "Omniknight",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Support",
          "Durable",
          "Nuker"
        ],
        "image": "/images/heroesIMG/omniknight.png"
      },
      {
        "id": 58,
        "name": "Enchantress",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Pusher",
          "Durable",
          "Disabler"
        ],
        "image": "/images/heroesIMG/enchantress.png"
      },
      {
        "id": 59,
        "name": "Huskar",
        "primary_attr": "str",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Durable",
          "Initiator"
        ],
        "image": "/images/heroesIMG/huskar.png"
      },
      {
        "id": 60,
        "name": "Night Stalker",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Initiator",
          "Durable",
          "Disabler",
          "Nuker"
        ],
        "image": "/images/heroesIMG/night_stalker.png"
      },
      {
        "id": 61,
        "name": "Broodmother",
        "primary_attr": "all",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Pusher",
          "Escape",
          "Nuker"
        ],
        "image": "/images/heroesIMG/broodmother.png"
      },
      {
        "id": 62,
        "name": "Bounty Hunter",
        "primary_attr": "agi",
        "attack_type": "Melee",
        "roles": [
          "Escape",
          "Nuker"
        ],
        "image": "/images/heroesIMG/bounty_hunter.png"
      },
      {
        "id": 63,
        "name": "Weaver",
        "primary_attr": "agi",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Escape"
        ],
        "image": "/images/heroesIMG/weaver.png"
      },
      {
        "id": 64,
        "name": "Jakiro",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Nuker",
          "Pusher",
          "Disabler"
        ],
        "image": "/images/heroesIMG/jakiro.png"
      },
      {
        "id": 65,
        "name": "Batrider",
        "primary_attr": "all",
        "attack_type": "Ranged",
        "roles": [
          "Initiator",
          "Disabler",
          "Escape"
        ],
        "image": "/images/heroesIMG/batrider.png"
      },
      {
        "id": 66,
        "name": "Chen",
        "primary_attr": "all",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Pusher"
        ],
        "image": "/images/heroesIMG/chen.png"
      },
      {
        "id": 67,
        "name": "Spectre",
        "primary_attr": "agi",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Durable",
          "Escape"
        ],
        "image": "/images/heroesIMG/spectre.png"
      },
      {
        "id": 68,
        "name": "Ancient Apparition",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Disabler",
          "Nuker"
        ],
        "image": "/images/heroesIMG/ancient_apparition.png"
      },
      {
        "id": 69,
        "name": "Doom",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Disabler",
          "Initiator",
          "Durable",
          "Nuker"
        ],
        "image": "/images/heroesIMG/doom_bringer.png"
      },
      {
        "id": 70,
        "name": "Ursa",
        "primary_attr": "agi",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Durable",
          "Disabler"
        ],
        "image": "/images/heroesIMG/ursa.png"
      },
      {
        "id": 71,
        "name": "Spirit Breaker",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Initiator",
          "Disabler",
          "Durable",
          "Escape"
        ],
        "image": "/images/heroesIMG/spirit_breaker.png"
      },
      {
        "id": 72,
        "name": "Gyrocopter",
        "primary_attr": "agi",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Nuker",
          "Disabler"
        ],
        "image": "/images/heroesIMG/gyrocopter.png"
      },
      {
        "id": 73,
        "name": "Alchemist",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Support",
          "Durable",
          "Disabler",
          "Initiator",
          "Nuker"
        ],
        "image": "/images/heroesIMG/alchemist.png"
      },
      {
        "id": 74,
        "name": "Invoker",
        "primary_attr": "all",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Nuker",
          "Disabler",
          "Escape",
          "Pusher"
        ],
        "image": "/images/heroesIMG/invoker.png"
      },
      {
        "id": 75,
        "name": "Silencer",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Support",
          "Disabler",
          "Initiator",
          "Nuker"
        ],
        "image": "/images/heroesIMG/silencer.png"
      },
      {
        "id": 76,
        "name": "Outworld Destroyer",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Nuker",
          "Disabler"
        ],
        "image": "/images/heroesIMG/obsidian_destroyer.png"
      },
      {
        "id": 77,
        "name": "Lycan",
        "primary_attr": "all",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Pusher",
          "Durable",
          "Escape"
        ],
        "image": "/images/heroesIMG/lycan.png"
      },
      {
        "id": 78,
        "name": "Brewmaster",
        "primary_attr": "all",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Initiator",
          "Durable",
          "Disabler",
          "Nuker"
        ],
        "image": "/images/heroesIMG/brewmaster.png"
      },
      {
        "id": 79,
        "name": "Shadow Demon",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Disabler",
          "Initiator",
          "Nuker"
        ],
        "image": "/images/heroesIMG/shadow_demon.png"
      },
      {
        "id": 80,
        "name": "Lone Druid",
        "primary_attr": "all",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Pusher",
          "Durable"
        ],
        "image": "/images/heroesIMG/lone_druid.png"
      },
      {
        "id": 81,
        "name": "Chaos Knight",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Disabler",
          "Durable",
          "Pusher",
          "Initiator"
        ],
        "image": "/images/heroesIMG/chaos_knight.png"
      },
      {
        "id": 82,
        "name": "Meepo",
        "primary_attr": "agi",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Escape",
          "Nuker",
          "Disabler",
          "Initiator",
          "Pusher"
        ],
        "image": "/images/heroesIMG/meepo.png"
      },
      {
        "id": 83,
        "name": "Treant Protector",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Support",
          "Initiator",
          "Durable",
          "Disabler",
          "Escape"
        ],
        "image": "/images/heroesIMG/treant.png"
      },
      {
        "id": 84,
        "name": "Ogre Magi",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Support",
          "Nuker",
          "Disabler",
          "Durable",
          "Initiator"
        ],
        "image": "/images/heroesIMG/ogre_magi.png"
      },
      {
        "id": 85,
        "name": "Undying",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Support",
          "Durable",
          "Disabler",
          "Nuker"
        ],
        "image": "/images/heroesIMG/undying.png"
      },
      {
        "id": 86,
        "name": "Rubick",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Disabler",
          "Nuker"
        ],
        "image": "/images/heroesIMG/rubick.png"
      },
      {
        "id": 87,
        "name": "Disruptor",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Disabler",
          "Nuker",
          "Initiator"
        ],
        "image": "/images/heroesIMG/disruptor.png"
      },
      {
        "id": 88,
        "name": "Nyx Assassin",
        "primary_attr": "all",
        "attack_type": "Melee",
        "roles": [
          "Disabler",
          "Nuker",
          "Initiator",
          "Escape"
        ],
        "image": "/images/heroesIMG/nyx_assassin.png"
      },
      {
        "id": 89,
        "name": "Naga Siren",
        "primary_attr": "agi",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Support",
          "Pusher",
          "Disabler",
          "Initiator",
          "Escape"
        ],
        "image": "/images/heroesIMG/naga_siren.png"
      },
      {
        "id": 90,
        "name": "Keeper of the Light",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Nuker",
          "Disabler"
        ],
        "image": "/images/heroesIMG/keeper_of_the_light.png"
      },
      {
        "id": 91,
        "name": "Io",
        "primary_attr": "all",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Escape",
          "Nuker"
        ],
        "image": "/images/heroesIMG/wisp.png"
      },
      {
        "id": 92,
        "name": "Visage",
        "primary_attr": "all",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Nuker",
          "Durable",
          "Disabler",
          "Pusher"
        ],
        "image": "/images/heroesIMG/visage.png"
      },
      {
        "id": 93,
        "name": "Slark",
        "primary_attr": "agi",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Escape",
          "Disabler",
          "Nuker"
        ],
        "image": "/images/heroesIMG/slark.png"
      },
      {
        "id": 94,
        "name": "Medusa",
        "primary_attr": "agi",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Disabler",
          "Durable"
        ],
        "image": "/images/heroesIMG/medusa.png"
      },
      {
        "id": 95,
        "name": "Troll Warlord",
        "primary_attr": "agi",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Pusher",
          "Disabler",
          "Durable"
        ],
        "image": "/images/heroesIMG/troll_warlord.png"
      },
      {
        "id": 96,
        "name": "Centaur Warrunner",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Durable",
          "Initiator",
          "Disabler",
          "Nuker",
          "Escape"
        ],
        "image": "/images/heroesIMG/centaur.png"
      },
      {
        "id": 97,
        "name": "Magnus",
        "primary_attr": "all",
        "attack_type": "Melee",
        "roles": [
          "Initiator",
          "Disabler",
          "Nuker",
          "Escape"
        ],
        "image": "/images/heroesIMG/magnataur.png"
      },
      {
        "id": 98,
        "name": "Timbersaw",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Nuker",
          "Durable",
          "Escape"
        ],
        "image": "/images/heroesIMG/shredder.png"
      },
      {
        "id": 99,
        "name": "Bristleback",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Durable",
          "Initiator",
          "Nuker"
        ],
        "image": "/images/heroesIMG/bristleback.png"
      },
      {
        "id": 100,
        "name": "Tusk",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Initiator",
          "Disabler",
          "Nuker"
        ],
        "image": "/images/heroesIMG/tusk.png"
      },
      {
        "id": 101,
        "name": "Skywrath Mage",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Nuker",
          "Disabler"
        ],
        "image": "/images/heroesIMG/skywrath_mage.png"
      },
      {
        "id": 102,
        "name": "Abaddon",
        "primary_attr": "all",
        "attack_type": "Melee",
        "roles": [
          "Support",
          "Carry",
          "Durable"
        ],
        "image": "/images/heroesIMG/abaddon.png"
      },
      {
        "id": 103,
        "name": "Elder Titan",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Initiator",
          "Disabler",
          "Nuker",
          "Durable"
        ],
        "image": "/images/heroesIMG/elder_titan.png"
      },
      {
        "id": 104,
        "name": "Legion Commander",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Disabler",
          "Initiator",
          "Durable",
          "Nuker"
        ],
        "image": "/images/heroesIMG/legion_commander.png"
      },
      {
        "id": 105,
        "name": "Techies",
        "primary_attr": "all",
        "attack_type": "Ranged",
        "roles": [
          "Nuker",
          "Disabler"
        ],
        "image": "/images/heroesIMG/techies.png"
      },
      {
        "id": 106,
        "name": "Ember Spirit",
        "primary_attr": "agi",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Escape",
          "Nuker",
          "Disabler",
          "Initiator"
        ],
        "image": "/images/heroesIMG/ember_spirit.png"
      },
      {
        "id": 107,
        "name": "Earth Spirit",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Nuker",
          "Escape",
          "Disabler",
          "Initiator",
          "Durable"
        ],
        "image": "/images/heroesIMG/earth_spirit.png"
      },
      {
        "id": 108,
        "name": "Underlord",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Support",
          "Nuker",
          "Disabler",
          "Durable",
          "Escape"
        ],
        "image": "/images/heroesIMG/abyssal_underlord.png"
      },
      {
        "id": 109,
        "name": "Terrorblade",
        "primary_attr": "agi",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Pusher",
          "Nuker"
        ],
        "image": "/images/heroesIMG/terrorblade.png"
      },
      {
        "id": 110,
        "name": "Phoenix",
        "primary_attr": "all",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Nuker",
          "Initiator",
          "Escape",
          "Disabler"
        ],
        "image": "/images/heroesIMG/phoenix.png"
      },
      {
        "id": 111,
        "name": "Oracle",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Nuker",
          "Disabler",
          "Escape"
        ],
        "image": "/images/heroesIMG/oracle.png"
      },
      {
        "id": 112,
        "name": "Winter Wyvern",
        "primary_attr": "all",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Disabler",
          "Nuker"
        ],
        "image": "/images/heroesIMG/winter_wyvern.png"
      },
      {
        "id": 113,
        "name": "Arc Warden",
        "primary_attr": "agi",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Escape",
          "Nuker"
        ],
        "image": "/images/heroesIMG/arc_warden.png"
      },
      {
        "id": 114,
        "name": "Monkey King",
        "primary_attr": "agi",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Escape",
          "Disabler",
          "Initiator"
        ],
        "image": "/images/heroesIMG/monkey_king.png"
      },
      {
        "id": 119,
        "name": "Dark Willow",
        "primary_attr": "all",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Nuker",
          "Disabler",
          "Escape"
        ],
        "image": "/images/heroesIMG/dark_willow.png"
      },
      {
        "id": 120,
        "name": "Pangolier",
        "primary_attr": "all",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Nuker",
          "Disabler",
          "Durable",
          "Escape",
          "Initiator"
        ],
        "image": "/images/heroesIMG/pangolier.png"
      },
      {
        "id": 121,
        "name": "Grimstroke",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Nuker",
          "Disabler",
          "Escape"
        ],
        "image": "/images/heroesIMG/grimstroke.png"
      },
      {
        "id": 123,
        "name": "Hoodwink",
        "primary_attr": "agi",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Nuker",
          "Escape",
          "Disabler"
        ],
        "image": "/images/heroesIMG/hoodwink.png"
      },
      {
        "id": 126,
        "name": "Void Spirit",
        "primary_attr": "all",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Escape",
          "Nuker",
          "Disabler"
        ],
        "image": "/images/heroesIMG/void_spirit.png"
      },
      {
        "id": 128,
        "name": "Snapfire",
        "primary_attr": "all",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Nuker",
          "Disabler",
          "Escape"
        ],
        "image": "/images/heroesIMG/snapfire.png"
      },
      {
        "id": 129,
        "name": "Mars",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Initiator",
          "Disabler",
          "Durable"
        ],
        "image": "/images/heroesIMG/mars.png"
      },
      {
        "id": 131,
        "name": "Ringmaster",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Support",
          "Nuker",
          "Escape",
          "Disabler"
        ],
        "image": "/images/heroesIMG/ringmaster.png"
      },
      {
        "id": 135,
        "name": "Dawnbreaker",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Carry",
          "Durable"
        ],
        "image": "/images/heroesIMG/dawnbreaker.png"
      },
      {
        "id": 136,
        "name": "Marci",
        "primary_attr": "all",
        "attack_type": "Melee",
        "roles": [
          "Support",
          "Carry",
          "Initiator",
          "Disabler",
          "Escape"
        ],
        "image": "/images/heroesIMG/marci.png"
      },
      {
        "id": 137,
        "name": "Primal Beast",
        "primary_attr": "str",
        "attack_type": "Melee",
        "roles": [
          "Initiator",
          "Durable",
          "Disabler"
        ],
        "image": "/images/heroesIMG/primal_beast.png"
      },
      {
        "id": 138,
        "name": "Muerta",
        "primary_attr": "int",
        "attack_type": "Ranged",
        "roles": [
          "Carry",
          "Nuker",
          "Disabler"
        ],
        "image": "/images/heroesIMG/muerta.png"
      }
    ]
  