/** @brief Convert NTP 64-bit timestamp to Unix Time
 *
 * @param[in] t: NTP 64-bit timestamp
 * @return: Unix Timestamp in us
 */
export function ntpToUnixTime(t: number): number {
  /* convert ntp 64-bit timestamp to unix time */
  /* timestamp is split in two parts: <timestamp>/<router_id> */
  /* extract timestamp and convert to 16-digit hexadecimal (64-bit value) */
  const ntpTimestamp = t.toString(16).padStart(16, "0");
  /* first 8 hex digits represent seconds */
  const seconds = parseInt(ntpTimestamp.substring(0, 8), 16);
  /* last 8 hex digits represent fractions (1 fraction equals 2e-32 seconds) */
  const fractions = parseInt(ntpTimestamp.substring(8, 16), 16);
  /* add fractions to seconds and convert to us */
  const unixTimestamp = (seconds + fractions / 0xffffffff) * 1_000_000;

  return unixTimestamp;
}
