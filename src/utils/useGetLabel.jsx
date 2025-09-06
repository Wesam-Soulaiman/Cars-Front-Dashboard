import useGetTranslation from "./useGetTranslation";

const useGetLabel = () => {
  const { getTranslation2 } = useGetTranslation();

  const getDataLabel = (dataArray, value) => {
    const item = dataArray.find((item) => item.id === value);
    return item ? getTranslation2(item, "name") : "N/A";
  };
  const getDataLabelByValue = (dataArray, value) => {
    const item = dataArray.find((item) => item.value === value);
    return item ? getTranslation2(item, "name") : "N/A";
  };

  return {
    getDataLabel,
    getDataLabelByValue,
  };
};

export default useGetLabel;
