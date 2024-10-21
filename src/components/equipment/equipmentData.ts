export const equipment = [
  {
    "id": "deluxImprovedConfiguration",
    "index": 43,
    "name": "Усовершенствованная компоновка",
    "tags": "improvedConfiguration deluxe armor",
    "icon": "improvedConfiguration",
    "min_tier": 5,
    "factors": [
      {
        "type": "vehicleRepairSpeed",
        "desc": "к скорости ремонта",
        "value": 1.45
      },
      {
        "type": "vehicleAmmoBayEngineFuelStrength",
        "desc": "к прочности внутренних модулей",
        "value": 2.5
      },
      {
        "type": "vehPenaltyForDamageEngineAndCombat",
        "desc": "от штрафа за повреждённые\\nбоеукладку и двигатель",
        "value": 0.3
      },
      {
        "type": "vehicleFireChance",
        "desc": "от шанса возгорания двигателя",
        "value": 0.3
      }
    ]
  },
  {
    "id": "deluxImprovedVentilation",
    "index": 44,
    "name": "Система отвода пороховых газов",
    "tags": "ventilation deluxe armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "include_tags": "improvedVentilation_class1_user improvedVentilation_class2_user improvedVentilation_class3_user",
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.085
      }
    ]
  },
  {
    "id": "deluxRammer",
    "index": 45,
    "name": "Экспериментальная система заряжания",
    "tags": "rammer deluxe firepower",
    "icon": "rammer",
    "include_tags": "tankRammer_class1_user tankRammer_class2_user",
    "factors": [
      {
        "type": "vehicleGunReloadTime",
        "desc": "от времени заряжания",
        "value": 0.865
      }
    ]
  },
  {
    "id": "deluxCoatedOptics",
    "index": 46,
    "name": "Юстированная оптика",
    "tags": "coatedOptics deluxe reconnaissance",
    "icon": "coatedOptics",
    "factors": [
      {
        "type": "vehicleCircularVisionRadius",
        "desc": "к обзору (не более 445 метров)",
        "value": 1.135
      }
    ]
  },
  {
    "id": "deluxAimingStabilizer",
    "index": 47,
    "name": "Комплекс стабилизационного оборудования",
    "tags": "aimingStabilizer deluxe firepower",
    "icon": "aimingStabilizer",
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user",
    "factors": [
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.725
      }
    ]
  },
  {
    "id": "deluxEnhancedAimDrives",
    "index": 48,
    "name": "Износостойкие приводы наводки",
    "tags": "enhancedAimDrives deluxe firepower",
    "icon": "enhancedAimDrives",
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.135
      }
    ]
  },
  {
    "id": "deluxeTurbocharger",
    "index": 111,
    "name": "Улучшенный компрессор",
    "tags": "turbocharger deluxe",
    "icon": "turbocharger",
    "min_tier": 2,
    "factors": [
      {
        "type": "vehicleEnginePower",
        "desc": "к мощности двигателя",
        "value": 1.125
      },
      {
        "type": "vehicleForwardMaxSpeed",
        "desc": "к максимальной скорости вперёд",
        "value": 6
      },
      {
        "type": "vehicleBackwardMaxSpeed",
        "desc": "к максимальной скорости назад",
        "value": 4
      }
    ]
  },
  {
    "id": "deluxeExtraHealthReserve",
    "index": 112,
    "name": "Повышенная снарядостойкость",
    "tags": "healthReserve deluxe",
    "icon": "extraHealthReserve",
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user",
    "factors": [
      {
        "type": "vehicleStrength",
        "desc": "к запасу прочности машины",
        "value": 1.125
      },
      {
        "type": "vehicleChassisStrength",
        "desc": "к прочности ходовой",
        "value": 1.75
      },
      {
        "type": "vehicleChassisRepairSpeed",
        "desc": "к скорости ремонта ходовой",
        "value": 1.3
      },
      {
        "type": "vehicleChassisFallDamage",
        "desc": "от урона при падении",
        "value": 0.25
      }
    ]
  },
  {
    "id": "deluxeImprovedRotationMechanism",
    "index": 117,
    "name": "Усовершенствованная бортовая передача",
    "tags": "rotationMechanism deluxe",
    "icon": "improvedRotationMechanism",
    "min_tier": 5,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleTurretOrCuttingRotationSpeed",
        "desc": "к скорости поворота башни или горизонтального наведения орудия для машин с неподвижной рубкой",
        "value": 1.175
      },
      {
        "type": "vehicleAllGroundRotationSpeed",
        "desc": "к скорости поворота ходовой",
        "value": 1.175
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.825
      }
    ]
  },
  {
    "id": "deluxeImprovedSights",
    "index": 120,
    "name": "Усовершенствованный прицел",
    "tags": "improvedSights deluxe firepower",
    "icon": "improvedSights",
    "min_tier": 5,
    "max_tier": 10,
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "factors": [
      {
        "type": "vehicleGunShotFullDispersion",
        "desc": "от размера круга сведения",
        "value": 0.91
      }
    ]
  },
  {
    "id": "trophyBasicAimDrives",
    "index": 50,
    "name": "Трофейные приводы наводки",
    "tags": "enhancedAimDrives firepower trophyBasic",
    "icon": "enhancedAimDrives",
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.1
      }
    ]
  },
  {
    "id": "trophyUpgradedAimDrives",
    "index": 51,
    "name": "Трофейные приводы наводки",
    "tags": "enhancedAimDrives firepower trophyUpgraded",
    "icon": "enhancedAimDrives",
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.125
      }
    ]
  },
  {
    "id": "trophyBasicTankRammer",
    "index": 52,
    "name": "Трофейный досылатель",
    "tags": "rammer firepower trophyBasic",
    "icon": "rammer",
    "include_tags": "tankRammer_class1_user tankRammer_class2_user",
    "factors": [
      {
        "type": "vehicleGunReloadTime",
        "desc": "от времени заряжания",
        "value": 0.9
      }
    ]
  },
  {
    "id": "trophyUpgradedTankRammer",
    "index": 53,
    "name": "Трофейный досылатель",
    "tags": "rammer firepower trophyUpgraded",
    "icon": "rammer",
    "include_tags": "tankRammer_class1_user tankRammer_class2_user",
    "factors": [
      {
        "type": "vehicleGunReloadTime",
        "desc": "от времени заряжания",
        "value": 0.875
      }
    ]
  },
  {
    "id": "trophyBasicImprovedVentilation",
    "index": 54,
    "name": "Трофейная вентиляция",
    "tags": "ventilation trophyBasic armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "include_tags": "improvedVentilation_class1_user improvedVentilation_class2_user improvedVentilation_class3_user",
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.05
      }
    ]
  },
  {
    "id": "trophyUpgradedImprovedVentilation",
    "index": 55,
    "name": "Трофейная вентиляция",
    "tags": "ventilation trophyUpgraded armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "include_tags": "improvedVentilation_class1_user improvedVentilation_class2_user improvedVentilation_class3_user",
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.075
      }
    ]
  },
  {
    "id": "trophyBasicAimingStabilizer",
    "index": 56,
    "name": "Трофейный стабилизатор",
    "tags": "aimingStabilizer trophyBasic firepower",
    "icon": "aimingStabilizer",
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user",
    "factors": [
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.8
      }
    ]
  },
  {
    "id": "trophyUpgradedAimingStabilizer",
    "index": 57,
    "name": "Трофейный стабилизатор",
    "tags": "aimingStabilizer trophyUpgraded firepower",
    "icon": "aimingStabilizer",
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user",
    "factors": [
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.75
      }
    ]
  },
  {
    "id": "trophyBasicCoatedOptics",
    "index": 58,
    "name": "Трофейная оптика",
    "tags": "coatedOptics trophyBasic reconnaissance",
    "icon": "coatedOptics",
    "factors": [
      {
        "type": "vehicleCircularVisionRadius",
        "desc": "к обзору (не более 445 метров)",
        "value": 1.1
      }
    ]
  },
  {
    "id": "trophyUpgradedCoatedOptics",
    "index": 59,
    "name": "Трофейная оптика",
    "tags": "coatedOptics trophyUpgraded reconnaissance",
    "icon": "coatedOptics",
    "factors": [
      {
        "type": "vehicleCircularVisionRadius",
        "desc": "к обзору (не более 445 метров)",
        "value": 1.125
      }
    ]
  },
  {
    "id": "trophyBasicImprovedConfiguration",
    "index": 105,
    "name": "Трофейные технологии защиты",
    "tags": "improvedConfiguration armor trophyBasic",
    "icon": "improvedConfiguration",
    "min_tier": 5,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleRepairSpeed",
        "desc": "к скорости ремонта",
        "value": 1.25
      },
      {
        "type": "vehicleAmmoBayEngineFuelStrength",
        "desc": "к прочности внутренних модулей",
        "value": 2
      },
      {
        "type": "vehPenaltyForDamageEngineAndCombat",
        "desc": "от штрафа за повреждённые\\nбоеукладку и двигатель",
        "value": 0.5
      },
      {
        "type": "vehicleFireChance",
        "desc": "от шанса возгорания двигателя",
        "value": 0.5
      }
    ]
  },
  {
    "id": "trophyUpgradedImprovedConfiguration",
    "index": 106,
    "name": "Трофейные технологии защиты",
    "tags": "improvedConfiguration armor trophyUpgraded",
    "icon": "improvedConfiguration",
    "min_tier": 5,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleRepairSpeed",
        "desc": "к скорости ремонта",
        "value": 1.4
      },
      {
        "type": "vehicleAmmoBayEngineFuelStrength",
        "desc": "к прочности внутренних модулей",
        "value": 2.5
      },
      {
        "type": "vehPenaltyForDamageEngineAndCombat",
        "desc": "от штрафа за повреждённые\\nбоеукладку и двигатель",
        "value": 0.3
      },
      {
        "type": "vehicleFireChance",
        "desc": "от шанса возгорания двигателя",
        "value": 0.3
      }
    ]
  },
  {
    "id": "trophyBasicImprovedRotationMechanism",
    "index": 107,
    "name": "Трофейные механизмы поворота",
    "tags": "rotationMechanism trophyBasic",
    "icon": "improvedRotationMechanism",
    "min_tier": 5,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleTurretOrCuttingRotationSpeed",
        "desc": "к скорости поворота башни или горизонтального наведения орудия для машин с неподвижной рубкой",
        "value": 1.1
      },
      {
        "type": "vehicleAllGroundRotationSpeed",
        "desc": "к скорости поворота ходовой",
        "value": 1.1
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.9
      }
    ]
  },
  {
    "id": "trophyUpgradedImprovedRotationMechanism",
    "index": 108,
    "name": "Трофейные механизмы поворота",
    "tags": "rotationMechanism trophyUpgraded",
    "icon": "improvedRotationMechanism",
    "min_tier": 5,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleTurretOrCuttingRotationSpeed",
        "desc": "к скорости поворота башни или горизонтального наведения орудия для машин с неподвижной рубкой",
        "value": 1.15
      },
      {
        "type": "vehicleAllGroundRotationSpeed",
        "desc": "к скорости поворота ходовой",
        "value": 1.15
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.85
      }
    ]
  },
  {
    "id": "trophyBasicImprovedSights",
    "index": 109,
    "name": "Трофейный прицел",
    "tags": "improvedSights trophyBasic firepower",
    "icon": "improvedSights",
    "min_tier": 5,
    "max_tier": 11,
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "factors": [
      {
        "type": "vehicleGunShotFullDispersion",
        "desc": "от размера круга сведения",
        "value": 0.95
      }
    ]
  },
  {
    "id": "trophyUpgradedImprovedSights",
    "index": 110,
    "name": "Трофейный прицел",
    "tags": "improvedSights trophyUpgraded firepower",
    "icon": "improvedSights",
    "min_tier": 5,
    "max_tier": 11,
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "factors": [
      {
        "type": "vehicleGunShotFullDispersion",
        "desc": "от размера круга сведения",
        "value": 0.92
      }
    ]
  },
  {
    "id": "trophyBasicAdditionalInvisibilityDevice",
    "index": 113,
    "name": "Трофейная система выхлопа",
    "tags": "additInvisibilityDevice trophyBasic",
    "icon": "additionalInvisibilityDevice",
    "factors": [
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.06,
        "restriction": "lightTank mediumTank"
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.05,
        "restriction": "AT-SPG"
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.03,
        "restriction": "heavyTank SPG"
      }
    ]
  },
  {
    "id": "trophyUpgradedAdditionalInvisibilityDevice",
    "index": 114,
    "name": "Трофейная система выхлопа",
    "tags": "additInvisibilityDevice trophyUpgraded",
    "icon": "additionalInvisibilityDevice",
    "factors": [
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.09,
        "restriction": "lightTank mediumTank"
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.07,
        "restriction": "AT-SPG"
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.05,
        "restriction": "heavyTank SPG"
      }
    ]
  },
  {
    "id": "trophyBasicTurbocharger",
    "index": 115,
    "name": "Трофейный турбонагнетатель",
    "tags": "turbocharger trophyBasic",
    "icon": "../maps/icons/artefact/turbocharger.png 0 0",
    "factors": [
      {
        "type": "vehicleEnginePower",
        "desc": "к мощности двигателя",
        "value": 1.075
      },
      {
        "type": "vehicleForwardMaxSpeed",
        "desc": "к максимальной скорости вперёд",
        "value": 4
      },
      {
        "type": "vehicleBackwardMaxSpeed",
        "desc": "к максимальной скорости назад",
        "value": 2
      }
    ]
  },
  {
    "id": "trophyUpgradedTurbocharger",
    "index": 116,
    "name": "Трофейный турбонагнетатель",
    "tags": "turbocharger trophyUpgraded",
    "icon": "../maps/icons/artefact/turbocharger.png 0 0",
    "factors": [
      {
        "type": "vehicleEnginePower",
        "desc": "к мощности двигателя",
        "value": 1.12
      },
      {
        "type": "vehicleForwardMaxSpeed",
        "desc": "к максимальной скорости вперёд",
        "value": 5
      },
      {
        "type": "vehicleBackwardMaxSpeed",
        "desc": "к максимальной скорости назад",
        "value": 3
      }
    ]
  },
  {
    "id": "trophyBasicExtraHealthReserve",
    "index": 118,
    "name": "Трофейная закалка",
    "tags": "healthReserve trophyBasic",
    "icon": "extraHealthReserve",
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user",
    "factors": [
      {
        "type": "vehicleStrength",
        "desc": "к запасу прочности машины",
        "value": 1.08
      },
      {
        "type": "vehicleChassisStrength",
        "desc": "к прочности ходовой",
        "value": 1.5
      },
      {
        "type": "vehicleChassisRepairSpeed",
        "desc": "к скорости ремонта ходовой",
        "value": 1.15
      },
      {
        "type": "vehicleChassisFallDamage",
        "desc": "от урона при падении",
        "value": 0.5
      }
    ]
  },
  {
    "id": "trophyUpgradedExtraHealthReserve",
    "index": 119,
    "name": "Трофейная закалка",
    "tags": "healthReserve trophyUpgraded",
    "icon": "extraHealthReserve",
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user",
    "factors": [
      {
        "type": "vehicleStrength",
        "desc": "к запасу прочности машины",
        "value": 1.11
      },
      {
        "type": "vehicleChassisStrength",
        "desc": "к прочности ходовой",
        "value": 1.7
      },
      {
        "type": "vehicleChassisRepairSpeed",
        "desc": "к скорости ремонта ходовой",
        "value": 1.25
      },
      {
        "type": "vehicleChassisFallDamage",
        "desc": "от урона при падении",
        "value": 0.3
      }
    ]
  },
  {
    "id": "improvedConfiguration_tier2",
    "index": 61,
    "name": "Изменённая компоновка (Класс 2)",
    "tags": "improvedConfiguration armor",
    "icon": "improvedConfiguration",
    "categories": "survivability",
    "min_tier": 5,
    "max_tier": 7,
    "factors": [
      {
        "type": "vehicleRepairSpeed",
        "desc": "к скорости ремонта",
        "value": 1.25,
        "specValue": 1.35
      },
      {
        "type": "vehicleAmmoBayEngineFuelStrength",
        "desc": "к прочности внутренних модулей",
        "value": 2,
        "specValue": 2.5
      },
      {
        "type": "vehPenaltyForDamageEngineAndCombat",
        "desc": "от штрафа за повреждённые\\nбоеукладку и двигатель",
        "value": 0.5,
        "specValue": 0.35
      },
      {
        "type": "vehicleFireChance",
        "desc": "от шанса возгорания двигателя",
        "value": 0.5,
        "specValue": 0.35
      }
    ]
  },
  {
    "id": "improvedConfiguration_tier1",
    "index": 62,
    "name": "Изменённая компоновка (Класс 1)",
    "tags": "improvedConfiguration armor",
    "icon": "improvedConfiguration",
    "categories": "survivability",
    "min_tier": 8,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleRepairSpeed",
        "desc": "к скорости ремонта",
        "value": 1.25,
        "specValue": 1.35
      },
      {
        "type": "vehicleAmmoBayEngineFuelStrength",
        "desc": "к прочности внутренних модулей",
        "value": 2,
        "specValue": 2.5
      },
      {
        "type": "vehPenaltyForDamageEngineAndCombat",
        "desc": "от штрафа за повреждённые\\nбоеукладку и двигатель",
        "value": 0.5,
        "specValue": 0.35
      },
      {
        "type": "vehicleFireChance",
        "desc": "от шанса возгорания двигателя",
        "value": 0.5,
        "specValue": 0.35
      }
    ]
  },
  {
    "id": "antifragmentationLining_tier4",
    "index": 63,
    "name": "Лёгкий противоосколочный подбой",
    "tags": "antifragmentationLining armor",
    "icon": "antifragmentationLining",
    "categories": "survivability",
    "include_tags": "antifragmentationLining_light_user",
    "factors": [
      {
        "type": "vehicleRamOrExplosionDamageResistance",
        "desc": "от ОФ урона, огнесмеси и тарана",
        "value": 0.5,
        "specValue": 0.4
      },
      {
        "type": "crewHitChance",
        "desc": "к защите экипажа от ранений",
        "value": 1.5,
        "specValue": 1.6
      },
      {
        "type": "crewStunDuration",
        "desc": "от времени дезориентации",
        "value": 0.75,
        "specValue": 0.65
      },
      {
        "type": "crewStunResistance",
        "desc": "от силы дезориентации экипажа",
        "value": 0.9,
        "specValue": 0.85
      }
    ]
  },
  {
    "id": "antifragmentationLining_tier3",
    "index": 64,
    "name": "Средний противоосколочный подбой",
    "tags": "antifragmentationLining armor",
    "icon": "antifragmentationLining",
    "categories": "survivability",
    "include_tags": "antifragmentationLining_medium_user",
    "factors": [
      {
        "type": "vehicleRamOrExplosionDamageResistance",
        "desc": "от ОФ урона, огнесмеси и тарана",
        "value": 0.5,
        "specValue": 0.4
      },
      {
        "type": "crewHitChance",
        "desc": "к защите экипажа от ранений",
        "value": 1.5,
        "specValue": 1.6
      },
      {
        "type": "crewStunDuration",
        "desc": "от времени дезориентации",
        "value": 0.75,
        "specValue": 0.65
      },
      {
        "type": "crewStunResistance",
        "desc": "от силы дезориентации экипажа",
        "value": 0.9,
        "specValue": 0.85
      }
    ]
  },
  {
    "id": "antifragmentationLining_tier2",
    "index": 65,
    "name": "Тяжёлый противоосколочный подбой",
    "tags": "antifragmentationLining armor",
    "icon": "antifragmentationLining",
    "categories": "survivability",
    "include_tags": "antifragmentationLining_heavy_user",
    "factors": [
      {
        "type": "vehicleRamOrExplosionDamageResistance",
        "desc": "от ОФ урона, огнесмеси и тарана",
        "value": 0.5,
        "specValue": 0.4
      },
      {
        "type": "crewHitChance",
        "desc": "к защите экипажа от ранений",
        "value": 1.5,
        "specValue": 1.6
      },
      {
        "type": "crewStunDuration",
        "desc": "от времени дезориентации",
        "value": 0.75,
        "specValue": 0.65
      },
      {
        "type": "crewStunResistance",
        "desc": "от силы дезориентации экипажа",
        "value": 0.9,
        "specValue": 0.85
      }
    ]
  },
  {
    "id": "antifragmentationLining_tier1",
    "index": 66,
    "name": "Сверхтяжёлый противоосколочный подбой",
    "tags": "antifragmentationLining armor",
    "icon": "antifragmentationLining",
    "categories": "survivability",
    "include_tags": "antifragmentationLining_superheavy_user",
    "factors": [
      {
        "type": "vehicleRamOrExplosionDamageResistance",
        "desc": "от ОФ урона, огнесмеси и тарана",
        "value": 0.5,
        "specValue": 0.4
      },
      {
        "type": "crewHitChance",
        "desc": "к защите экипажа от ранений",
        "value": 1.5,
        "specValue": 1.6
      },
      {
        "type": "crewStunDuration",
        "desc": "от времени дезориентации",
        "value": 0.75,
        "specValue": 0.65
      },
      {
        "type": "crewStunResistance",
        "desc": "от силы дезориентации экипажа",
        "value": 0.9,
        "specValue": 0.85
      }
    ]
  },
  {
    "id": "stereoscope_tier3",
    "index": 67,
    "name": "Стереотруба (Класс 3)",
    "tags": "stereoscope reconnaissance",
    "icon": "stereoscope",
    "categories": "stealth",
    "min_tier": 2,
    "max_tier": 4,
    "factors": [
      {
        "type": "vehicleStillCircularVisionRadius",
        "desc": "к обзору из неподвижной машины (не более 445 метров)",
        "value": 1.25,
        "specValue": 1.275
      }
    ]
  },
  {
    "id": "stereoscope_tier2",
    "index": 68,
    "name": "Стереотруба (Класс 2)",
    "tags": "stereoscope reconnaissance",
    "icon": "stereoscope",
    "categories": "stealth",
    "min_tier": 5,
    "max_tier": 7,
    "factors": [
      {
        "type": "vehicleStillCircularVisionRadius",
        "desc": "к обзору из неподвижной машины (не более 445 метров)",
        "value": 1.25,
        "specValue": 1.275
      }
    ]
  },
  {
    "id": "stereoscope_tier1",
    "index": 69,
    "name": "Стереотруба (Класс 1)",
    "tags": "stereoscope reconnaissance",
    "icon": "stereoscope",
    "categories": "stealth",
    "min_tier": 8,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleStillCircularVisionRadius",
        "desc": "к обзору из неподвижной машины (не более 445 метров)",
        "value": 1.25,
        "specValue": 1.275
      }
    ]
  },
  {
    "id": "coatedOptics_tier3",
    "index": 70,
    "name": "Просветлённая оптика (Класс 3)",
    "tags": "coatedOptics reconnaissance",
    "icon": "coatedOptics",
    "categories": "stealth",
    "min_tier": 2,
    "max_tier": 4,
    "factors": [
      {
        "type": "vehicleCircularVisionRadius",
        "desc": "к обзору (не более 445 метров)",
        "value": 1.1,
        "specValue": 1.115
      }
    ]
  },
  {
    "id": "coatedOptics_tier2",
    "index": 71,
    "name": "Просветлённая оптика (Класс 2)",
    "tags": "coatedOptics reconnaissance",
    "icon": "coatedOptics",
    "categories": "stealth",
    "min_tier": 5,
    "max_tier": 7,
    "factors": [
      {
        "type": "vehicleCircularVisionRadius",
        "desc": "к обзору (не более 445 метров)",
        "value": 1.1,
        "specValue": 1.115
      }
    ]
  },
  {
    "id": "coatedOptics_tier1",
    "index": 72,
    "name": "Просветлённая оптика (Класс 1)",
    "tags": "coatedOptics reconnaissance",
    "icon": "coatedOptics",
    "categories": "stealth",
    "min_tier": 8,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleCircularVisionRadius",
        "desc": "к обзору (не более 445 метров)",
        "value": 1.1,
        "specValue": 1.115
      }
    ]
  },
  {
    "id": "camouflageNet_tier3",
    "index": 73,
    "name": "Маскировочная сеть (Класс 3)",
    "tags": "camouflageNet camouflage",
    "icon": "camouflageNet",
    "categories": "stealth",
    "min_tier": 2,
    "max_tier": 4,
    "factors": [
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.15,
        "restriction": "AT-SPG",
        "specValue": 1.175
      },
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.1,
        "restriction": "lightTank mediumTank",
        "specValue": 1.125
      },
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.05,
        "restriction": "heavyTank SPG",
        "specValue": 1.075
      }
    ]
  },
  {
    "id": "camouflageNet_tier2",
    "index": 74,
    "name": "Маскировочная сеть (Класс 2)",
    "tags": "camouflageNet camouflage",
    "icon": "camouflageNet",
    "categories": "stealth",
    "min_tier": 5,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.15,
        "restriction": "AT-SPG",
        "specValue": 1.175
      },
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.1,
        "restriction": "lightTank mediumTank",
        "specValue": 1.125
      },
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.05,
        "restriction": "heavyTank SPG",
        "specValue": 1.075
      }
    ]
  },
  {
    "id": "improvedVentilation_tier3",
    "index": 75,
    "name": "Улучшенная вентиляция (Класс 3)",
    "tags": "ventilation armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "categories": "firepower mobility stealth survivability",
    "include_tags": "improvedVentilation_class3_user",
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.05,
        "specValue": 1.06
      }
    ]
  },
  {
    "id": "improvedVentilation_tier2",
    "index": 76,
    "name": "Улучшенная вентиляция (Класс 2)",
    "tags": "ventilation armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "categories": "firepower mobility stealth survivability",
    "include_tags": "improvedVentilation_class2_user",
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.05,
        "specValue": 1.06
      }
    ]
  },
  {
    "id": "improvedVentilation_tier1",
    "index": 77,
    "name": "Улучшенная вентиляция (Класс 1)",
    "tags": "ventilation armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "categories": "firepower mobility stealth survivability",
    "include_tags": "improvedVentilation_class1_user",
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.05,
        "specValue": 1.06
      }
    ]
  },
  {
    "id": "grousers_tier3",
    "index": 78,
    "name": "Дополнительные грунтозацепы (Класс 3)",
    "tags": "grousers mobility",
    "icon": "grousers",
    "categories": "mobility",
    "min_tier": 2,
    "max_tier": 4,
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "factors": [
      {
        "type": "vehicleAllGroundRotationSpeed",
        "desc": "к скорости поворота ходовой",
        "value": 1.15,
        "specValue": 1.2
      },
      {
        "type": "vehicleSpeedGain",
        "desc": "к сохранению набранной скорости во время пересечения всех типов местности",
        "value": 1.1,
        "specValue": 1.15
      }
    ]
  },
  {
    "id": "grousers_tier2",
    "index": 79,
    "name": "Дополнительные грунтозацепы (Класс 2)",
    "tags": "grousers mobility",
    "icon": "grousers",
    "categories": "mobility",
    "min_tier": 5,
    "max_tier": 7,
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "factors": [
      {
        "type": "vehicleAllGroundRotationSpeed",
        "desc": "к скорости поворота ходовой",
        "value": 1.15,
        "specValue": 1.2
      },
      {
        "type": "vehicleSpeedGain",
        "desc": "к сохранению набранной скорости во время пересечения всех типов местности",
        "value": 1.1,
        "specValue": 1.15
      }
    ]
  },
  {
    "id": "grousers_tier1",
    "index": 80,
    "name": "Дополнительные грунтозацепы (Класс 1)",
    "tags": "grousers mobility",
    "icon": "grousers",
    "categories": "mobility",
    "min_tier": 8,
    "max_tier": 11,
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "factors": [
      {
        "type": "vehicleAllGroundRotationSpeed",
        "desc": "к скорости поворота ходовой",
        "value": 1.15,
        "specValue": 1.2
      },
      {
        "type": "vehicleSpeedGain",
        "desc": "к сохранению набранной скорости во время пересечения всех типов местности",
        "value": 1.1,
        "specValue": 1.15
      }
    ]
  },
  {
    "id": "tankRammer_tier2",
    "index": 81,
    "name": "Орудийный досылатель (Класс 2)",
    "tags": "rammer firepower",
    "icon": "rammer",
    "categories": "firepower",
    "include_tags": "tankRammer_class2_user",
    "factors": [
      {
        "type": "vehicleGunReloadTime",
        "desc": "от времени заряжания",
        "value": 0.9,
        "specValue": 0.885
      }
    ]
  },
  {
    "id": "tankRammer_tier1",
    "index": 82,
    "name": "Орудийный досылатель (Класс 1)",
    "tags": "rammer firepower",
    "icon": "rammer",
    "categories": "firepower",
    "include_tags": "tankRammer_class1_user",
    "factors": [
      {
        "type": "vehicleGunReloadTime",
        "desc": "от времени заряжания",
        "value": 0.9,
        "specValue": 0.885
      }
    ]
  },
  {
    "id": "enhancedAimDrives_tier3",
    "index": 83,
    "name": "Усиленные приводы наводки (Класс 3)",
    "tags": "enhancedAimDrives firepower",
    "icon": "enhancedAimDrives",
    "categories": "firepower",
    "min_tier": 2,
    "max_tier": 4,
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.1,
        "specValue": 1.115
      }
    ]
  },
  {
    "id": "enhancedAimDrives_tier2",
    "index": 84,
    "name": "Усиленные приводы наводки (Класс 2)",
    "tags": "enhancedAimDrives firepower",
    "icon": "enhancedAimDrives",
    "categories": "firepower",
    "min_tier": 5,
    "max_tier": 7,
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.1,
        "specValue": 1.115
      }
    ]
  },
  {
    "id": "enhancedAimDrives_tier1",
    "index": 85,
    "name": "Усиленные приводы наводки (Класс 1)",
    "tags": "enhancedAimDrives firepower",
    "icon": "enhancedAimDrives",
    "categories": "firepower",
    "min_tier": 8,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.1,
        "specValue": 1.115
      }
    ]
  },
  {
    "id": "aimingStabilizer_tier2",
    "index": 86,
    "name": "Стабилизатор вертикальной наводки (Класс 2)",
    "tags": "aimingStabilizer firepower",
    "icon": "aimingStabilizer",
    "categories": "firepower",
    "include_tags": "aimingStabilizer_class2_user",
    "factors": [
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.8,
        "specValue": 0.77
      }
    ]
  },
  {
    "id": "aimingStabilizer_tier1",
    "index": 87,
    "name": "Стабилизатор вертикальной наводки (Класс 1)",
    "tags": "aimingStabilizer firepower",
    "icon": "aimingStabilizer",
    "categories": "firepower",
    "include_tags": "aimingStabilizer_class1_user",
    "factors": [
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.8,
        "specValue": 0.77
      }
    ]
  },
  {
    "id": "additionalInvisibilityDevice_tier3",
    "index": 88,
    "name": "Малошумная система выхлопа (Класс 3)",
    "tags": "additInvisibilityDevice",
    "icon": "additionalInvisibilityDevice",
    "categories": "stealth",
    "min_tier": 2,
    "max_tier": 4,
    "factors": [
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.06,
        "restriction": "lightTank mediumTank",
        "specValue": 1.08
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.05,
        "restriction": "AT-SPG",
        "specValue": 1.06
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.03,
        "restriction": "heavyTank SPG",
        "specValue": 1.04
      }
    ]
  },
  {
    "id": "additionalInvisibilityDevice_tier2",
    "index": 89,
    "name": "Малошумная система выхлопа (Класс 2)",
    "tags": "additInvisibilityDevice",
    "icon": "additionalInvisibilityDevice",
    "categories": "stealth",
    "min_tier": 5,
    "max_tier": 7,
    "factors": [
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.06,
        "restriction": "lightTank mediumTank",
        "specValue": 1.08
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.05,
        "restriction": "AT-SPG",
        "specValue": 1.06
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.03,
        "restriction": "heavyTank SPG",
        "specValue": 1.04
      }
    ]
  },
  {
    "id": "additionalInvisibilityDevice_tier1",
    "index": 90,
    "name": "Малошумная система выхлопа (Класс 1)",
    "tags": "additInvisibilityDevice",
    "icon": "additionalInvisibilityDevice",
    "categories": "stealth",
    "min_tier": 8,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.06,
        "restriction": "lightTank mediumTank",
        "specValue": 1.08
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.05,
        "restriction": "AT-SPG",
        "specValue": 1.06
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.03,
        "restriction": "heavyTank SPG",
        "specValue": 1.04
      }
    ]
  },
  {
    "id": "extraHealthReserve_tier3",
    "index": 91,
    "name": "Улучшенная закалка (Класс 3)",
    "tags": "healthReserve",
    "icon": "extraHealthReserve",
    "categories": "survivability",
    "include_tags": "extraHealthReserve_class3_user",
    "factors": [
      {
        "type": "vehicleStrength",
        "desc": "к запасу прочности машины",
        "value": 1.08,
        "specValue": 1.1
      },
      {
        "type": "vehicleChassisStrength",
        "desc": "к прочности ходовой",
        "value": 1.5,
        "specValue": 1.65
      },
      {
        "type": "vehicleChassisRepairSpeed",
        "desc": "к скорости ремонта ходовой",
        "value": 1.15,
        "specValue": 1.2
      },
      {
        "type": "vehicleChassisFallDamage",
        "desc": "от урона при падении",
        "value": 0.5,
        "specValue": 0.35
      }
    ]
  },
  {
    "id": "extraHealthReserve_tier2",
    "index": 92,
    "name": "Улучшенная закалка (Класс 2)",
    "tags": "healthReserve",
    "icon": "extraHealthReserve",
    "categories": "survivability",
    "include_tags": "extraHealthReserve_class2_user",
    "factors": [
      {
        "type": "vehicleStrength",
        "desc": "к запасу прочности машины",
        "value": 1.08,
        "specValue": 1.1
      },
      {
        "type": "vehicleChassisStrength",
        "desc": "к прочности ходовой",
        "value": 1.5,
        "specValue": 1.65
      },
      {
        "type": "vehicleChassisRepairSpeed",
        "desc": "к скорости ремонта ходовой",
        "value": 1.15,
        "specValue": 1.2
      },
      {
        "type": "vehicleChassisFallDamage",
        "desc": "от урона при падении",
        "value": 0.5,
        "specValue": 0.35
      }
    ]
  },
  {
    "id": "extraHealthReserve_tier1",
    "index": 93,
    "name": "Улучшенная закалка (Класс 1)",
    "tags": "healthReserve",
    "icon": "extraHealthReserve",
    "categories": "survivability",
    "include_tags": "extraHealthReserve_class1_user",
    "factors": [
      {
        "type": "vehicleStrength",
        "desc": "к запасу прочности машины",
        "value": 1.08,
        "specValue": 1.1
      },
      {
        "type": "vehicleChassisStrength",
        "desc": "к прочности ходовой",
        "value": 1.5,
        "specValue": 1.65
      },
      {
        "type": "vehicleChassisRepairSpeed",
        "desc": "к скорости ремонта ходовой",
        "value": 1.15,
        "specValue": 1.2
      },
      {
        "type": "vehicleChassisFallDamage",
        "desc": "от урона при падении",
        "value": 0.5,
        "specValue": 0.35
      }
    ]
  },
  {
    "id": "improvedRadioCommunication",
    "index": 94,
    "name": "Улучшенное радиооборудование",
    "icon": "improvedRadioCommunication",
    "categories": "stealth",
    "min_tier": 8,
    "max_tier": 11,
    "include_tags": "lightTank mediumTank",
    "factors": [
      {
        "type": "vehicleEnemySpottingTime",
        "desc": "ко времени отображения обнаруженного\\nвами противника",
        "value": 1.5,
        "specValue": 2
      },
      {
        "type": "vehicleOwnSpottingTime",
        "desc": "от времени вашей видимости",
        "value": -1.5,
        "specValue": -2
      }
    ]
  },
  {
    "id": "improvedRotationMechanism_tier2",
    "index": 95,
    "name": "Улучшенные механизмы поворота (Класс 2)",
    "tags": "rotationMechanism",
    "icon": "improvedRotationMechanism",
    "categories": "firepower mobility",
    "min_tier": 5,
    "max_tier": 7,
    "factors": [
      {
        "type": "vehicleTurretOrCuttingRotationSpeed",
        "desc": "к скорости поворота башни или горизонтального наведения орудия для машин с неподвижной рубкой",
        "value": 1.1,
        "specValue": 1.125
      },
      {
        "type": "vehicleAllGroundRotationSpeed",
        "desc": "к скорости поворота ходовой",
        "value": 1.1,
        "specValue": 1.125
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.9,
        "specValue": 0.875
      }
    ]
  },
  {
    "id": "improvedRotationMechanism_tier1",
    "index": 96,
    "name": "Улучшенные механизмы поворота (Класс 1)",
    "tags": "rotationMechanism",
    "icon": "improvedRotationMechanism",
    "categories": "firepower mobility",
    "min_tier": 8,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleTurretOrCuttingRotationSpeed",
        "desc": "к скорости поворота башни или горизонтального наведения орудия для машин с неподвижной рубкой",
        "value": 1.1,
        "specValue": 1.125
      },
      {
        "type": "vehicleAllGroundRotationSpeed",
        "desc": "к скорости поворота ходовой",
        "value": 1.1,
        "specValue": 1.125
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.9,
        "specValue": 0.875
      }
    ]
  },
  {
    "id": "turbocharger_tier3",
    "index": 97,
    "name": "Турбонагнетатель (Класс 3)",
    "tags": "turbocharger",
    "icon": "turbocharger",
    "categories": "mobility",
    "min_tier": 2,
    "max_tier": 4,
    "factors": [
      {
        "type": "vehicleEnginePower",
        "desc": "к мощности двигателя",
        "value": 1.075,
        "specValue": 1.1
      },
      {
        "type": "vehicleForwardMaxSpeed",
        "desc": "к максимальной скорости вперёд",
        "value": 4,
        "specValue": 5
      },
      {
        "type": "vehicleBackwardMaxSpeed",
        "desc": "к максимальной скорости назад",
        "value": 2,
        "specValue": 3
      }
    ]
  },
  {
    "id": "turbocharger_tier2",
    "index": 98,
    "name": "Турбонагнетатель (Класс 2)",
    "tags": "turbocharger",
    "icon": "turbocharger",
    "categories": "mobility",
    "min_tier": 5,
    "max_tier": 7,
    "factors": [
      {
        "type": "vehicleEnginePower",
        "desc": "к мощности двигателя",
        "value": 1.075,
        "specValue": 1.1
      },
      {
        "type": "vehicleForwardMaxSpeed",
        "desc": "к максимальной скорости вперёд",
        "value": 4,
        "specValue": 5
      },
      {
        "type": "vehicleBackwardMaxSpeed",
        "desc": "к максимальной скорости назад",
        "value": 2,
        "specValue": 3
      }
    ]
  },
  {
    "id": "turbocharger_tier1",
    "index": 99,
    "name": "Турбонагнетатель (Класс 1)",
    "tags": "turbocharger",
    "icon": "turbocharger",
    "categories": "mobility",
    "min_tier": 8,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleEnginePower",
        "desc": "к мощности двигателя",
        "value": 1.075,
        "specValue": 1.1
      },
      {
        "type": "vehicleForwardMaxSpeed",
        "desc": "к максимальной скорости вперёд",
        "value": 4,
        "specValue": 5
      },
      {
        "type": "vehicleBackwardMaxSpeed",
        "desc": "к максимальной скорости назад",
        "value": 2,
        "specValue": 3
      }
    ]
  },
  {
    "id": "commandersView",
    "index": 100,
    "name": "Командирский обзорный прибор",
    "icon": "commandersView",
    "categories": "stealth",
    "min_tier": 8,
    "max_tier": 11,
    "include_tags": "lightTank mediumTank",
    "factors": [
      {
        "type": "demaskFoliageFactor",
        "desc": "от незаметности противника\\nза растительностью",
        "value": 0.85,
        "specValue": 0.8
      },
      {
        "type": "demaskMovingFactor",
        "desc": "от незаметности противника,\\nнаходящегося в движении",
        "value": 0.9,
        "specValue": 0.875
      }
    ]
  },
  {
    "id": "improvedSights_tier2",
    "index": 101,
    "name": "Улучшенный прицел (Класс 2)",
    "tags": "improvedSights",
    "icon": "improvedSights",
    "categories": "firepower",
    "min_tier": 5,
    "max_tier": 7,
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "factors": [
      {
        "type": "vehicleGunShotFullDispersion",
        "desc": "от размера круга сведения",
        "value": 0.95,
        "specValue": 0.93
      }
    ]
  },
  {
    "id": "improvedSights_tier1",
    "index": 102,
    "name": "Улучшенный прицел (Класс 1)",
    "tags": "improvedSights",
    "icon": "improvedSights",
    "categories": "firepower",
    "min_tier": 8,
    "max_tier": 11,
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "factors": [
      {
        "type": "vehicleGunShotFullDispersion",
        "desc": "от размера круга сведения",
        "value": 0.95,
        "specValue": 0.93
      }
    ]
  },
  {
    "id": "modernizedAimDrivesAimingStabilizer1",
    "index": 150,
    "name": "Система управления огнём Т1",
    "tags": "enhancedAimDrives firepower modernized_1",
    "icon": "modernizedAimDrivesAimingStabilizer",
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user",
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.06
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.93
      }
    ]
  },
  {
    "id": "modernizedAimDrivesAimingStabilizer2",
    "index": 151,
    "name": "Система управления огнём Т2",
    "tags": "enhancedAimDrives firepower modernized_2",
    "icon": "modernizedAimDrivesAimingStabilizer",
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user",
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.08
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.91
      }
    ]
  },
  {
    "id": "modernizedAimDrivesAimingStabilizer3",
    "index": 152,
    "name": "Система управления огнём Т3",
    "tags": "enhancedAimDrives firepower modernized_3",
    "icon": "modernizedAimDrivesAimingStabilizer",
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user",
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.09
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.885
      }
    ]
  },
  {
    "id": "modernizedTurbochargerRotationMechanism1",
    "index": 153,
    "name": "Система повышения мобильности Т1",
    "tags": "turbocharger modernized_1",
    "icon": "modernizedTurbochargerRotationMechanism",
    "min_tier": 5,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleEnginePower",
        "desc": "к мощности двигателя",
        "value": 1.06
      },
      {
        "type": "vehicleTurretOrCuttingRotationSpeed",
        "desc": "к скорости поворота башни или горизонтального наведения орудия для машин с неподвижной рубкой",
        "value": 1.05
      },
      {
        "type": "vehicleAllGroundRotationSpeed",
        "desc": "к скорости поворота ходовой",
        "value": 1.05
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.95
      },
      {
        "type": "vehicleForwardMaxSpeed",
        "desc": "к максимальной скорости вперёд",
        "value": 4
      },
      {
        "type": "vehicleBackwardMaxSpeed",
        "desc": "к максимальной скорости назад",
        "value": 2
      }
    ]
  },
  {
    "id": "modernizedTurbochargerRotationMechanism2",
    "index": 154,
    "name": "Система повышения мобильности Т2",
    "tags": "turbocharger modernized_2",
    "icon": "modernizedTurbochargerRotationMechanism",
    "min_tier": 5,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleEnginePower",
        "desc": "к мощности двигателя",
        "value": 1.075
      },
      {
        "type": "vehicleTurretOrCuttingRotationSpeed",
        "desc": "к скорости поворота башни или горизонтального наведения орудия для машин с неподвижной рубкой",
        "value": 1.06
      },
      {
        "type": "vehicleAllGroundRotationSpeed",
        "desc": "к скорости поворота ходовой",
        "value": 1.06
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.94
      },
      {
        "type": "vehicleForwardMaxSpeed",
        "desc": "к максимальной скорости вперёд",
        "value": 4
      },
      {
        "type": "vehicleBackwardMaxSpeed",
        "desc": "к максимальной скорости назад",
        "value": 3
      }
    ]
  },
  {
    "id": "modernizedTurbochargerRotationMechanism3",
    "index": 155,
    "name": "Система повышения мобильности Т3",
    "tags": "turbocharger modernized_3",
    "icon": "modernizedTurbochargerRotationMechanism",
    "min_tier": 5,
    "max_tier": 11,
    "factors": [
      {
        "type": "vehicleEnginePower",
        "desc": "к мощности двигателя",
        "value": 1.09
      },
      {
        "type": "vehicleTurretOrCuttingRotationSpeed",
        "desc": "к скорости поворота башни или горизонтального наведения орудия для машин с неподвижной рубкой",
        "value": 1.07
      },
      {
        "type": "vehicleAllGroundRotationSpeed",
        "desc": "к скорости поворота ходовой",
        "value": 1.07
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.93
      },
      {
        "type": "vehicleForwardMaxSpeed",
        "desc": "к максимальной скорости вперёд",
        "value": 5
      },
      {
        "type": "vehicleBackwardMaxSpeed",
        "desc": "к максимальной скорости назад",
        "value": 3
      }
    ]
  },
  {
    "id": "modernizedExtraHealthReserveAntifragmentationLining1",
    "index": 156,
    "name": "Комплекс улучшения выживаемости Т1",
    "tags": "healthReserve modernized_1",
    "icon": "modernizedExtraHealthReserveAntifragmentationLining",
    "min_tier": 5,
    "max_tier": 11,
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user",
    "factors": [
      {
        "type": "vehicleStrength",
        "desc": "к запасу прочности машины",
        "value": 1.08
      },
      {
        "type": "vehicleAmmoBayEngineFuelStrength",
        "desc": "к прочности внутренних модулей",
        "value": 1.5
      },
      {
        "type": "vehicleChassisStrength",
        "desc": "к прочности ходовой",
        "value": 1.3
      },
      {
        "type": "vehicleChassisRepairSpeed",
        "desc": "к скорости ремонта ходовой",
        "value": 1.1
      },
      {
        "type": "vehPenaltyForDamageEngineAndCombat",
        "desc": "от штрафа за повреждённые\\nбоеукладку и двигатель",
        "value": 0.7
      }
    ]
  },
  {
    "id": "modernizedExtraHealthReserveAntifragmentationLining2",
    "index": 157,
    "name": "Комплекс улучшения выживаемости Т2",
    "tags": "healthReserve modernized_2",
    "icon": "modernizedExtraHealthReserveAntifragmentationLining",
    "min_tier": 5,
    "max_tier": 11,
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user",
    "factors": [
      {
        "type": "vehicleStrength",
        "desc": "к запасу прочности машины",
        "value": 1.09
      },
      {
        "type": "vehicleAmmoBayEngineFuelStrength",
        "desc": "к прочности внутренних модулей",
        "value": 1.7
      },
      {
        "type": "vehicleChassisStrength",
        "desc": "к прочности ходовой",
        "value": 1.4
      },
      {
        "type": "vehicleChassisRepairSpeed",
        "desc": "к скорости ремонта ходовой",
        "value": 1.15
      },
      {
        "type": "vehPenaltyForDamageEngineAndCombat",
        "desc": "от штрафа за повреждённые\\nбоеукладку и двигатель",
        "value": 0.6
      }
    ]
  },
  {
    "id": "modernizedExtraHealthReserveAntifragmentationLining3",
    "index": 158,
    "name": "Комплекс улучшения выживаемости Т3",
    "tags": "healthReserve modernized_3",
    "icon": "modernizedExtraHealthReserveAntifragmentationLining",
    "min_tier": 5,
    "max_tier": 11,
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user",
    "factors": [
      {
        "type": "vehicleStrength",
        "desc": "к запасу прочности машины",
        "value": 1.11
      },
      {
        "type": "vehicleAmmoBayEngineFuelStrength",
        "desc": "к прочности внутренних модулей",
        "value": 2
      },
      {
        "type": "vehicleChassisStrength",
        "desc": "к прочности ходовой",
        "value": 1.5
      },
      {
        "type": "vehicleChassisRepairSpeed",
        "desc": "к скорости ремонта ходовой",
        "value": 1.25
      },
      {
        "type": "vehPenaltyForDamageEngineAndCombat",
        "desc": "от штрафа за повреждённые\\nбоеукладку и двигатель",
        "value": 0.5
      }
    ]
  }
] as const


