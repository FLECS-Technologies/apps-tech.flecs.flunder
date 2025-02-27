import { HelpCenter } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

interface HelpButtonProps {
  url: string;
  tooltip?: string;
}

export default function HelpButton(props: HelpButtonProps) {
  return (
    <>
      <Tooltip title={props.tooltip || "Help"}>
        <IconButton
          onClick={() => {
            window.open(props.url);
          }}
        >
          <HelpCenter />
        </IconButton>
      </Tooltip>
    </>
  );
}
