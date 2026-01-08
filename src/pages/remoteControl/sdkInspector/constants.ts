
export const vehicleInfo = {
  '60TP': {
    'tag': 'poland:Pl15_60TP_Lewandowskiego',
    'localizedName': '60TP Lewandowskiego',
    'localizedShortName': '60TP',
    'level': 10,
    'class': 'heavyTank',
    'role': 'role_HT_break',
  },
  'Maus': {
    'tag': 'germany:G42_Maus',
    'localizedName': 'Maus',
    'localizedShortName': 'Maus',
    'level': 10,
    'class': 'heavyTank',
    'role': 'role_HT_assault',
  },
  'Manticore': {
    'tag': 'uk:GB100_Manticore',
    'localizedName': 'Manticore',
    'localizedShortName': 'Manticore',
    'level': 10,
    'class': 'lightTank',
    'role': 'role_LT_universal',
  },
  'T-100 LT': {
    'tag': 'ussr:R132_VNII_100LT',
    'localizedName': 'Т-100 ЛТ',
    'localizedShortName': 'Т-100 ЛТ',
    'level': 10,
    'class': 'lightTank',
    'role': 'role_LT_universal',
  },
  'IS-7': {
    'tag': 'ussr:R45_IS-7',
    'localizedName': 'ИС-7',
    'localizedShortName': 'ИС-7',
    'level': 10,
    'class': 'heavyTank',
    'role': 'role_HT_assault',
  }
} as const;

export const vehicles = Object.keys(vehicleInfo) as (keyof typeof vehicleInfo)[];

export const aimingModes = [
  'arcade', 'strategic', 'arty', 'sniper', 'postmortem', 'debug', 'video', 'mapcase', 'arcadeMapcase', 'epicMapcase', 'respawn', 'deathfreecam', 'dualgun', 'arcadeEpicMinefieldMapcase', 'killcam', 'vehiclesSelection', 'twinGun', 'lookAtKiller'
] as const