export const consumables = [
  {
    "id": "improvedConfigurationBattleBooster",
    "index": 103,
    "name": "Предбоевое ТО",
    "description": "к скорости ремонта при установленном оборудовании «Изменённая компоновка» (любого класса), «Усовершенствованная компоновка» или «Трофейные технологии защиты».",
    "icon": "improvedConfiguration",
    "price": 0,
    "gold_price": 0,
    "crystal_price": 12,
    "effect_type": "FactorBattleBooster",
    "tags": "notForSale equipmentBattleBooster armor",
    "incompatible_tags": "",
    "min_tier": 5,
    "levels": "[{\"attribute\":\"repairSpeed\",\"factor\":\"1.1\",\"incompatible\":\"deluxe\",\"required\":\"improvedConfiguration\"},{\"attribute\":\"repairSpeed\",\"factor\":\"1.1\",\"required\":\"improvedConfiguration deluxe\"}]",
    "kpi_value": 1.1
  },
  {
    "id": "improvedVentilationBattleBooster",
    "index": 104,
    "name": "Продувка воздуховодов",
    "description": "ко всем навыкам всего экипажа при установленном оборудовании «Улучшенная вентиляция» (любого класса), «Система отвода пороховых газов» или «Трофейная вентиляция».",
    "icon": "improvedVentilation",
    "price": 0,
    "gold_price": 0,
    "crystal_price": 12,
    "effect_type": "AdditiveBattleBooster",
    "tags": "notForSale equipmentBattleBooster armor firepower camouflage reconnaissance mobility",
    "incompatible_tags": "",
    "include_tags": "improvedVentilation_class1_user improvedVentilation_class2_user improvedVentilation_class3_user",
    "levels": "[{\"attribute\":\"crewLevelIncrease\",\"incompatible\":\"deluxe\",\"required\":\"ventilation\",\"value\":\"2.5\"},{\"attribute\":\"crewLevelIncrease\",\"required\":\"ventilation deluxe\",\"value\":\"2.5\"}]",
    "kpi_value": 1.025
  },
  {
    "id": "rammerBattleBooster",
    "index": 105,
    "name": "Рациональная боеукладка",
    "description": "от времени заряжания орудия при установленном оборудовании «Досылатель» (любого типа орудия и калибра), «Экспериментальная система заряжания» или «Трофейный досылатель».",
    "icon": "rammer",
    "price": 0,
    "gold_price": 0,
    "crystal_price": 12,
    "effect_type": "FactorBattleBooster",
    "tags": "notForSale equipmentBattleBooster firepower",
    "incompatible_tags": "",
    "include_tags": "tankRammer_class1_user tankRammer_class2_user",
    "levels": "[{\"attribute\":\"gun/reloadTime\",\"factor\":\"0.972\",\"incompatible\":\"deluxe trophyUpgraded\",\"required\":\"rammer\"},{\"attribute\":\"gun/reloadTime\",\"factor\":\"0.971\",\"required\":\"rammer deluxe\"},{\"attribute\":\"gun/reloadTime\",\"factor\":\"0.971\",\"required\":\"rammer trophyUpgraded\"}]",
    "kpi_value": 0.975
  },
  {
    "id": "coatedOpticsBattleBooster",
    "index": 106,
    "name": "Калибровка оптики",
    "description": "к радиусу обзора, но не более 445 м, при установленном оборудовании «Просветлённая оптика» (любого класса), «Юстированная оптика» или «Трофейная оптика».",
    "icon": "coatedOptics",
    "price": 0,
    "gold_price": 0,
    "crystal_price": 12,
    "effect_type": "FactorBattleBooster",
    "tags": "notForSale equipmentBattleBooster reconnaissance",
    "incompatible_tags": "",
    "levels": "[{\"attribute\":\"circularVisionRadius\",\"factor\":\"1.023\",\"incompatible\":\"deluxe\",\"required\":\"coatedOptics\"},{\"attribute\":\"circularVisionRadius\",\"factor\":\"1.022\",\"required\":\"coatedOptics deluxe\"}]",
    "kpi_value": 1.025
  },
  {
    "id": "aimingStabilizerBattleBooster",
    "index": 107,
    "name": "Смазка стабилизаторов",
    "description": "от разброса после выстрела, при движении и повороте башни с установленным оборудованием «Стабилизатор вертикальной наводки», «Комплекс стабилизационного оборудования» или «Трофейный стабилизатор».",
    "icon": "aimingStabilizer",
    "price": 0,
    "gold_price": 0,
    "crystal_price": 12,
    "effect_type": "FactorBattleBooster",
    "tags": "notForSale equipmentBattleBooster firepower",
    "incompatible_tags": "",
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user",
    "levels": "[{\"attribute\":\"additiveShotDispersionFactor\",\"factor\":\"0.938\",\"incompatible\":\"deluxe\",\"required\":\"aimingStabilizer\"},{\"attribute\":\"additiveShotDispersionFactor\",\"factor\":\"0.933\",\"required\":\"aimingStabilizer deluxe\"}]",
    "kpi_value": 0.95
  },
  {
    "id": "enhancedAimDrivesBattleBooster",
    "index": 108,
    "name": "Настройка прицела",
    "description": "к скорости сведения при установленном оборудовании «Усиленные приводы наводки» (любого класса), «Износостойкие приводы наводки», «Трофейные приводы наводки» или «Система управления огнём».",
    "icon": "enhancedAimDrives",
    "price": 0,
    "gold_price": 0,
    "crystal_price": 12,
    "effect_type": "FactorBattleBooster",
    "tags": "notForSale equipmentBattleBooster firepower",
    "incompatible_tags": "",
    "levels": "[{\"attribute\":\"gun/aimingTime\",\"factor\":\"0.978\",\"incompatible\":\"deluxe trophyUpgraded\",\"required\":\"enhancedAimDrives\"},{\"attribute\":\"gun/aimingTime\",\"factor\":\"0.98\",\"required\":\"enhancedAimDrives deluxe\"},{\"attribute\":\"gun/aimingTime\",\"factor\":\"0.98\",\"required\":\"enhancedAimDrives trophyUpgraded\"}]",
    "kpi_value": 1.025
  },
  {
    "id": "camouflageBattleBooster",
    "index": 109,
    "name": "Укрытия на местности",
    "description": "",
    "icon": "naturalCover",
    "price": 10000,
    "gold_price": 0,
    "crystal_price": 0,
    "effect_type": "FactorSkillBattleBooster",
    "tags": "notForSale crewSkillBattleBooster camouflage",
    "incompatible_tags": "",
    "skill_name": "camouflage",
    "efficiency_factor": 1.1,
    "kpi_value": ""
  },
  {
    "id": "smoothTurretBattleBooster",
    "index": 110,
    "name": "Без резких движений",
    "description": "",
    "icon": "gunner_smoothTurret",
    "price": 10000,
    "gold_price": 0,
    "crystal_price": 0,
    "effect_type": "SkillEquipment",
    "tags": "notForSale crewSkillBattleBooster firepower",
    "incompatible_tags": "",
    "skill_name": "gunner_smoothTurret",
    "kpi_value": ""
  },
  {
    "id": "virtuosoBattleBooster",
    "index": 111,
    "name": "Полоса препятствий",
    "description": "",
    "icon": "driver_virtuoso",
    "price": 10000,
    "gold_price": 0,
    "crystal_price": 0,
    "effect_type": "SkillEquipment",
    "tags": "notForSale crewSkillBattleBooster mobility",
    "incompatible_tags": "",
    "skill_name": "driver_virtuoso",
    "kpi_value": ""
  },
  {
    "id": "smoothDrivingBattleBooster",
    "index": 112,
    "name": "Тонкости работы КПП",
    "description": "",
    "icon": "driver_smoothDriving",
    "price": 10000,
    "gold_price": 0,
    "crystal_price": 0,
    "effect_type": "SkillEquipment",
    "tags": "notForSale crewSkillBattleBooster firepower",
    "incompatible_tags": "",
    "skill_name": "driver_smoothDriving",
    "kpi_value": ""
  },
  {
    "id": "fireFightingBattleBooster",
    "index": 113,
    "name": "Искусство сбивать пламя",
    "description": "",
    "icon": "fireFighting",
    "price": 10000,
    "gold_price": 0,
    "crystal_price": 0,
    "effect_type": "FactorSkillBattleBooster",
    "tags": "notForSale crewSkillBattleBooster armor",
    "incompatible_tags": "",
    "skill_name": "fireFighting",
    "efficiency_factor": 1.5,
    "kpi_value": ""
  },
  {
    "id": "sixthSenseBattleBooster",
    "index": 114,
    "name": "Повышенное внимание",
    "description": "",
    "icon": "commander_sixthSense",
    "price": 10000,
    "gold_price": 0,
    "crystal_price": 0,
    "effect_type": "SixthSenseBattleBooster",
    "tags": "notForSale crewSkillBattleBooster armor notBuyWhenAutoEquip hideIfNotInShop builtinPerkBooster",
    "incompatible_tags": "",
    "skill_name": "commander_sixthSense",
    "kpi_value": ""
  },
  {
    "id": "rancorousBattleBooster",
    "index": 115,
    "name": "Концентрация на цели",
    "description": "",
    "icon": "gunner_rancorous",
    "price": 10000,
    "gold_price": 0,
    "crystal_price": 0,
    "effect_type": "SkillEquipment",
    "tags": "notForSale crewSkillBattleBooster reconnaissance",
    "incompatible_tags": "",
    "skill_name": "gunner_rancorous",
    "kpi_value": ""
  },
  {
    "id": "pedantBattleBooster",
    "index": 116,
    "name": "Разложить снаряды",
    "description": "",
    "icon": "loader_pedant",
    "price": 10000,
    "gold_price": 0,
    "crystal_price": 0,
    "effect_type": "SkillEquipment",
    "tags": "notForSale crewSkillBattleBooster armor",
    "incompatible_tags": "",
    "skill_name": "loader_pedant",
    "kpi_value": ""
  },
  {
    "id": "lastEffortBattleBooster",
    "index": 117,
    "name": "Долг превыше всего",
    "description": "",
    "icon": "radioman_lastEffort",
    "price": 10000,
    "gold_price": 0,
    "crystal_price": 0,
    "effect_type": "LastEffortBattleBooster",
    "tags": "notForSale crewSkillBattleBooster reconnaissance",
    "incompatible_tags": "",
    "skill_name": "radioman_lastEffort",
    "kpi_value": ""
  },
  {
    "id": "turbochargerBattleBooster",
    "index": 202,
    "name": "Замена топливных фильтров",
    "description": "к мощности двигателя при установленном оборудовании «Турбонагнетатель» (любого класса), «Трофейный турбонагнетатель», «Улучшенный компрессор» или «Система повышения мобильности».",
    "icon": "turbocharger",
    "price": 0,
    "gold_price": 0,
    "crystal_price": 12,
    "effect_type": "FactorBattleBooster",
    "tags": "notForSale equipmentBattleBooster turbocharger notBuyWhenAutoEquip",
    "incompatible_tags": "",
    "levels": "[{\"attribute\":\"engine/power\",\"factor\":\"1.037\",\"incompatible\":\"deluxe trophyUpgraded\",\"required\":\"turbocharger\"},{\"attribute\":\"engine/power\",\"factor\":\"1.036\",\"required\":\"turbocharger deluxe\"},{\"attribute\":\"engine/power\",\"factor\":\"1.036\",\"required\":\"turbocharger trophyUpgraded\"}]",
    "kpi_value": 1.04
  },
  {
    "id": "improvedSightsBattleBooster",
    "index": 203,
    "name": "Очистка линз",
    "description": "от размера круга сведения при установленном оборудовании «Улучшенный прицел» (любого класса) или «Трофейный прицел».",
    "icon": "improvedSights",
    "price": 0,
    "gold_price": 0,
    "crystal_price": 12,
    "effect_type": "FactorBattleBooster",
    "tags": "notForSale equipmentBattleBooster improvedSights notBuyWhenAutoEquip",
    "incompatible_tags": "",
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "levels": "[{\"attribute\":\"multShotDispersionFactor\",\"factor\":\"0.979\",\"incompatible\":\"deluxe trophyUpgraded\",\"required\":\"improvedSights\"},{\"attribute\":\"multShotDispersionFactor\",\"factor\":\"0.978\",\"required\":\"improvedSights trophyUpgraded\"}]",
    "kpi_value": 0.98
  },
  {
    "id": "additInvisibilityDeviceBattleBooster",
    "index": 204,
    "name": "Асбестовая обмотка",
    "description": "к незаметности как неподвижной машины, так и движущейся при установленном оборудовании «Малошумная система выхлопа» (любого класса) или «Трофейная система выхлопа».",
    "icon": "additionalInvisibilityDevice",
    "price": 0,
    "gold_price": 0,
    "crystal_price": 12,
    "effect_type": "InvisibilityBattleBooster",
    "tags": "notForSale equipmentBattleBooster additInvisibilityDevice notBuyWhenAutoEquip",
    "incompatible_tags": "",
    "levels": "[{\"attribute\":\"invisibility\",\"factors\":\"0.02 1.0\",\"required\":\"additInvisibilityDevice\"}]",
    "kpi_value": 1.02
  }
] as const 