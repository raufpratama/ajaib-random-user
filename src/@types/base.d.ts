interface IBaseParams {
  page: number;
  results: number;
  gender?: "male" | "female";
  keyword?: string;
  sortyBy?: string;
  sortOrder?: import("antd/lib/table/interface").SortOrder | undefined;
  inc?: string;
}

interface IBaseResponse<T> {
  results: T;
  info: {
    results: number;
    seed: string;
    page: number;
    version: string;
  }
}