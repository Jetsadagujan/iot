export const checkIfInRange = (user, data) => {
  const isNotInRangeLight =
    data.ligth > user.maxLight || data.ligth < user.minLigth;
  const isNotInRangeHumadity =
    data.humadity > user.maxHumidity || data.humadity < user.minHumidity;

  return isNotInRangeLight || isNotInRangeHumadity;
};
