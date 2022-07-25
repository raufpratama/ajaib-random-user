import {AxiosRequestConfig} from "axios";
import {Dispatch, SetStateAction, useState} from "react";
import {QueryKey, useQuery, UseQueryOptions, UseQueryResult} from "react-query";
import { HttpMethod } from "../utilities/constants";
import fetcher from "../utilities/fetcher";

interface IUseData<T, F> {
  queryResult: UseQueryResult<T>;
  filterItem: F;
  setFilterItem: Dispatch<SetStateAction<F>>;
}

export const getListData = async (
  options?: Omit<AxiosRequestConfig, "method">
) => {
  const json = await fetcher({...options, method: HttpMethod.GET});
  const result = json.data;
  return result;
};

const useData = <T, F>(
  fetchOptions: Omit<AxiosRequestConfig, "method" | "params">,
  queryKey: QueryKey,
  filter: F,
  options: Omit<
    UseQueryOptions<any, unknown, any, unknown[]>,
    "queryKey" | "queryFn"
  > = {
    enabled: true,
  }
): IUseData<T, F> => {
  const [filterItem, setFilterItem] = useState(filter);

  const queryResult = useQuery(
    [...queryKey, filterItem],
    () => getListData({...fetchOptions, params: filterItem}),
    options
  );

  return {
    queryResult,
    filterItem,
    setFilterItem,
  };
};

export default useData;
