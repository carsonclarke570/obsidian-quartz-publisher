---
tags: monster, campaign/dsrpg
dg-publish: false
---
# Torch Hollow
﻿  The spark of life long faded behind dead eyes, the Torch Hollow attacks with grim determination, lured by the power of the living and reborn into a hollow cycle of death. Unlike their armoured soldier brethren, torch hollows are armed with only a lit torch: a symbol of the flame of life that will ever elude them. Faster and more nimble, these Hollows can prove a significant challenge to even the most seasoned warrior as they lash out with a flaming frenzy.

```statblock
name: Torch Hollow
size: Medium
type: undead

ac: 8
hp: 8
hit_dice: 1d8+3
speed: 30 feet

stats: [13, 6, 16, 3, 6, 5]

saves:
  - Con: 5
  - Wis: 1

skillsaves:
  - Survival: 1
damage_immunities: "poison"
condition_immunities: "poisoned"

cr: 0.125

traits:
  - name: Agressive
    desc: As a bonus action, the Torch Hollow can move up to its speed toward a hostile creature that it can see.
  - name: Weakness to Backstab
    desc: Torch Hollows treat any successful attack from a creature they cannot see or are surprised by as a critical hit.
  - name: Keeps Crawling On
    desc: If damage reduces the Torch Hollow to zero Position, it must make a Constitution saving throw with a DC of 5+ the damage taken, unless the damage is radiant or from a critical hit. On a success, the Torch Hollow drops to 1 Position instead. The next time the torch hollow uses this feature, the DC is increased by 5.

actions:
  - name: Torch
    desc: "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6+1) bludgeoning damage plus 3 (1d4+1) fire damage."
  - name: Wild Swing
    desc: "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 8 (2d6+1) bludgeoning damage plus 3 (1d4+1) fire damage."

position_spends:
  - name: Spend 3 Position
    desc: Torch Frenzy. The Torch Hollow makes two Torch attacks with advantage. If hit, the target must succeed on a DC 12 Constitution saving throw or be stunned for 1 round.
    
```

## Potential Loot Drops
- [[Torch]]