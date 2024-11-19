export const extractPremiumAmount = (description) => {
  try {
    const parts = description.split(" ");
    const lastPart = parts[parts.length - 1].replace(/[^0-9.]/g, "");
    return parseFloat(lastPart);
  } catch (e) {
    return "";
  }
};
