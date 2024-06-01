import { Router, Request, Response } from 'express';
import { HtmlToPdfConverter } from '../services/HtmlToPdfConverter';
import { HtmlToPdfResponse } from '../models/HtmlToPdfResponse';

const router = Router();

router.post('/html-to-pdf', (req, res) => {
    const htmlToPdfConverter = new HtmlToPdfConverter();
    const htmlContent = req.body.html;
    console.log("start converting html to pdf");
    htmlToPdfConverter.Convert(htmlContent)
        .then((base64) => {
            const response = new HtmlToPdfResponse();
            response.base64 = base64;
            res.json(response);
        })
        .catch(error => "Error While Converting Html To Pdf")
});


// Export the router module so that server.ts file can use it
export default router;