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

const flunderTestValues = [
  "Hello, vitest!",
  "1234",
  "3.14158999999999988261834005243144929409027099609375",
  "Hello from somewhere else",
];

const flunderTimestampsNtp = [
  "7476810558137971584/0",
  "7476810558297480126/0",
  "7476810558343318573/0",
  "7476810558497104938/0",
];

const flunderTimestampsUnix = [
  "1740830614729312",
  "1740830614766451",
  "1740830614777123",
  "1740830614812930",
];

const flunderTestData = [
  {
    key: "flunder/testData/string",
    value: toBase64(flunderTestValues[0]),
    encoding: "text/plain",
    timestamp: flunderTimestampsNtp[0],
  },
  {
    key: "flunder/testData/int32",
    value: toBase64(flunderTestValues[1]),
    encoding: "text/plain;int32",
    timestamp: flunderTimestampsNtp[1],
  },
  {
    key: "flunder/testData/double",
    value: toBase64(flunderTestValues[2]),
    encoding: "text/plain;float64",
    timestamp: flunderTimestampsNtp[2],
  },
  {
    key: "external/testData/string",
    value: toBase64(flunderTestValues[3]),
    encoding: "text/plain",
    timestamp: flunderTimestampsNtp[3],
  },
];

const invalidTestData = [
  /* value is invalid utf-8 */
  {
    key: "flunder/testData/string",
    value: "invalidValue",
    encoding: "text/plain",
    timestamp: "7476810558137971584/0",
  },
  {
    /* timestamp is not in ntp64/clientId format */
    key: "flunder/testData/int32",
    value: toBase64("1234"),
    encoding: "text/plain;int32",
    timestamp: "invalidTimestamp",
  },
];

const FLUNDER_URL = "/flunder/";

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

  it.concurrent("should fail on server errors", async () => {
    axiosMock
      .onGet(FLUNDER_URL + "**")
      .replyOnce(axios.HttpStatusCode.InternalServerError, {});
    expect(uut.browse("")).rejects.toThrow();
  });
});

describe("Decode flunder data", () => {
  it.concurrent("should be successful for valid data", async () => {
    axiosMock
      .onGet(FLUNDER_URL + "**")
      .replyOnce(axios.HttpStatusCode.Ok, successfulBrowseResponse(""));

    const actual = await uut
      .browse("**")
      .then((data) => data.map((item) => uut.decodeFlunderVariable(item)));
    expect(actual[0].value).toEqual(flunderTestValues[0]);
    expect(actual[1].value).toEqual(flunderTestValues[1]);
    expect(actual[2].value).toEqual(flunderTestValues[2]);
    expect(actual[3].value).toEqual(flunderTestValues[3]);

    expect(actual[0].timestamp).toEqual(flunderTimestampsUnix[0]);
    expect(actual[1].timestamp).toEqual(flunderTimestampsUnix[1]);
    expect(actual[2].timestamp).toEqual(flunderTimestampsUnix[2]);
    expect(actual[3].timestamp).toEqual(flunderTimestampsUnix[3]);
  });

  it.concurrent("should ignore invalid data", async () => {
    axiosMock
      .onGet(FLUNDER_URL + "**")
      .replyOnce(axios.HttpStatusCode.Ok, invalidTestData);

    const actual = await uut
      .browse("**")
      .then((data) => data.map((item) => uut.decodeFlunderVariable(item)));

    expect(actual[0].value).toEqual(invalidTestData[0].value);
    expect(actual[1].timestamp).toEqual("0");
  });
});
