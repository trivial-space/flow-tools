export interface DragDelta {
	x: number
	y: number
}


let targets: HTMLElement[] = []


export function getDragDeltas (
	onDragDelta: (d: DragDelta) => void,
	onMouseDown?: (e?: MouseEvent) => void
) {
	let oldX = 0
	let oldY = 0
	let target: HTMLElement

	function onmousedown (e: MouseEvent) {
		target = e.currentTarget as HTMLElement
		targets.push(target)
		oldX = e.clientX
		oldY = e.clientY
		document.addEventListener('mousemove', onMouseMove)
		document.addEventListener('mouseup', onMouseUp)
		onMouseDown && onMouseDown(e)
	}

	function onMouseUp () {
		document.removeEventListener('mousemove', onMouseMove)
		document.removeEventListener('mouseup', onMouseUp)
		targets = targets.filter(t => t !== target)
	}

	function onMouseMove (e: MouseEvent) {
		for (const t of targets) {
			if (t !== target && target.contains(t)) return
		}
		onDragDelta({
			x: oldX - e.clientX,
			y: oldY - e.clientY
		})
		oldX = e.clientX
		oldY = e.clientY
	}

	return { onmousedown }
}
