export interface DragDelta {
    x: number;
    y: number;
}
export declare function getDragDeltas(onDragDelta: (d: DragDelta) => void, onMouseDown?: (e?: MouseEvent) => void): {
    onmousedown: (e: MouseEvent) => void;
};
