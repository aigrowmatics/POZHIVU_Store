declare module "nodemailer" {
  type TransportOptions = {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user?: string;
      pass?: string;
    };
  };

  type MailOptions = {
    from?: string;
    to: string;
    replyTo?: string;
    subject: string;
    text: string;
  };

  export function createTransport(options: TransportOptions): {
    sendMail(options: MailOptions): Promise<unknown>;
  };

  const nodemailer: {
    createTransport: typeof createTransport;
  };

  export default nodemailer;
}
