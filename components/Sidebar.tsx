import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	Divider,
} from "@material-ui/core";
import Image from "next/dist/client/image";
import { ReactNode } from "react";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

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
			backgroundColor: theme.palette.background.default,
			padding: theme.spacing(3),
		},
	})
);

export function SideBar({ children }: { children: ReactNode }) {
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
					{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
			{children}
		</>
	);
}
