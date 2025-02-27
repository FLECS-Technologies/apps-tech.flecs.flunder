import axios from "axios";
import { toByteArray } from "base64-js";

export interface flunderVariable {
  key: string;
  value: string;
  encoding: string;
  timestamp: string;
  dateTime: string;
}

export function decodeFlunderVariable(v: flunderVariable): flunderVariable {
  /* try to convert base64 value to utf-8 string */
  const base64DecodedValue = toByteArray(v.value);
  const utf8Decoder = new TextDecoder("utf-8", { fatal: true });
  try {
    const utf8DecodedValue = utf8Decoder.decode(base64DecodedValue);
    v.value = utf8DecodedValue;
  } finally {
  }

  /* convert ntp timestamp to unix time */
  const ntpTimestamp = parseInt(v.timestamp.split("/")[0])
    .toString(16)
    .padStart(16, "0");
  const seconds = parseInt(ntpTimestamp.substring(0, 8), 16);
  const fractions = parseInt(ntpTimestamp.substring(8, 16), 16);
  const unixTimestamp = (seconds + fractions / 0xffffffff) * 1_000_000;
  v.timestamp = unixTimestamp.toFixed(0);
  v.dateTime = new Date(parseInt(v.timestamp) / 1000).toLocaleString();

  return v;
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
