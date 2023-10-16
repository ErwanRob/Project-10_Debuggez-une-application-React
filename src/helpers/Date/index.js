export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};
// BUGSORT 
// FROM : 
// export const getMonth = (date) => MONTHS[date.getMonth()];
// TO :
// export const getMonth = (date) => MONTHS[date.getMonth() + 1];
// La liste des mois commencais a 0 au lieu de 1 = décallage d'un mois et erreur sur le mois de janvier


export const getMonth = (date) => MONTHS[date.getMonth() + 1];

