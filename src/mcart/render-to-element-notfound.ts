export class RenderToElementNotFound implements Error {
    public name: string;
    public message: string;
    public stack?: string;
    public element: JQuery;
    constructor(renderToElement, message) {
        this.name = "Render To Element Not Found";
        this.element = renderToElement;
        this.message = message;
    }
}
