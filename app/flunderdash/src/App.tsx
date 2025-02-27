import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  CssBaseline,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Tooltip,
} from "@mui/material";

import { ThemeProvider, useColorScheme } from "@mui/material/styles";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { theme } from "@whitelabeling/custom-theme";
import {
  browse,
  decodeFlunderVariable,
  flunderVariable,
} from "./services/flunder/flunder";
import ElevateAppBar from "@components/ElevateAppBar";

function validateInterval(t: number) {
  if (t < 1 || t > 10) {
    return false;
  }
  return true;
}

const columns: GridColDef[] = [
  { field: "key", headerName: "Key", width: 300 },
  {
    field: "value",
    headerName: "Value",
    width: 150,
  },
  {
    field: "encoding",
    headerName: "Encoding",
    width: 150,
  },
  {
    field: "dateTime",
    headerName: "Timestamp",
    width: 150,
    renderCell: (params: any) => (
      <Tooltip title={params.row.timestamp}>{params.value}</Tooltip>
    ),
  },
];

function MyApp() {
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(1);
  const [variables, setVariables] = useState<flunderVariable[]>([]);

  useEffect(() => {
    if (autoRefreshInterval == 0) {
      return () => {};
    }
    const interval = setInterval(async () => {
      try {
        let id = 0;
        const createId = () => {
          id = id + 1;
          return id;
        };

        const res = (await browse("**")).map((item) => {
          return { ...decodeFlunderVariable(item), id: createId() };
        });
        setVariables(res);
      } catch {
        console.error("Could not fetch data");
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [autoRefreshInterval]);

  const { mode } = useColorScheme();
  if (!mode) return null;

  return (
    <>
      <CssBaseline />
      <ElevateAppBar />
      <Paper elevation={0} sx={{ marginTop: 2, p: 2 }}>
        <Stack direction="row">
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                onChange={(e) => {
                  setAutoRefreshInterval(+e.target.checked);
                }}
              />
            }
            label="Auto refresh"
          />
        </Stack>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ height: 400, mt: 1 }}>
            <DataGrid rows={variables} columns={columns} />
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </>
  );
}
