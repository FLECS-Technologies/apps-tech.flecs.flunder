import { Typography } from "@mui/material";

import openSourceTxt from "@assets/open-source.txt";
import { useState } from "react";

export default function OpenSource() {
  const [content, setContent] = useState("");
  fetch(openSourceTxt)
    .then((response) => response.text())
    .then((text) => setContent(text));
  return (
    <>
      <Typography variant="h4">Open Source</Typography>
      <Typography sx={{ whiteSpace: "pre-wrap", textAlign: "left", p: 4 }}>
        {content}
      </Typography>
    </>
  );
}
