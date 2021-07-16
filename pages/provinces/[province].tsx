import { GetStaticPropsContext } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { AreaChart, ResponsiveContainer, XAxis } from "recharts";

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

export default function Province({ province }: AppProps) {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={classes.root}>
			<CardContent>
				<ResponsiveContainer>
					<AreaChart>
						<XAxis dataKey=""></XAxis>
					</AreaChart>
				</ResponsiveContainer>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
}

export async function getStaticPaths() {
	const res = await fetch(
		"https://api.covid19tracker.ca/provinces?geo_only=true"
	);
	const data = await res.json();

	const paths = data.map(({ code }: { code: string }) => ({
		params: { province: code.toLowerCase() },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	const res = await fetch(
		`https://api.covid19tracker.ca/reports/province/${params?.province}`
	);
	const province = await res.json();

	return {
		props: { province },
	};
}
