import type { AppProps } from "next/app";
import { CssBaseline } from "@material-ui/core";
import { SideBar } from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<CssBaseline />
			<SideBar>
				<Component {...pageProps} />;
			</SideBar>
		</>
	);
}
export default MyApp;
