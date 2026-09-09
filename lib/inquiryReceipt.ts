/** A successful HTTP response must mean at least one delivery channel accepted it. */
export function inquiryReceipt(input: {
  inquiryId: number | string | null;
  emailId: string | null;
  hasAttachment: boolean;
}) {
  const accepted = input.inquiryId != null || Boolean(input.emailId);
  return {
    accepted,
    status: accepted ? 200 : 503,
    receiptId: input.inquiryId != null ? `F1-${input.inquiryId}` : input.emailId ? `MAIL-${input.emailId}` : null,
    attachmentReceived: input.hasAttachment ? Boolean(input.emailId) : null,
    message: !accepted
      ? "Your inquiry could not be recorded or emailed. Please try again or email inquiry@f1composite.com."
      : input.hasAttachment && !input.emailId
        ? "Your project details have been recorded, but the attachment could not be delivered. Please email the file to inquiry@f1composite.com with your reference below. We will acknowledge your requirements within one business day."
        : "Your inquiry has been received. We will acknowledge your requirements within one business day and confirm the next step. A formal quotation follows specification and delivery review.",
  };
}
