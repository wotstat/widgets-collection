export const equipment = [
  {
    "id": "deluxImprovedConfiguration",
    "index": 43,
    "name": "Усовершенствованная компоновка",
    "desc": "",
    "tags": "improvedConfiguration deluxe armor",
    "icon": "improvedConfiguration",
    "price": 0,
    "crystal_price": 5000,
    "weight": 0,
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
        "desc": "от штрафа за повреждённые боеукладку и двигатель",
        "value": 0.3
      },
      {
        "type": "vehicleFireChance",
        "desc": "от шанса возгорания двигателя",
        "value": 0.3
      }
    ],
    "min_tier": 5
  },
  {
    "id": "deluxImprovedVentilation",
    "index": 44,
    "name": "Система отвода пороховых газов",
    "desc": "",
    "tags": "ventilation deluxe armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "price": 0,
    "crystal_price": 5000,
    "weight": 0,
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.085
      }
    ],
    "include_tags": "improvedVentilation_class1_user improvedVentilation_class2_user improvedVentilation_class3_user"
  },
  {
    "id": "deluxRammer",
    "index": 45,
    "name": "Экспериментальная система заряжания",
    "desc": "",
    "tags": "rammer deluxe firepower",
    "icon": "rammer",
    "price": 0,
    "crystal_price": 5000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunReloadTime",
        "desc": "от времени заряжания",
        "value": 0.865
      }
    ],
    "include_tags": "tankRammer_class1_user tankRammer_class2_user"
  },
  {
    "id": "deluxCoatedOptics",
    "index": 46,
    "name": "Юстированная оптика",
    "desc": "",
    "tags": "coatedOptics deluxe reconnaissance",
    "icon": "coatedOptics",
    "price": 0,
    "crystal_price": 5000,
    "weight": 0,
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
    "desc": "",
    "tags": "aimingStabilizer deluxe firepower",
    "icon": "aimingStabilizer",
    "price": 0,
    "crystal_price": 5000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.725
      }
    ],
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user"
  },
  {
    "id": "deluxEnhancedAimDrives",
    "index": 48,
    "name": "Износостойкие приводы наводки",
    "desc": "",
    "tags": "enhancedAimDrives deluxe firepower",
    "icon": "enhancedAimDrives",
    "price": 0,
    "crystal_price": 5000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.135
      }
    ]
  },
  {
    "id": "trophyBasicAimDrives",
    "index": 50,
    "name": "Трофейные приводы наводки",
    "desc": "",
    "tags": "enhancedAimDrives firepower trophyBasic",
    "icon": "enhancedAimDrives",
    "price": 100000,
    "weight": 0,
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
    "desc": "",
    "tags": "enhancedAimDrives firepower trophyUpgraded",
    "icon": "enhancedAimDrives",
    "price": 100000,
    "weight": 0,
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
    "desc": "",
    "tags": "rammer firepower trophyBasic",
    "icon": "rammer",
    "price": 100000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunReloadTime",
        "desc": "от времени заряжания",
        "value": 0.9
      }
    ],
    "include_tags": "tankRammer_class1_user tankRammer_class2_user"
  },
  {
    "id": "trophyUpgradedTankRammer",
    "index": 53,
    "name": "Трофейный досылатель",
    "desc": "",
    "tags": "rammer firepower trophyUpgraded",
    "icon": "rammer",
    "price": 100000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunReloadTime",
        "desc": "от времени заряжания",
        "value": 0.875
      }
    ],
    "include_tags": "tankRammer_class1_user tankRammer_class2_user"
  },
  {
    "id": "trophyBasicImprovedVentilation",
    "index": 54,
    "name": "Трофейная вентиляция",
    "desc": "",
    "tags": "ventilation trophyBasic armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "price": 100000,
    "weight": 0,
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.05
      }
    ],
    "include_tags": "improvedVentilation_class1_user improvedVentilation_class2_user improvedVentilation_class3_user"
  },
  {
    "id": "trophyUpgradedImprovedVentilation",
    "index": 55,
    "name": "Трофейная вентиляция",
    "desc": "",
    "tags": "ventilation trophyUpgraded armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "price": 100000,
    "weight": 0,
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.075
      }
    ],
    "include_tags": "improvedVentilation_class1_user improvedVentilation_class2_user improvedVentilation_class3_user"
  },
  {
    "id": "trophyBasicAimingStabilizer",
    "index": 56,
    "name": "Трофейный стабилизатор",
    "desc": "",
    "tags": "aimingStabilizer trophyBasic firepower",
    "icon": "aimingStabilizer",
    "price": 100000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.8
      }
    ],
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user"
  },
  {
    "id": "trophyUpgradedAimingStabilizer",
    "index": 57,
    "name": "Трофейный стабилизатор",
    "desc": "",
    "tags": "aimingStabilizer trophyUpgraded firepower",
    "icon": "aimingStabilizer",
    "price": 100000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.75
      }
    ],
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user"
  },
  {
    "id": "trophyBasicCoatedOptics",
    "index": 58,
    "name": "Трофейная оптика",
    "desc": "",
    "tags": "coatedOptics trophyBasic reconnaissance",
    "icon": "coatedOptics",
    "price": 100000,
    "weight": 0,
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
    "desc": "",
    "tags": "coatedOptics trophyUpgraded reconnaissance",
    "icon": "coatedOptics",
    "price": 100000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleCircularVisionRadius",
        "desc": "к обзору (не более 445 метров)",
        "value": 1.125
      }
    ]
  },
  {
    "id": "improvedConfiguration_tier2",
    "index": 61,
    "name": "Изменённая компоновка (Класс 2)",
    "desc": "",
    "categories": "survivability",
    "tags": "improvedConfiguration armor",
    "icon": "improvedConfiguration",
    "price": 200000,
    "weight": 0,
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
        "desc": "от штрафа за повреждённые боеукладку и двигатель",
        "value": 0.5,
        "specValue": 0.35
      },
      {
        "type": "vehicleFireChance",
        "desc": "от шанса возгорания двигателя",
        "value": 0.5,
        "specValue": 0.35
      }
    ],
    "min_tier": 5,
    "max_tier": 7
  },
  {
    "id": "improvedConfiguration_tier1",
    "index": 62,
    "name": "Изменённая компоновка (Класс 1)",
    "desc": "",
    "categories": "survivability",
    "tags": "improvedConfiguration armor",
    "icon": "improvedConfiguration",
    "price": 600000,
    "weight": 0,
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
        "desc": "от штрафа за повреждённые боеукладку и двигатель",
        "value": 0.5,
        "specValue": 0.35
      },
      {
        "type": "vehicleFireChance",
        "desc": "от шанса возгорания двигателя",
        "value": 0.5,
        "specValue": 0.35
      }
    ],
    "min_tier": 8,
    "max_tier": 10
  },
  {
    "id": "antifragmentationLining_tier4",
    "index": 63,
    "name": "Лёгкий противоосколочный подбой",
    "desc": "",
    "categories": "survivability",
    "tags": "antifragmentationLining armor",
    "icon": "antifragmentationLining",
    "price": 50000,
    "weight": 0,
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
    ],
    "include_tags": "antifragmentationLining_light_user"
  },
  {
    "id": "antifragmentationLining_tier3",
    "index": 64,
    "name": "Средний противоосколочный подбой",
    "desc": "",
    "categories": "survivability",
    "tags": "antifragmentationLining armor",
    "icon": "antifragmentationLining",
    "price": 200000,
    "weight": 0,
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
    ],
    "include_tags": "antifragmentationLining_medium_user"
  },
  {
    "id": "antifragmentationLining_tier2",
    "index": 65,
    "name": "Тяжёлый противоосколочный подбой",
    "desc": "",
    "categories": "survivability",
    "tags": "antifragmentationLining armor",
    "icon": "antifragmentationLining",
    "price": 500000,
    "weight": 0,
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
    ],
    "include_tags": "antifragmentationLining_heavy_user"
  },
  {
    "id": "antifragmentationLining_tier1",
    "index": 66,
    "name": "Сверхтяжёлый противоосколочный подбой",
    "desc": "",
    "categories": "survivability",
    "tags": "antifragmentationLining armor",
    "icon": "antifragmentationLining",
    "price": 750000,
    "weight": 0,
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
    ],
    "include_tags": "antifragmentationLining_superheavy_user"
  },
  {
    "id": "stereoscope_tier3",
    "index": 67,
    "name": "Стереотруба (Класс 3)",
    "desc": "",
    "categories": "stealth",
    "tags": "stereoscope reconnaissance",
    "icon": "stereoscope",
    "price": 50000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleStillCircularVisionRadius",
        "desc": "к обзору из неподвижной машины (не более 445 метров)",
        "value": 1.25,
        "specValue": 1.275
      }
    ],
    "min_tier": 2,
    "max_tier": 4
  },
  {
    "id": "stereoscope_tier2",
    "index": 68,
    "name": "Стереотруба (Класс 2)",
    "desc": "",
    "categories": "stealth",
    "tags": "stereoscope reconnaissance",
    "icon": "stereoscope",
    "price": 200000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleStillCircularVisionRadius",
        "desc": "к обзору из неподвижной машины (не более 445 метров)",
        "value": 1.25,
        "specValue": 1.275
      }
    ],
    "min_tier": 5,
    "max_tier": 7
  },
  {
    "id": "stereoscope_tier1",
    "index": 69,
    "name": "Стереотруба (Класс 1)",
    "desc": "",
    "categories": "stealth",
    "tags": "stereoscope reconnaissance",
    "icon": "stereoscope",
    "price": 600000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleStillCircularVisionRadius",
        "desc": "к обзору из неподвижной машины (не более 445 метров)",
        "value": 1.25,
        "specValue": 1.275
      }
    ],
    "min_tier": 8,
    "max_tier": 10
  },
  {
    "id": "coatedOptics_tier3",
    "index": 70,
    "name": "Просветлённая оптика (Класс 3)",
    "desc": "",
    "categories": "stealth",
    "tags": "coatedOptics reconnaissance",
    "icon": "coatedOptics",
    "price": 50000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleCircularVisionRadius",
        "desc": "к обзору (не более 445 метров)",
        "value": 1.1,
        "specValue": 1.115
      }
    ],
    "min_tier": 2,
    "max_tier": 4
  },
  {
    "id": "coatedOptics_tier2",
    "index": 71,
    "name": "Просветлённая оптика (Класс 2)",
    "desc": "",
    "categories": "stealth",
    "tags": "coatedOptics reconnaissance",
    "icon": "coatedOptics",
    "price": 200000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleCircularVisionRadius",
        "desc": "к обзору (не более 445 метров)",
        "value": 1.1,
        "specValue": 1.115
      }
    ],
    "min_tier": 5,
    "max_tier": 7
  },
  {
    "id": "coatedOptics_tier1",
    "index": 72,
    "name": "Просветлённая оптика (Класс 1)",
    "desc": "",
    "categories": "stealth",
    "tags": "coatedOptics reconnaissance",
    "icon": "coatedOptics",
    "price": 600000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleCircularVisionRadius",
        "desc": "к обзору (не более 445 метров)",
        "value": 1.1,
        "specValue": 1.115
      }
    ],
    "min_tier": 8,
    "max_tier": 10
  },
  {
    "id": "camouflageNet_tier3",
    "index": 73,
    "name": "Маскировочная сеть (Класс 3)",
    "desc": "",
    "categories": "stealth",
    "tags": "camouflageNet camouflage",
    "icon": "camouflageNet",
    "price": 50000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.15,
        "specValue": 1.175,
        "restriction": "AT-SPG"
      },
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.1,
        "specValue": 1.125,
        "restriction": "lightTank mediumTank"
      },
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.05,
        "specValue": 1.075,
        "restriction": "heavyTank SPG"
      }
    ],
    "min_tier": 2,
    "max_tier": 4
  },
  {
    "id": "camouflageNet_tier2",
    "index": 74,
    "name": "Маскировочная сеть (Класс 2)",
    "desc": "",
    "categories": "stealth",
    "tags": "camouflageNet camouflage",
    "icon": "camouflageNet",
    "price": 100000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.15,
        "specValue": 1.175,
        "restriction": "AT-SPG"
      },
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.1,
        "specValue": 1.125,
        "restriction": "lightTank mediumTank"
      },
      {
        "type": "vehicleStillCamouflage",
        "desc": "к незаметности неподвижной машины",
        "value": 1.05,
        "specValue": 1.075,
        "restriction": "heavyTank SPG"
      }
    ],
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "improvedVentilation_tier3",
    "index": 75,
    "name": "Улучшенная вентиляция (Класс 3)",
    "desc": "",
    "categories": "firepower mobility stealth survivability",
    "tags": "ventilation armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "price": 50000,
    "weight": 0,
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.05,
        "specValue": 1.06
      }
    ],
    "include_tags": "improvedVentilation_class3_user"
  },
  {
    "id": "improvedVentilation_tier2",
    "index": 76,
    "name": "Улучшенная вентиляция (Класс 2)",
    "desc": "",
    "categories": "firepower mobility stealth survivability",
    "tags": "ventilation armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "price": 200000,
    "weight": 0,
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.05,
        "specValue": 1.06
      }
    ],
    "include_tags": "improvedVentilation_class2_user"
  },
  {
    "id": "improvedVentilation_tier1",
    "index": 77,
    "name": "Улучшенная вентиляция (Класс 1)",
    "desc": "",
    "categories": "firepower mobility stealth survivability",
    "tags": "ventilation armor firepower camouflage reconnaissance mobility",
    "icon": "improvedVentilation",
    "price": 600000,
    "weight": 0,
    "factors": [
      {
        "type": "crewLevel",
        "desc": "ко всем навыкам всего экипажа",
        "value": 1.05,
        "specValue": 1.06
      }
    ],
    "include_tags": "improvedVentilation_class1_user"
  },
  {
    "id": "grousers_tier3",
    "index": 78,
    "name": "Дополнительные грунтозацепы (Класс 3)",
    "desc": "",
    "categories": "mobility",
    "tags": "grousers mobility",
    "icon": "grousers",
    "price": 50000,
    "weight": 0,
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
    ],
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "exclude_tags": "wheeledVehicle",
    "min_tier": 2,
    "max_tier": 4
  },
  {
    "id": "grousers_tier2",
    "index": 79,
    "name": "Дополнительные грунтозацепы (Класс 2)",
    "desc": "",
    "categories": "mobility",
    "tags": "grousers mobility",
    "icon": "grousers",
    "price": 250000,
    "weight": 0,
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
    ],
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "exclude_tags": "wheeledVehicle",
    "min_tier": 5,
    "max_tier": 7
  },
  {
    "id": "grousers_tier1",
    "index": 80,
    "name": "Дополнительные грунтозацепы (Класс 1)",
    "desc": "",
    "categories": "mobility",
    "tags": "grousers mobility",
    "icon": "grousers",
    "price": 500000,
    "weight": 0,
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
    ],
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "exclude_tags": "wheeledVehicle",
    "min_tier": 8,
    "max_tier": 10
  },
  {
    "id": "tankRammer_tier2",
    "index": 81,
    "name": "Орудийный досылатель (Класс 2)",
    "desc": "",
    "categories": "firepower",
    "tags": "rammer firepower",
    "icon": "rammer",
    "price": 300000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunReloadTime",
        "desc": "от времени заряжания",
        "value": 0.9,
        "specValue": 0.885
      }
    ],
    "include_tags": "tankRammer_class2_user"
  },
  {
    "id": "tankRammer_tier1",
    "index": 82,
    "name": "Орудийный досылатель (Класс 1)",
    "desc": "",
    "categories": "firepower",
    "tags": "rammer firepower",
    "icon": "rammer",
    "price": 600000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunReloadTime",
        "desc": "от времени заряжания",
        "value": 0.9,
        "specValue": 0.885
      }
    ],
    "include_tags": "tankRammer_class1_user"
  },
  {
    "id": "enhancedAimDrives_tier3",
    "index": 83,
    "name": "Усиленные приводы наводки (Класс 3)",
    "desc": "",
    "categories": "firepower",
    "tags": "enhancedAimDrives firepower",
    "icon": "enhancedAimDrives",
    "price": 50000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.1,
        "specValue": 1.115
      }
    ],
    "min_tier": 2,
    "max_tier": 4
  },
  {
    "id": "enhancedAimDrives_tier2",
    "index": 84,
    "name": "Усиленные приводы наводки (Класс 2)",
    "desc": "",
    "categories": "firepower",
    "tags": "enhancedAimDrives firepower",
    "icon": "enhancedAimDrives",
    "price": 200000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.1,
        "specValue": 1.115
      }
    ],
    "min_tier": 5,
    "max_tier": 7
  },
  {
    "id": "enhancedAimDrives_tier1",
    "index": 85,
    "name": "Усиленные приводы наводки (Класс 1)",
    "desc": "",
    "categories": "firepower",
    "tags": "enhancedAimDrives firepower",
    "icon": "enhancedAimDrives",
    "price": 600000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.1,
        "specValue": 1.115
      }
    ],
    "min_tier": 8,
    "max_tier": 10
  },
  {
    "id": "aimingStabilizer_tier2",
    "index": 86,
    "name": "Стабилизатор вертикальной наводки (Класс 2)",
    "desc": "",
    "categories": "firepower",
    "tags": "aimingStabilizer firepower",
    "icon": "aimingStabilizer",
    "price": 200000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.8,
        "specValue": 0.77
      }
    ],
    "include_tags": "aimingStabilizer_class2_user"
  },
  {
    "id": "aimingStabilizer_tier1",
    "index": 87,
    "name": "Стабилизатор вертикальной наводки (Класс 1)",
    "desc": "",
    "categories": "firepower",
    "tags": "aimingStabilizer firepower",
    "icon": "aimingStabilizer",
    "price": 600000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.8,
        "specValue": 0.77
      }
    ],
    "include_tags": "aimingStabilizer_class1_user"
  },
  {
    "id": "additionalInvisibilityDevice_tier3",
    "index": 88,
    "name": "Малошумная система выхлопа (Класс 3)",
    "desc": "",
    "categories": "stealth",
    "tags": "additInvisibilityDevice",
    "icon": "additionalInvisibilityDevice",
    "price": 50000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.06,
        "specValue": 1.08,
        "restriction": "lightTank mediumTank"
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.05,
        "specValue": 1.06,
        "restriction": "AT-SPG"
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.03,
        "specValue": 1.04,
        "restriction": "heavyTank SPG"
      }
    ],
    "min_tier": 2,
    "max_tier": 4
  },
  {
    "id": "additionalInvisibilityDevice_tier2",
    "index": 89,
    "name": "Малошумная система выхлопа (Класс 2)",
    "desc": "",
    "categories": "stealth",
    "tags": "additInvisibilityDevice",
    "icon": "additionalInvisibilityDevice",
    "price": 200000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.06,
        "specValue": 1.08,
        "restriction": "lightTank mediumTank"
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.05,
        "specValue": 1.06,
        "restriction": "AT-SPG"
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.03,
        "specValue": 1.04,
        "restriction": "heavyTank SPG"
      }
    ],
    "min_tier": 5,
    "max_tier": 7
  },
  {
    "id": "additionalInvisibilityDevice_tier1",
    "index": 90,
    "name": "Малошумная система выхлопа (Класс 1)",
    "desc": "",
    "categories": "stealth",
    "tags": "additInvisibilityDevice",
    "icon": "additionalInvisibilityDevice",
    "price": 600000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.06,
        "specValue": 1.08,
        "restriction": "lightTank mediumTank"
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.05,
        "specValue": 1.06,
        "restriction": "AT-SPG"
      },
      {
        "type": "vehicleCamouflage",
        "desc": "к незаметности",
        "value": 1.03,
        "specValue": 1.04,
        "restriction": "heavyTank SPG"
      }
    ],
    "min_tier": 8,
    "max_tier": 10
  },
  {
    "id": "extraHealthReserve_tier3",
    "index": 91,
    "name": "Улучшенная закалка (Класс 3)",
    "desc": "",
    "categories": "survivability",
    "tags": "healthReserve",
    "icon": "extraHealthReserve",
    "price": 40000,
    "weight": 0,
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
    ],
    "include_tags": "extraHealthReserve_class3_user"
  },
  {
    "id": "extraHealthReserve_tier2",
    "index": 92,
    "name": "Улучшенная закалка (Класс 2)",
    "desc": "",
    "categories": "survivability",
    "tags": "healthReserve",
    "icon": "extraHealthReserve",
    "price": 200000,
    "weight": 0,
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
    ],
    "include_tags": "extraHealthReserve_class2_user"
  },
  {
    "id": "extraHealthReserve_tier1",
    "index": 93,
    "name": "Улучшенная закалка (Класс 1)",
    "desc": "",
    "categories": "survivability",
    "tags": "healthReserve",
    "icon": "extraHealthReserve",
    "price": 600000,
    "weight": 0,
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
    ],
    "include_tags": "extraHealthReserve_class1_user"
  },
  {
    "id": "improvedRadioCommunication",
    "index": 94,
    "name": "Улучшенное радиооборудование",
    "desc": "",
    "categories": "stealth",
    "icon": "improvedRadioCommunication",
    "price": 600000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleEnemySpottingTime",
        "desc": "ко времени отображения обнаруженного\nвами противника",
        "value": 1.5,
        "specValue": 2
      },
      {
        "type": "vehicleOwnSpottingTime",
        "desc": "от времени вашей видимости",
        "value": -1.5,
        "specValue": -2
      }
    ],
    "include_tags": "lightTank mediumTank",
    "min_tier": 8,
    "max_tier": 10
  },
  {
    "id": "improvedRotationMechanism_tier2",
    "index": 95,
    "name": "Улучшенные механизмы поворота (Класс 2)",
    "desc": "",
    "categories": "firepower mobility",
    "tags": "rotationMechanism",
    "icon": "improvedRotationMechanism",
    "price": 200000,
    "weight": 0,
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
    ],
    "min_tier": 5,
    "max_tier": 7
  },
  {
    "id": "improvedRotationMechanism_tier1",
    "index": 96,
    "name": "Улучшенные механизмы поворота (Класс 1)",
    "desc": "",
    "categories": "firepower mobility",
    "tags": "rotationMechanism",
    "icon": "improvedRotationMechanism",
    "price": 600000,
    "weight": 0,
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
    ],
    "min_tier": 8,
    "max_tier": 10
  },
  {
    "id": "turbocharger_tier3",
    "index": 97,
    "name": "Турбонагнетатель (Класс 3)",
    "desc": "",
    "categories": "mobility",
    "tags": "turbocharger",
    "icon": "turbocharger",
    "price": 50000,
    "weight": 0,
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
    ],
    "min_tier": 2,
    "max_tier": 4
  },
  {
    "id": "turbocharger_tier2",
    "index": 98,
    "name": "Турбонагнетатель (Класс 2)",
    "desc": "",
    "categories": "mobility",
    "tags": "turbocharger",
    "icon": "turbocharger",
    "price": 200000,
    "weight": 0,
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
    ],
    "min_tier": 5,
    "max_tier": 7
  },
  {
    "id": "turbocharger_tier1",
    "index": 99,
    "name": "Турбонагнетатель (Класс 1)",
    "desc": "",
    "categories": "mobility",
    "tags": "turbocharger",
    "icon": "turbocharger",
    "price": 600000,
    "weight": 0,
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
    ],
    "min_tier": 8,
    "max_tier": 10
  },
  {
    "id": "commandersView",
    "index": 100,
    "name": "Командирский обзорный прибор",
    "desc": "",
    "categories": "stealth",
    "icon": "commandersView",
    "price": 600000,
    "weight": 0,
    "factors": [
      {
        "type": "demaskFoliageFactor",
        "desc": "от незаметности противника за растительностью",
        "value": 0.85,
        "specValue": 0.8
      },
      {
        "type": "demaskMovingFactor",
        "desc": "от незаметности противника, находящегося в движении",
        "value": 0.9,
        "specValue": 0.875
      }
    ],
    "include_tags": "lightTank mediumTank",
    "min_tier": 8,
    "max_tier": 10
  },
  {
    "id": "improvedSights_tier2",
    "index": 101,
    "name": "Улучшенный прицел (Класс 2)",
    "desc": "",
    "categories": "firepower",
    "tags": "improvedSights",
    "icon": "improvedSights",
    "price": 200000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunShotFullDispersion",
        "desc": "от размера круга сведения",
        "value": 0.95,
        "specValue": 0.93
      }
    ],
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "min_tier": 5,
    "max_tier": 7
  },
  {
    "id": "improvedSights_tier1",
    "index": 102,
    "name": "Улучшенный прицел (Класс 1)",
    "desc": "",
    "categories": "firepower",
    "tags": "improvedSights",
    "icon": "improvedSights",
    "price": 600000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunShotFullDispersion",
        "desc": "от размера круга сведения",
        "value": 0.95,
        "specValue": 0.93
      }
    ],
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "min_tier": 8,
    "max_tier": 10
  },
  {
    "id": "trophyBasicImprovedConfiguration",
    "index": 105,
    "name": "Трофейные технологии защиты",
    "desc": "",
    "tags": "improvedConfiguration armor trophyBasic",
    "icon": "improvedConfiguration",
    "price": 100000,
    "weight": 0,
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
        "desc": "от штрафа за повреждённые боеукладку и двигатель",
        "value": 0.5
      },
      {
        "type": "vehicleFireChance",
        "desc": "от шанса возгорания двигателя",
        "value": 0.5
      }
    ],
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "trophyUpgradedImprovedConfiguration",
    "index": 106,
    "name": "Трофейные технологии защиты",
    "desc": "",
    "tags": "improvedConfiguration armor trophyUpgraded",
    "icon": "improvedConfiguration",
    "price": 100000,
    "weight": 0,
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
        "desc": "от штрафа за повреждённые боеукладку и двигатель",
        "value": 0.3
      },
      {
        "type": "vehicleFireChance",
        "desc": "от шанса возгорания двигателя",
        "value": 0.3
      }
    ],
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "trophyBasicImprovedRotationMechanism",
    "index": 107,
    "name": "Трофейные механизмы поворота",
    "desc": "",
    "tags": "rotationMechanism trophyBasic",
    "icon": "improvedRotationMechanism",
    "price": 100000,
    "weight": 0,
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
    ],
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "trophyUpgradedImprovedRotationMechanism",
    "index": 108,
    "name": "Трофейные механизмы поворота",
    "desc": "",
    "tags": "rotationMechanism trophyUpgraded",
    "icon": "improvedRotationMechanism",
    "price": 100000,
    "weight": 0,
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
    ],
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "trophyBasicImprovedSights",
    "index": 109,
    "name": "Трофейный прицел",
    "desc": "",
    "tags": "improvedSights trophyBasic firepower",
    "icon": "improvedSights",
    "price": 100000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunShotFullDispersion",
        "desc": "от размера круга сведения",
        "value": 0.95
      }
    ],
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "trophyUpgradedImprovedSights",
    "index": 110,
    "name": "Трофейный прицел",
    "desc": "",
    "tags": "improvedSights trophyUpgraded firepower",
    "icon": "improvedSights",
    "price": 100000,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunShotFullDispersion",
        "desc": "от размера круга сведения",
        "value": 0.92
      }
    ],
    "include_tags": "lightTank mediumTank heavyTank AT-SPG",
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "deluxTurbocharger",
    "index": 111,
    "name": "Улучшенный компрессор",
    "desc": "",
    "tags": "turbocharger deluxe",
    "icon": "turbocharger",
    "price": 0,
    "crystal_price": 5000,
    "weight": 0,
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
    ],
    "min_tier": 2
  },
  {
    "id": "deluxExtraHealthReserve",
    "index": 112,
    "name": "Повышенная снарядостойкость",
    "desc": "",
    "tags": "healthReserve deluxe",
    "icon": "extraHealthReserve",
    "price": 0,
    "crystal_price": 5000,
    "weight": 0,
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
    ],
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user"
  },
  {
    "id": "trophyBasicAdditionalInvisibilityDevice",
    "index": 113,
    "name": "Трофейная система выхлопа",
    "desc": "",
    "tags": "additInvisibilityDevice trophyBasic",
    "icon": "additionalInvisibilityDevice",
    "price": 100000,
    "weight": 0,
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
    "desc": "",
    "tags": "additInvisibilityDevice trophyUpgraded",
    "icon": "additionalInvisibilityDevice",
    "price": 100000,
    "weight": 0,
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
    "desc": "",
    "tags": "turbocharger trophyBasic",
    "icon": "turbocharger",
    "price": 100000,
    "weight": 0,
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
    "desc": "",
    "tags": "turbocharger trophyUpgraded",
    "icon": "turbocharger",
    "price": 100000,
    "weight": 0,
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
    "id": "deluxImprovedRotationMechanism",
    "index": 117,
    "name": "Усовершенствованная бортовая передача",
    "desc": "",
    "tags": "rotationMechanism deluxe",
    "icon": "improvedRotationMechanism",
    "price": 0,
    "crystal_price": 5000,
    "weight": 0,
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
    ],
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "trophyBasicExtraHealthReserve",
    "index": 118,
    "name": "Трофейная закалка",
    "desc": "",
    "tags": "healthReserve trophyBasic",
    "icon": "extraHealthReserve",
    "price": 100000,
    "weight": 0,
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
    ],
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user"
  },
  {
    "id": "trophyUpgradedExtraHealthReserve",
    "index": 119,
    "name": "Трофейная закалка",
    "desc": "",
    "tags": "healthReserve trophyUpgraded",
    "icon": "extraHealthReserve",
    "price": 100000,
    "weight": 0,
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
    ],
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user"
  },
  {
    "id": "modernizedAimDrivesAimingStabilizer1",
    "index": 150,
    "name": "Система управления огнём Т1",
    "desc": "",
    "tags": "enhancedAimDrives firepower modernized_1",
    "icon": "modernizedAimDrivesAimingStabilizer",
    "price": 100,
    "weight": 0,
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
    ],
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user"
  },
  {
    "id": "modernizedAimDrivesAimingStabilizer2",
    "index": 151,
    "name": "Система управления огнём Т2",
    "desc": "",
    "tags": "enhancedAimDrives firepower modernized_2",
    "icon": "modernizedAimDrivesAimingStabilizer",
    "price": 400,
    "weight": 0,
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
    ],
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user"
  },
  {
    "id": "modernizedAimDrivesAimingStabilizer3",
    "index": 152,
    "name": "Система управления огнём Т3",
    "desc": "",
    "tags": "enhancedAimDrives firepower modernized_3",
    "icon": "modernizedAimDrivesAimingStabilizer",
    "price": 1600,
    "weight": 0,
    "factors": [
      {
        "type": "vehicleGunAimSpeed",
        "desc": "к скорости сведения",
        "value": 1.095
      },
      {
        "type": "vehicleGunShotDispersion",
        "desc": "от разброса при движении и поворотах",
        "value": 0.885
      }
    ],
    "include_tags": "aimingStabilizer_class1_user aimingStabilizer_class2_user"
  },
  {
    "id": "modernizedTurbochargerRotationMechanism1",
    "index": 153,
    "name": "Система повышения мобильности Т1",
    "desc": "",
    "tags": "turbocharger modernized_1",
    "icon": "modernizedTurbochargerRotationMechanism",
    "price": 100,
    "weight": 0,
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
    ],
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "modernizedTurbochargerRotationMechanism2",
    "index": 154,
    "name": "Система повышения мобильности Т2",
    "desc": "",
    "tags": "turbocharger modernized_2",
    "icon": "modernizedTurbochargerRotationMechanism",
    "price": 400,
    "weight": 0,
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
    ],
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "modernizedTurbochargerRotationMechanism3",
    "index": 155,
    "name": "Система повышения мобильности Т3",
    "desc": "",
    "tags": "turbocharger modernized_3",
    "icon": "modernizedTurbochargerRotationMechanism",
    "price": 1600,
    "weight": 0,
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
    ],
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "modernizedExtraHealthReserveAntifragmentationLining1",
    "index": 156,
    "name": "Комплекс улучшения выживаемости Т1",
    "desc": "",
    "tags": "healthReserve modernized_1",
    "icon": "modernizedExtraHealthReserveAntifragmentationLining",
    "price": 100,
    "weight": 0,
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
        "desc": "от штрафа за повреждённые боеукладку и двигатель",
        "value": 0.7
      }
    ],
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user",
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "modernizedExtraHealthReserveAntifragmentationLining2",
    "index": 157,
    "name": "Комплекс улучшения выживаемости Т2",
    "desc": "",
    "tags": "healthReserve modernized_2",
    "icon": "modernizedExtraHealthReserveAntifragmentationLining",
    "price": 400,
    "weight": 0,
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
        "desc": "от штрафа за повреждённые боеукладку и двигатель",
        "value": 0.6
      }
    ],
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user",
    "min_tier": 5,
    "max_tier": 10
  },
  {
    "id": "modernizedExtraHealthReserveAntifragmentationLining3",
    "index": 158,
    "name": "Комплекс улучшения выживаемости Т3",
    "desc": "",
    "tags": "healthReserve modernized_3",
    "icon": "modernizedExtraHealthReserveAntifragmentationLining",
    "price": 1600,
    "weight": 0,
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
        "desc": "от штрафа за повреждённые боеукладку и двигатель",
        "value": 0.5
      }
    ],
    "include_tags": "extraHealthReserve_class1_user extraHealthReserve_class2_user extraHealthReserve_class3_user",
    "min_tier": 5,
    "max_tier": 10
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