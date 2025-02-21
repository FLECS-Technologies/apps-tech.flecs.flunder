import * as React from "react";
import Box from "@mui/material/Box";
import { theme } from "./Theme";
import { browse, flunderVariable } from "./services/flunder/flunder";
import {
  CssBaseline,
  FormControlLabel,
  Paper,
  Switch,
  ThemeProvider,
  useColorScheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const flunderColumns: GridColDef[] = [
  { field: "key", headerName: "Key", width: 360 },
  { field: "value", headerName: "Value", width: 180 },
  { field: "encoding", headerName: "Encoding", width: 270 },
  { field: "timestamp", headerName: "Timestamp", width: 180 },
];

function MyDemo() {
  const [variables, setVariables] = React.useState<flunderVariable[]>([]);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        let id = 0;
        const createId = () => {
          id = id + 1;
          return id;
        };

        const res = (await browse("**")).map((item) => {
          return { ...item, id: createId() };
        });
        setVariables(res);
      } catch {
        console.error("Could not fetch data");
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const { mode, setMode } = useColorScheme();
  if (!mode) return null;

  setMode("dark");

  return (
    <Paper sx={{ p: 2 }}>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Auto refresh"
      />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ height: 400, mt: 1 }}>
          <DataGrid rows={variables} columns={flunderColumns} />
        </Box>
      </Box>
    </Paper>
  );
}

export default function Demo() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyDemo />
      </ThemeProvider>
    </>
  );
}
