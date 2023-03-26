/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		apiUrl: "https://job-locator-server.herokuapp.com/",
		PAYPAL_CLIENT_ID:
			"AYQH2hxFJSKhfKDVdJpytB8lokHPca43XF-cFpOciQ9UXQBnqRwg6Ob-_ca03H3EfqOQ4QhWSWwSa7Lz",
	},
};

module.exports = nextConfig;
