export abstract class HtmlConverter {
    abstract Convert(htmlContent: string): Promise<string>;
}