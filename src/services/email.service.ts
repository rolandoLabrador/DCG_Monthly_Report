import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

export class EmailService {

    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    }

    async sendReport(filePath: string, recipientEmail: string){
        const attachment = fs.readFileSync(filePath).toString("base64");
        const fileName = path.basename(filePath);

        const recipients = process.env.RECEIVER_EMAIL!.split(',').map(e => e.trim());
        const msg = {
            to: recipients,
            ...(process.env.CC_EMAIL ? { cc: process.env.CC_EMAIL.split(',').map(e => e.trim()) } : {}),
            from: process.env.SENDER_EMAIL!,
            subject: 'DCG Pending Contract Report',
            text: `Hi,\n\nAttached is the list of DCG pending contracts up to today.\n\nThanks`,
            attachments: [{
        content: attachment,
        filename: fileName,
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        disposition: 'attachment',
      }],
    };
    
    // Use send() instead of sendMultiple() because sendMultiple does not support CCs
    await sgMail.send(msg); 
}

  // Ensure this is named 'sendError'
async sendError(error: any) {
    // Split here too so everyone gets the error notification
    const recipients = process.env.RECEIVER_EMAIL!.split(',').map(e => e.trim());

    const msg = {
      to: recipients,
      from: process.env.SENDER_EMAIL!,
      subject: `ERROR: Contract Export Failed`,
      text: `The automated export failed. Please check the logs.\n\nError: ${error.message}`,
    };

    // Use send() here as well for consistency
    await sgMail.send(msg);
  }
}
