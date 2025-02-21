import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  CssBaseline,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  TextField,
} from "@mui/material";

import { ThemeProvider, useColorScheme } from "@mui/material/styles";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { theme } from "./Theme";
import { browse, flunderVariable } from "./services/flunder/flunder";

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
    field: "timestamp",
    headerName: "Timestamp",
    width: 150,
  },
];

function MyApp() {
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(1);
  const [variables, setVariables] = useState<flunderVariable[]>([]);

  useEffect(() => {
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
      <Stack direction="row">
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Auto refresh"
        />
      </Stack>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ height: 400, mt: 1 }}>
          <DataGrid rows={variables} columns={columns} />
        </Box>
      </Box>
    </Paper>
  );
}

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyApp />
      </ThemeProvider>
    </>
  );
}
