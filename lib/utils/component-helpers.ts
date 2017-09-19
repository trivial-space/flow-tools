export interface DragDelta {
	x: number
	y: number
}


export function getDragDeltas (callback: (DragDelta) => void) {
	let oldX = 0
	let oldY = 0

	function onMouseDown (e: MouseEvent) {
		oldX = e.clientX
		oldY = e.clientY
		document.addEventListener('mousemove', onMouseMove)
		document.addEventListener('mouseup', onMouseUp)
	}

	function onMouseUp () {
		document.removeEventListener('mousemove', onMouseMove)
		document.removeEventListener('mouseup', onMouseUp)
	}

	function onMouseMove (e: MouseEvent) {
		callback({
			x: oldX - e.clientX,
			y: oldY - e.clientY
		})
		oldX = e.clientX
		oldY = e.clientY
	}

	return { onMouseDown }
}
