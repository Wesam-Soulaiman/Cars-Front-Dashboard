import { useTranslation } from "react-i18next";

const useGetTranslation = () => {
  const { i18n } = useTranslation();

  const getTranslation = (attr) => {
    return i18n.language === "ar" ? `${attr}_ar` : attr;
  };

  const getTranslation2 = (obj, attr) => {
    const translatedKey = i18n.language === "ar" ? `${attr}_ar` : attr;
    return obj?.[translatedKey] ?? obj?.[attr];
  };

  return {
    getTranslation,
    getTranslation2,
  };
};

export default useGetTranslation;
