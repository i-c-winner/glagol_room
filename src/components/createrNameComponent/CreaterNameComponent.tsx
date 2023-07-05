import React from 'react'

export default function CreaterNameComponent(props: any) {
	function switcher() {
		props.action()
	}
	return (
		<div onClick={switcher}> CreateNameComponent</ div>
	)
}
