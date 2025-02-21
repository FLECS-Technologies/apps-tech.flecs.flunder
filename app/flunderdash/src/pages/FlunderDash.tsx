import { useEffect, useState } from "react";
import { Box, FormControlLabel, Stack, Switch, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  browse,
  decodeFlunderVariable,
  flunderVariable,
} from "@services/flunder/flunder";

const columns: GridColDef[] = [
  { field: "key", headerName: "Key", width: 320 },
  {
    field: "value",
    headerName: "Value",
    width: 180,
  },
  {
    field: "encoding",
    headerName: "Encoding",
    width: 270,
  },
  {
    field: "dateTime",
    headerName: "Timestamp",
    width: 180,
    renderCell: (params: any) => (
      <Tooltip title={params.row.timestamp}>{params.value}</Tooltip>
    ),
  },
];

/** @todo use when setting custom intervals becomes a thing
 *
 */
/*
function validateInterval(t: number) {
  if (t < 1 || t > 10) {
    return false;
  }
  return true;
}
*/

export default function FlunderDash() {
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

  return (
    <>
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
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: "key", sort: "asc" }],
              },
            }}
            rows={variables}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
}
