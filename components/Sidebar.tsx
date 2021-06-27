import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	Divider,
} from "@material-ui/core";
import Image from "next/dist/client/image";
import styles from "../styles/SideBar.module.scss";
import { ReactNode } from "react";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		toolbar: theme.mixins.toolbar,
	})
);

export function SideBar({ children }: { children: ReactNode }) {
	const classes = useStyles();
	return (
		<>
			<Drawer
				className={styles.drawer}
				variant="permanent"
				classes={{
					paper: styles.drawerPaper,
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
			<main>{children}</main>
		</>
	);
}
