export declare function scaleSlider({scale}: {
    scale: any;
}, dispatch: any): (string | (string | {
    type: string;
    value: any;
    min: number;
    max: number;
    step: number;
    onchange: (e: any) => any;
    onmousemove: (e: any) => any;
})[])[];
export declare function graphView(data: any, dispatch: any): (string | any[] | {
    class: string;
})[];
