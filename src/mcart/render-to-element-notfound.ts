export class RenderToElementNotFound implements Error {
    name: string;
    message: string;
    stack?: string;
    element: JQuery;
    constructor(renderToElement, message) {
        this.name = "Render To Element Not Found";
        this.element = renderToElement;
        this.message = message;
    }
}