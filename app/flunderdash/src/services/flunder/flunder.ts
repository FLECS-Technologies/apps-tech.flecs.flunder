import axios from "axios";
import { toByteArray } from "base64-js";
import { ntpToUnixTime } from "@util/NtpTime";

export interface flunderVariable {
  key: string;
  value: string;
  encoding: string;
  timestamp: string;
  dateTime: string;
}

export function decodeFlunderVariable(v: flunderVariable): flunderVariable {
  /* try to convert base64 value to utf-8 string */
  try {
    const base64DecodedValue = toByteArray(v.value);
    const utf8Decoder = new TextDecoder("utf-8", { fatal: true });
    const utf8DecodedValue = utf8Decoder.decode(base64DecodedValue);
    v.value = utf8DecodedValue;
  } catch (_e) {}

  /* convert ntp 64-bit timestamp to unix time */
  /* timestamp is split in two parts: <timestamp>/<router_id> */
  /* extract timestamp and convert to 16-digit hexadecimal (64-bit value) */
  try {
    const ntpTimestamp = parseInt(v.timestamp.split("/")[0]);
    if (Number.isNaN(ntpTimestamp)) {
      throw new Error("Could not parse ntpTimestamp");
    }
    const unixTimestamp = ntpToUnixTime(ntpTimestamp);
    v.timestamp = unixTimestamp.toFixed(0);
    v.dateTime = new Date(parseInt(v.timestamp) / 1000).toLocaleString();
  } catch (_e) {
    v.timestamp = "0";
    v.dateTime = new Date().toLocaleString();
  }

  return v;
}

export async function browse(filter: string): Promise<flunderVariable[]> {
  const url = "/flunder/" + (filter.length ? filter : "**");
  const variables = await axios
    .get(url)
    .then((res) => {
      return [...res.data];
    })
    .catch((error) => {
      return Promise.reject(error);
    });
  return Promise.resolve(variables);
}
