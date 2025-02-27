/*
 * Copyright (c) 2022 FLECS Technologies GmbH
 *
 * Created on Tue Sep 30 2022
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from "react";
import { Grid2, Typography } from "@mui/material";
import FlecsLogo from "./FlecsLogo";

const Logo: React.FC = () => {
  return (
    <>
      <Grid2 container spacing={1} alignItems="center">
        <Grid2>
          <FlecsLogo logoColor="white" />
        </Grid2>
        <Grid2>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FLECS
          </Typography>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Logo;
