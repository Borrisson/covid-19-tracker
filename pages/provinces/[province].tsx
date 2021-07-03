import { GetStaticPropsContext } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function Province({ province: data }: AppProps) {
	const router = useRouter();
	const { province } = router.query;

	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					Word of the Day
				</Typography>
				<Typography variant="h5" component="h2">
					be{bull}nev{bull}o{bull}lent
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					adjective
				</Typography>
				<Typography variant="body2" component="p">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
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

	const paths = provinces.map((province: string) => ({
		params: { province },
	}));

	return { paths, fallback: false };
}

interface ProvincesProps extends Partial<GetStaticPropsContext> {
	params: {
		province: string | undefined;
	};
}

export async function getStaticProps({ params }: ProvincesProps) {
	const res = await fetch(
		`https://api.opencovid.ca/summary?loc=${params?.province?.toUpperCase()}`
	);
	const province = await res.json();
	return {
		props: { province },
	};
}
