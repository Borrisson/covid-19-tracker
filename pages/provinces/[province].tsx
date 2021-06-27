import { GetStaticPropsContext } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useRouter } from "next/router";

export default function Province({ props }: AppProps) {
	const router = useRouter();
	const { province } = router.query;

	return <p>{province}</p>;
}
// need to find half decent api (one api has no vaccines, the other has terrible query params, where province field is a mix of province name or abbreviation), I could map the urls using my own api, will lo
export async function getStaticPaths() {
	const provinces = [
		"on",
		"qc",
		"bc",
		"nb",
		"ns",
		"pei",
		"mb",
		"sk",
		"ab",
		"nwt",
		"yk",
		"nu",
		"nl",
	];

	const paths = provinces.map((province) => ({
		params: { province },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	const res = await fetch(
		`https://api.opencovid.ca/summary?loc=${params.province.toUpperCase()}`
	);
	const province = await res.json();
	return {
		props: { province },
	};
}
