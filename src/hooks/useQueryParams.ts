import { QueryParams } from "@/constants/param";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = (
  param: QueryParams
): [string, (value: string) => void] => {
  const [params, setParams] = useSearchParams();

  const paramValue = params.get(param) || "";

  const setParamValue = (value: string) => {
    setParams({ [param]: value });
  };

  return [paramValue, setParamValue];
};
