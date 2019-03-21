export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.satusText));
}

export function getSelectOuiNonPourAffichage(donnee) {
  if (donnee === "O") {
    return "Oui";
  } else if (donnee === "N") {
    return "Non";
  } else {
    return "";
  }
}
