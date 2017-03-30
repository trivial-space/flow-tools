export declare function iconBtn({title, onclick, icon, class: className}: {
    title?: string;
    onclick?: Function;
    icon?: SVGElement;
    class?: string;
}): (string | SVGElement | {
    class: string;
    title: string | undefined;
    onclick: Function | undefined;
} | undefined)[];
