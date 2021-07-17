import { GetStaticPropsContext } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {
	AreaChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Area,
	Tooltip,
} from "recharts";

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
	console.log(province);
	return (
		<Card className={classes.root}>
			<CardContent>
				<AreaChart
					width={500}
					height={300}
					data={province.data}
					margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
				>
					<XAxis dataKey="date" />
					<YAxis />
					<Area
						type="monotone"
						dataKey="total vaccinations"
						stroke="#8884d8"
						fillOpacity={1}
					/>
					<Area
						type="monotone"
						dataKey="change vaccinations"
						stroke="#82ca9d"
						fillOpacity={1}
					/>
					<Tooltip />
				</AreaChart>
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
		`https://api.covid19tracker.ca/vaccines/age-groups/province/${params?.province}`
	);
	let province = await res.json();
	const data = province.data.map(
		({ date, data }: { date: string; data: string }) => {
			data = JSON.parse(data);
			return { date, data };
		}
	);
	return {
		props: { ...province, data },
	};
}
