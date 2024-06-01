import { HtmlConverter } from "./Converter";
import { Helpers } from "../helpers/convertHTMLToPDF";

export class HtmlToPdfConverter extends HtmlConverter {
    private _helpers = new Helpers();
    async Convert(htmlContent: string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            console.log("creating pdf");
            var pdf = await this._helpers.convertHTMLToPDF(htmlContent,
                { printBackground: true, width: '1300px' }, {
                    headless: true,
                    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
                    args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
                } as any, false);
            console.log("pdf created");
            resolve(pdf.toString('base64'))
        });
    }
}
