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
import { Provider } from "react-redux";
import store, { persister } from "../store";
import { PersistGate } from "redux-persist/integration/react";
const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<link
					className="rounded-full"
					rel="shortcut icon"
					href="/favicon/favicon.ico"
				/>
				{typeof google == "undefined" ? (
					<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTeuajYJW22KJe7Ae-tOq_10n0D52CP_0&libraries=places"></script>
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
};

export default MyApp;
