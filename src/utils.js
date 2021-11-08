export const checkIfInRange = (data) => {
  const isNotInRangeLigth =
    data.ligth > data.maxLigth || data.ligth < data.minLigth;
  const isNotInRangeHumadity =
    data.humadity > data.maxHumidity || data.humadity < data.minHumidity;

  return isNotInRangeLigth || isNotInRangeHumadity;
};
