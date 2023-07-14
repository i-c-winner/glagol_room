import { useRef, useState } from 'react'
import { Box } from "@mui/material"
import { TextField } from "@mui/material"
import { Button } from '@mui/material'
import { useTheme } from "@mui/material/styles"

export default function CreaterUserComponent(props: any) {
  const theme = useTheme()
  const refUser = useRef<HTMLInputElement>(null)
  const [ user, setUser ] = useState<string | undefined>(undefined)
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

  function switcher() {
    props.action(user)
  }

  function changeUser() {
    setUser(() => {
      return refUser.current !== undefined ? refUser.current?.value : undefined
    })
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
          onChange={changeUser}
          inputRef={refUser}
          sx={stylesInput}
          id="outlined-basic" label="Outlined" variant="outlined"/>
        <Button
          sx={stylesButton}
          onClick={switcher}
          color="primary"
          variant="contained">Create User</Button>
      </Box>
    </Box>
  )
}
