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

export function SideBar({ children }: { children: ReactNode }) {
	const [selected, setSelected] = useState(0);
	const classes = useStyles();
	return (
		<>
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
					quality={100}
				/>
				<div className={classes.toolbar} />
				<Divider />
				<List>
					{[
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
					].map(({ province, code }, index) => (
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
				</List>
			</Drawer>
			{children}
		</>
	);
}
