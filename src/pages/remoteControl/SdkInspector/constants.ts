
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
} as const;

export const vehicles = Object.keys(vehicleInfo) as (keyof typeof vehicleInfo)[];

export const aimingModes = [
  'arcade', 'strategic', 'arty', 'sniper', 'postmortem', 'debug', 'video', 'mapcase', 'arcadeMapcase', 'epicMapcase', 'respawn', 'deathfreecam', 'dualgun', 'arcadeEpicMinefieldMapcase', 'killcam', 'vehiclesSelection', 'twinGun', 'lookAtKiller'
] as const