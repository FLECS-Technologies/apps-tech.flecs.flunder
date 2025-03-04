import { describe, expect, it } from "vitest";

import * as uut from "@util/NtpTime";

describe("Conversion from NTP 64-bit time to Unix Time", () => {
  it.concurrent("should be successful", async () => {
    /* 2025-03-01T11:17:13.602189Z */
    const expected = 1740827796602189;
    const actual = uut.ntpToUnixTime(7476798454374141677);
    expect(actual).toEqual(expected);
  });
});
