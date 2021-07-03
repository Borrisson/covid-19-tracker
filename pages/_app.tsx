import type { AppProps } from "next/app";
import { CssBaseline } from "@material-ui/core";
import { SideBar } from "../components/Sidebar";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../public/theme";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<SideBar>
					<Component {...pageProps} />;
				</SideBar>
			</ThemeProvider>
		</>
	);
}
export default MyApp;
