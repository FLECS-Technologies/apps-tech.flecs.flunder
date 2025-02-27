/*
 * Copyright (c) 2024 FLECS Technologies GmbH
 *
 * Created on Tue Oct 08 2024
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

import { IconButton, useTheme } from "@mui/material";
import PropTypes, { InferProps } from "prop-types";

export default function FlecsLogo({
  logoColor,
}: InferProps<typeof FlecsLogo.propTypes>) {
  const theme = useTheme(); // Access the Material-UI theme

  return (
    <>
      <IconButton aria-label="logo" disabled={true}>
        <img
          src="src/assets/logo.svg"
          width="24"
          height="24"
          style={{ color: logoColor || theme.palette.primary.main }}
        />
      </IconButton>
    </>
  );
}

FlecsLogo.propTypes = {
  logoColor: PropTypes.string,
};
