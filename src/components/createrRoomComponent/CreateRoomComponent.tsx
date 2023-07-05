import { useEffect, useState } from 'react'
import getRandomText from "../../plugins/getRandomText"
import { TextField } from "@mui/material"
import { Box } from "@mui/material"
import theme from "../../Ui/themes/theme"


export default function createRoomComponent(props: any) {
	console.log(theme);
	const stylesInput={
		backgroundColor: theme.palette.background.paper,
		margin: '0 auto',
		width: '25%'
	}
	const stylesBox={
		backgroundColor: 'grey',
		margin: 0,
		position: "absolute",
		top: '0px',
		left: '0px',
		right: '0px',
		bottom: '0px',
		paddingTop: '25vh',
		textAlign: 'center'
	}
	const [room, setRoom]=useState(window.location.pathname.split('/')[1])
	useEffect(() => {
		if (room!=="") {
			props.action(room)
		}
	}, [])
	function switcher() {
		props.action()
	}
	return (
		<Box
			sx={stylesBox}
		>
			<TextField
				sx={stylesInput}
				id="outlined-basic" label="Outlined" variant="outlined" />
		</Box>
	)
}
