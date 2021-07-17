import { GetStaticPropsContext } from "next";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useState } from "react";
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
	Legend,
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

const getFull = ({ data }) => data["all_ages"].full;
const getOne = ({ data }) => data["all_ages"].atleast1;

export default function Province({ province, data }: AppProps) {
	const classes = useStyles();
	const [opacity, setOpacity] = useState({ getFull: 1, getOne: 1 });

	const setFocus = (dataKey, newOpacity) => {
		Object.keys(opacity).forEach((key) => {
			if (key !== dataKey.name) {
				setOpacity({ ...opacity, [key]: newOpacity });
			}
		});
	};

	return (
		<Card className={classes.root}>
			<CardContent>
				<ResponsiveContainer height={300} width={800}>
					<AreaChart
						data={data}
						margin={{ top: 20, right: 30, left: 10, bottom: 0 }}
					>
						<defs>
							<linearGradient id="colorFull" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="colorOne" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
							</linearGradient>
						</defs>

						<XAxis dataKey="date" />
						<YAxis />

						<Area
							name="# of people (1 dose)"
							type="monotone"
							dataKey={getOne}
							stroke="#82ca9d"
							fillOpacity={opacity.getOne}
							fill="url(#colorOne)"
						/>
						<Area
							name="# of people (2 doses)"
							type="monotone"
							dataKey={getFull}
							stroke="#8884d8"
							fillOpacity={opacity.getFull}
							fill="url(#colorFull)"
						/>
						<Tooltip />
						<Legend
							verticalAlign="top"
							height={30}
							onMouseOver={({ dataKey }) => setFocus(dataKey, 0.5)}
							onMouseLeave={(event) => setFocus(event.dataKey, 1)}
						/>
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
		`https://api.covid19tracker.ca/vaccines/age-groups/province/${params?.province}`
	);

	const province = await res.json();

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
