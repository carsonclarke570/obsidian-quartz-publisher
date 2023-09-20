---
tags:
  - monster
  - campaign/dsrpg
category: Boss
aliases:
  - Iudex Gundyr
---

# Iudex Gundyr (Phase 1)
How bitter the fate of Iudex Gundyr. To arrive as a champion at the [[Firelink shrine]], and to find it empty.

Dead. No ember to spark, no bell to ring. Nothing. Only the certainty of his own failure. So it was that Gundyr appointed himself the judge of any who would kindle the fire, and link the shrines. So it was that Gundyr decided any who would do what he was denied must prove themselves better than him.

Until now, none have.

#### Statblock

```statblock
name: Iudex Gundyr
size: Huge
type: undead

ac: "15 (Crumbling Plate Armor)"
hp: 160
speed: 20 feet

stats: [21, 8, 19, 5, 9, 6]

skillsaves:
  - Perception: 2

cr: 5
condition_immunities: "charmed"
damage_vulnerabilities: "fire (while Bloodied)"

traits:
  - name: Transformation
    desc: "Iudex Gundyr immediately sprouts tentacle-like appendages and makes a Screech and Bite attack. While bloodied it can make one of the following attacks as part of the attack action or replace a Halberd attack with any of them: Tentacle Reach, Screech and Bite, Slam and Devour."
  - name: Tentacle Reach
    desc: "All creatures in a 20 feet line from Iudex Gundyr must immediately make a DC 15 Strength saving throw, suffering 19 (3d8+5) bludgeoning damage and be knocked prone on a failure. A creature that fails the saving throw by 5 or more is restrained until the beginning of Iudex Gundyr’s next turn. On a successful saving throw the creature suffers half damage."

actions:
  - name: Multiattack
    desc: Iudex Gundyr makes two Strong Sweep or Rapid Sweep attacks.
  - name: Grab and Slice
    desc: "Melee Weapon Attack: +8 to hit, reach 10 feet, one target. A creature hit by this attack is restrained and suffers 15 (3d6+5) bludgeoning damage. At the beginning of its turn while restrained, the grappled creature may attempt to escape, by succeeding on a DC 15 Strength check. Only one creature can be restrained by this attack at once."
  - name: Strong Sweep
    desc: "Melee Weapon Attack: +8 to hit, reach 10 feet, one target. Hit: 19 (1d8+5)."
  - name: Rapid Sweep
    desc: "Melee Weapon Attack: +8 to hit, reach 10 feet, one target. Hit: 21 (1d4+5) bludgeoning damage. Iudex Gundyr makes one additional attack when both Halberd swings use this attack."
  - name: Screech and Bite
    desc: "All creatures within 120 feet of Iudex Gundyr must immediately make a DC 12 Charisma saving throw or become frightened of Iudex Gundyr. When targeting a creature frightened of it, Iudex Gundyr treats a successful weapon attack as a Critical hit. A frightened creature can repeat the saving throw at the end of its turn if it is at least 30 feet away from Iudex Gundyr."    
  - name: Slam and Devour
    desc: "Melee Weapon Attack: +8 to hit, reach 10 feet, one target. A creature is picked up by Iudex Gundyr and devoured. The creature must immediately make a DC 15 Strength saving throw or suffer 22 (5d8) acid damage on a failure or 14 (2d8 + 5) bludgeoning damage on a successful saving throw as they are thrown aside."     
```

## Potential Loot Drops
- [[Gundyr's Halberd]]
- [[Gundyr's Armor]]

