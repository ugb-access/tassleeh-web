import StoreLayout from "../layout/StoreLayout";
import "../styles/globals.css";
import "../styles/fonts.css";
import "../styles/DropDown.css";
import "../styles/Dashboard.css";
import "../styles/Sidebar.css";
import "../styles/Header.css";
import "../styles/Account.css";
import "../styles/Table.css";
// import "../styles/chat.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store, { persister } from "../store";
import { PersistGate } from "redux-persist/integration/react";
function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				{typeof google == "undefined" ? (
					<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAx01A_5SQM7WPAZov08WwWtp_fBOWcBBY&libraries=places"></script>
				) : null}
			</Head>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persister}>
					<StoreLayout pageProps={pageProps}>
						<Component {...pageProps} />
						<ToastContainer />
					</StoreLayout>
				</PersistGate>
			</Provider>
		</>
	);
}

export default MyApp;
