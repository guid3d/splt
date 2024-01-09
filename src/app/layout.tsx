import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";

import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";

export const metadata = {
  title: "SPLT",
  description: "Simplifying Bill Splitting",
};

const RootLayout = ({ children }: { children: any }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ReactQueryClientProvider>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            {children}
          </MantineProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
