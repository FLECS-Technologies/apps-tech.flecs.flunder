<Stack direction="row">
                <IconButton
                  onClick={() => {
                    const t = interval - 1;
                    if (validateInterval(t)) {
                      setInterval(t);
                    }
                  }}
                >
                  <RemoveRounded />
                </IconButton>
                <Box sx={{ width: 50 }}>
                  <TextField
                    variant="standard"
                    size="medium"
                    slotProps={{
                      input: {
                        inputProps: {
                          sx: {
                            textAlign: "center",
                          },
                          type: "text",
                          inputMode: "numeric",
                          pattern: "^[0-9]+$",
                        },
                      },
                    }}
                    value={interval}
                    onChange={(e) => {
                      const text = e.target.value;
                      if (text.length == 0) {
                        return;
                      }
                      const regex = (e.target as HTMLInputElement).pattern;
                      if (!text.match(regex)) {
                        return;
                      }
                      if (validateInterval(+text)) {
                        setInterval(+text);
                      }
                    }}
                    onKeyDown={(e) => {
                      var t = +interval;
                      if (e.key == "ArrowUp") {
                        e.preventDefault();
                        t = t + 1;
                      } else if (e.key == "ArrowDown") {
                        e.preventDefault();
                        t = t - 1;
                      } else {
                        return;
                      }
                      if (validateInterval(t)) {
                        setInterval(t);
                      }
                    }}
                  />
                </Box>
                <IconButton
                  onClick={() => {
                    const t = interval + 1;
                    if (validateInterval(t)) {
                      setInterval(t);
                    }
                  }}
                >
                  <AddRounded />
                </IconButton>
              </Stack>

              <ButtonGroup variant="contained">
            <Button
              onClick={() => {
                const t = interval - 1;
                if (validateInterval(t)) {
                  setInterval(t);
                }
              }}
            >
              -
            </Button>
            <Box sx={{ width: 70 }}>
              <TextField
                variant="standard"
                slotProps={{
                  input: {
                    inputProps: {
                      sx: {
                        textAlign: "center",
                      },
                      type: "text",
                      inputMode: "numeric",
                      pattern: "^[0-9]+$",
                    },
                  },
                }}
                value={interval}
                onChange={(e) => {
                  const text = e.target.value;
                  if (text.length == 0) {
                    return;
                  }
                  const regex = (e.target as HTMLInputElement).pattern;
                  if (!text.match(regex)) {
                    return;
                  }
                  if (validateInterval(+text)) {
                    setInterval(+text);
                  }
                }}
                onKeyDown={(e) => {
                  var t = +interval;
                  if (e.key == "ArrowUp") {
                    e.preventDefault();
                    t = t + 1;
                  } else if (e.key == "ArrowDown") {
                    e.preventDefault();
                    t = t - 1;
                  } else {
                    return;
                  }
                  if (validateInterval(t)) {
                    setInterval(t);
                  }
                }}
              />
            </Box>
            <Button
              onClick={() => {
                const t = interval + 1;
                if (validateInterval(t)) {
                  setInterval(t);
                }
              }}
            >
              +
            </Button>
          </ButtonGroup>
          <FormControlLabel control={<></>} label="seconds" />