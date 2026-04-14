import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";

import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../theme";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import AuthProvider from "@/providers/AuthProvider";

export const metadata = {
  title: "SPLT",
  description: "Simplifying Bill Splitting",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head suppressHydrationWarning>
        <ColorSchemeScript defaultColorScheme="auto" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <ReactQueryClientProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
