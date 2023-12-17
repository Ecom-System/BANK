import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "./data";

const useStyles = createStyles((theme) => ({

	root: {
		position: 'relative',
		color: theme.white,
		backgroundColor: "#394867",
		marginBottom: '10px',
	},

	dropdown: {
		position: 'absolute',
		top: HEADER_HEIGHT,
		left: 0,
		right: 0,
		zIndex: 0,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopWidth: 0,
		overflow: 'hidden',

		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
		margin: '2',
		maxWidth: '1200px',
		marginBottom: '-10px',
	},

	links: {
		alignContent: 'right',
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 20px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color: '#F1F6F9',
		fontSize: theme.fontSizes.md,
		fontWeight: 600,

		'&:hover': {
			color: '#394867',
			backgroundColor: '#F1F6F9',
		},

		[theme.fn.smallerThan('sm')]: {
			borderRadius: 0,
			padding: theme.spacing.md,
		},
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: '#F1F6F9',
			color: "#394867",
		},
	},
}));

export default useStyles;