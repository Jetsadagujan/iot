export const checkIfInRange = (user, data) => {
  const isNotInRangeLigth =
    data.ligth > user.maxLigth || data.ligth < user.minLigth;
  const isNotInRangeHumadity =
    data.humadity > user.maxHumidity || data.humadity < user.minHumidity;

  return isNotInRangeLigth || isNotInRangeHumadity;
};
