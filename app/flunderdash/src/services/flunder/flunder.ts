import axios, { AxiosError } from "axios";

export interface flunderVariable {
  key: string;
  value: string;
  encoding: string;
  timestamp: string;
}

export async function browse(filter: string): Promise<flunderVariable[]> {
  const url = "http://172.21.0.2:8000/" + (filter.length ? filter : "**");
  const variables = await axios
    .get(url)
    .then((res) => {
      return [...res.data];
    })
    .catch((error) => {
      throw error;
    });
  return Promise.resolve(variables);
}
