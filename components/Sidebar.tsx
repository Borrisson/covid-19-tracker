import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import Image from "next/dist/client/image";
import styles from "../styles/SideBar.module.scss";
import { ReactNode } from "react";

export function SideBar({ children }: { children: ReactNode }) {
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
				<div className={styles.toolbar} />
				<Image
					alt="Utah"
					src="/Utah.jpg"
					layout="fill"
					objectFit="cover"
					quality={100}
				/>

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
