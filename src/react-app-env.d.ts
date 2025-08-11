/// <reference types="react-scripts" />
declare module 'bootstrap';

declare module 'bootstrap/js/dist/modal' {
  export default class Modal {
    constructor(element: Element, options?: any);
    toggle(): void;
    show(): void;
    hide(): void;
    handleUpdate(): void;
    dispose(): void;
    static getInstance(element: Element): Modal | null;
    static getOrCreateInstance(element: Element, options?: any): Modal;
  }
}
