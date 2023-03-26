import StoreLayout from "../layout/StoreLayout";
import "../styles/globals.css";
import "../styles/fonts.css";
import "../styles/DropDown.css";
import "../styles/Dashboard.css";
import "../styles/Sidebar.css";
import "../styles/Header.css";
import "../styles/Account.css";
import "../styles/Table.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				{typeof google == "undefined" ? (
					<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAx01A_5SQM7WPAZov08WwWtp_fBOWcBBY&libraries=places"></script>
				) : null}
			</Head>
			<StoreLayout pageProps={pageProps}>
				<Component {...pageProps} />
				<ToastContainer />
			</StoreLayout>
		</>
	);
}

export default MyApp;
