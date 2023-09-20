---
tags: [monster, campaign/dsrpg]
category: Boss
---
# Iudex Gundyr (Phase 2)

The years have allowed the dark within to consume Iudex Gundyr, leaving only the Pus of Man beneath his armor. Where most consumed by the dark would succumb to it, the will of Gundyr bends the Pus of Man into his shape.

#### Statblock

```statblock
name: Pus of Gundyr
size: Huge
type: undead

ac: 14
speed: 40 feet

stats: [21, 19, 8, 5, 9, 6]

cr: 5
condition_immunities: "charmed"
damage_vulnerabilities: "fire (while bloodied)"

lair_actions:
  - name: Call of the Deep
    desc: "Every creature within 120 feet of the Pus of Gundyr must make a DC 12 Charisma saving throw or take 3 (1d6) necrotic damage."

actions:
  - name: Multiattack
    desc: "The Pus of Gundyr makes a Devour and Pus Spike attack."
  - name: Devour
    desc: "Melee Weapon Attack: +8 to hit, reach 10 feet, one target. A creature is picked up by Iudex Gundyr and devoured. The creature must immediately make a DC 15 Strength saving throw or suffer 22 (5d8) acid damage."
  - name: Pus Spike
    desc: "Melee Weapon Attack: +7 to hit, reach 15 feet, two targets. Two target creatures are speared with spikes and take 6 (1d4 + 4)"
```

