import { useCallback } from "react";

const useQueryParams = location => {
  const parseValues = useCallback(() => {
    return location.search
      .substring(1)
      .split("&")
      .reduce((previous, current) => {
        const [key, value] = current.split("=");
        previous[key] = value;
        return previous;
      }, {});
  }, [location.search]);

  return parseValues();
};

export default useQueryParams;
