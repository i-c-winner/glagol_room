import { useRef, useState, useEffect } from 'react'
import { Box } from "@mui/material"
import { TextField } from "@mui/material"
import { Button } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import conferenceMaster from "../../conference/conferenceMaster"

export default function CreaterUserComponent(props: any) {
	const theme=useTheme()
	const refUser=useRef<HTMLInputElement>(null)
	const [user, setUser]=useState<string|undefined>(undefined)
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
	const { connection, peerConnection, strophe }=window.glagol
	useEffect(() => {
		connection.then((connection: any) => {
			conferenceMaster.init({ peerConnection, strophe, connection })
			const callbackRegistry=(status: any) => {
				if (status===strophe.Strophe.Status.REGISTER) {
					// fill out the fields
					connection.register.fields.username='name';
					connection.register.fields.password='pas';
					// calling submit will continue the registration process
					connection.register.submit();
				} else if (status===strophe.Strophe.Status.REGISTERED) {
					console.info("registered!");
					// calling login will authenticate the registered JID.
					connection.authenticate();
				} else if (status===strophe.Strophe.Status.CONFLICT) {
					connection.connect("name@prosolen.net", 'pas', () => {
						getMedia()
					})
					console.info("Contact already existed!");
				} else if (status===strophe.Strophe.Status.NOTACCEPTABLE) {
					console.info("Registration form not properly filled out.")
				} else if (status===strophe.Strophe.Status.REGIFAIL) {
					console.info("The Server does not support In-Band Registration")
				} else if (status===strophe.Strophe.Status.CONNECTED) {
					console.info('connected OK');
					getMedia()
				}
			}
			connection.register.connect("@prosolen.net", callbackRegistry)
		})
	}, [])


	function getMedia() {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream: MediaStream) => {
			mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
				peerConnection.addTrack(track)
			})
			peerConnection.createOffer().then((offer: RTCOfferAnswerOptions) => {
				peerConnection.setLocalDescription(offer)
			})
		})
	}
	function switcher() {
		props.action(user)

	}
	function changeUser() {
		setUser(() => {
			return refUser.current!==undefined? refUser.current?.value:undefined
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
					onChange={changeUser}
					inputRef={refUser}
					sx={stylesInput}
					id="outlined-basic" label="Outlined" variant="outlined" />
				<Button
					onClick={switcher}
					color="primary"
					variant="contained">Create User</Button>
			</Box>

		</Box>
	)
}
