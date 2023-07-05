import React from 'react'

export default function createRoomComponent(props: any) {
	function switchOff() {
		props.action()
	}
	return (
		<div onClick={switchOff}>createRoomComponent</div>
	)
}
