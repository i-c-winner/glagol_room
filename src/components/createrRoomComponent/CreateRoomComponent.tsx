import { useEffect, useState, useRef } from 'react'
import { Button, TextField } from "@mui/material"
import { Box } from "@mui/material"
import { useTheme } from "@mui/material/styles"

export default function createRoomComponent(props: any) {
  const theme = useTheme()
  const refRoomName = useRef<HTMLInputElement>(null)
  const stylesInput = {
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto 20px',
    width: '250px',
    '&:hover': {
      outline: 'none !importmant'
    }
  }
  const stylesWrapBox = {
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
  const stylesBox = {
    width: '40%',
    padding: '25px 10px',
    border: '3px solid blue',
    margin: '0 auto',
    borderRadius: '5px',
    display: "flex",
    flexFlow: 'column'
  }

  const stylesButton = {
    width: '250px',
    margin: '0 auto'
  }
  const [ room, setRoom ] = useState(window.location.pathname.split('/')[1])
  useEffect(() => {
    if (room !== "") {
      props.action(room)
    }
  }, [])

  function switcher() {
    props.action(room)
  }

  function changeRoomName() {
    if (refRoomName.current !== null) setRoom(refRoomName.current?.value)
  }

  return (
    <Box
      sx={stylesWrapBox}

    >
      <Box
        onSubmit={switcher}
        component="form"
        sx={stylesBox}
      >
        <TextField
          onChange={changeRoomName}
          inputRef={refRoomName}
          sx={stylesInput}
          id="outlined-basic" label="Outlined" variant="outlined"/>
        <Button
          sx={stylesButton}
          onClick={switcher}
          color="primary"
          variant="contained">Create Room</Button>
      </Box>

    </Box>
  )
}
