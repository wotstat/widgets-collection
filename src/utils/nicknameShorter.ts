
const nicknames: { [key: string]: string } = {
  "justunick": "Unick",
  "pbody_iwnl_ ": "Pbody",
  "mrpunisher_": "Punisher",
  "kolibria_live": "Kolibria",
  "9l_y_mambl_balerina": "Balerina",
  "phantomic__gtua": "PHANTOMIC",
  "mirash_av_press": "Mirash",
  "keterwind": "KETER",
  "shamanskytv_ vkplay": "Shamansky",
  "pykobodutejib": "PYKAB",
  "romany05_pres": "Romany05"
}

export function shorterNickname(nickname: string): string {
  if (nicknames[nickname]) return nicknames[nickname]

  let shortened = nickname
  if (shortened.toLocaleLowerCase().endsWith('_press')) shortened = shortened.slice(0, -6)
  if (shortened.toLocaleLowerCase().endsWith('press')) shortened = shortened.slice(0, -5)

  return shortened
}