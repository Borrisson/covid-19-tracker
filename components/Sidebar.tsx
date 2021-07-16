import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	Divider,
} from "@material-ui/core";
import Link from "next/link";
import Image from "next/dist/client/image";
import { ReactNode } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Home from "../styles/Home.module.scss";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
		},
		appBar: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
	})
);

export function SideBar({
	children,
	home,
}: {
	children: ReactNode;
	home?: boolean;
}) {
	const provinces = [
		{ province: "Newfoundland and Labrador", code: "nl" },
		{ province: "Nova Scotia", code: "ns" },
		{ province: "Prince Edward Island", code: "pei" },
		{ province: "New Brunswick", code: "nb" },
		{ province: "Quebec", code: "qc" },
		{ province: "Ontario", code: "on" },
		{ province: "Manitoba", code: "mb" },
		{ province: "Saskatchewan", code: "sk" },
		{ province: "Alberta", code: "ab" },
		{ province: "British Columbia", code: "bc" },
		{ province: "Yukon", code: "yk" },
		{ province: "Northwest Territories", code: "nwt" },
		{ province: "Nunavut", code: "nu" },
	];
	const [selected, setSelected] = useState(provinces.length);
	const classes = useStyles();
	return (
		<>
			<nav id="sidebar">
				<Drawer
					className={classes.drawer}
					variant="permanent"
					classes={{
						paper: classes.drawerPaper,
					}}
					anchor="left"
				>
					<Image
						alt="Utah"
						src="/Utah.jpg"
						layout="fill"
						objectFit="cover"
						blurDataURL="/Utah.jpg"
						placeholder="blur"
					/>
					<div className={classes.toolbar} />
					<Divider />
					<List>
						{provinces.map(({ province, code }, index) => (
							<ListItem
								button
								key={code}
								selected={index === selected}
								onClick={() => setSelected(index)}
							>
								<Link href={`/provinces/${code}`}>
									<ListItemText primary={province} />
								</Link>
							</ListItem>
						))}
						{!home && (
							<ListItem
								button
								key="home"
								onClick={() => setSelected(provinces.length)}
							>
								<Link href="/">
									<ListItemText primary="<- Return home" />
								</Link>
							</ListItem>
						)}
					</List>
				</Drawer>
			</nav>
			<main className={Home.main}>{children}</main>
		</>
	);
}
