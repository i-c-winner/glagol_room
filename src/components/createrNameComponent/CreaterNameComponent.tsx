import { useRef, useState } from 'react'
import { Box } from "@mui/material"
import { TextField } from "@mui/material"
import { Button } from '@mui/material'
import { useTheme } from "@mui/material/styles"

export default function CreaterNameComponent(props: any) {
	const theme=useTheme()
	const refName=useRef<HTMLInputElement>(null)
	const [name, setName]=useState<string|undefined>(undefined)
	const stylesInput={
		backgroundColor: theme.palette.background.paper,
		margin: '0 auto 20px',
		'&:hover': {
			outline: 'none'
		}
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
		textAlign: 'center',
		display: 'flex',
		flexFlow: 'column'
	}
	function switcher() {
		props.action(name)

	}
	function changeName() {
		setName(() => {
			return refName.current!==undefined? refName.current?.value:undefined
		})
	}
	return (
		<Box
			sx={stylesBox}
		>
			<Box
				sx={{
					width: '40%',
					padding: '25px 10px',
					border: '3px solid blue',
					margin: '0 auto',
					borderRadius: '5px',
					display: "flex",
					flexFlow: 'column'
				}}
			>
				<TextField
					onChange={changeName}
					inputRef={refName}
					sx={stylesInput}
					id="outlined-basic" label="Outlined" variant="outlined" />
				<Button
					onClick={switcher}
					color="primary"
					variant="contained">Create Name</Button>
			</Box>

		</Box>
	)
}
