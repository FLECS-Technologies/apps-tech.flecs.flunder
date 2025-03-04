import { describe, expect, it } from "vitest";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { fromByteArray } from "base64-js";
import * as uut from "@services/flunder/flunder";

const axiosMock = new MockAdapter(axios);

const successfulBrowseResponse = (filter: string) => {
  return flunderTestData.filter((item: uut.flunderVariable) => {
    return item.key.startsWith(filter);
  });
};

const toBase64 = (s: string): string => {
  return fromByteArray(new TextEncoder().encode(s));
};

const flunderTestData = [
  {
    key: "flunder/testData/string",
    value: toBase64("Hello, vitest!"),
    encoding: "text/plain",
    timestamp: "7476810558137971584/0",
  } as uut.flunderVariable,
  {
    key: "flunder/testData/int32",
    value: toBase64("1234"),
    encoding: "text/plain;int32",
    timestamp: "7476810558297480126/0",
  },
  {
    key: "flunder/testData/double",
    value: toBase64("3.14158999999999988261834005243144929409027099609375"),
    encoding: "text/plain;float64",
    timestamp: "7476810558343318573/0",
  },
  {
    key: "external/testData/string",
    value: toBase64("Hello from somewhere else"),
    encoding: "text/plain",
    timestamp: "7476810558497104938/0",
  },
];

const FLUNDER_URL = "http://localhost:8000/";

describe("Browse flunder data", () => {
  it.concurrent("should be successful for filter '**'", async () => {
    axiosMock
      .onGet(FLUNDER_URL + "**")
      .replyOnce(axios.HttpStatusCode.Ok, successfulBrowseResponse(""));

    const actual = await uut.browse("**");
    expect(actual).toEqual(successfulBrowseResponse(""));
  });

  it.concurrent("should be successful for filter 'external'", async () => {
    axiosMock
      .onGet(FLUNDER_URL + "external")
      .replyOnce(axios.HttpStatusCode.Ok, successfulBrowseResponse("external"));
    const actual = await uut.browse("external");
    expect(actual).toEqual(successfulBrowseResponse("external"));
  });
});
