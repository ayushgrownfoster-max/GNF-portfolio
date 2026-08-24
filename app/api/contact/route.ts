import { NextResponse } from "next/server";

/**
 * Receives project-enquiry submissions from ContactForm.tsx.
 *
 * TO CONNECT A REAL DESTINATION, pick one:
 *  - WordPress: POST to `${WORDPRESS_API_URL}/wp/v2/contact-submissions`
 *    (a custom REST route registered on the CMS) or to a Contact Form 7 /
 *    WPForms endpoint if the team prefers managing the form inside WP.
 *  - CRM: forward to HubSpot/Zoho/Pipedrive's forms or contacts API.
 *  - Email: send via Resend/Postmark/SendGrid to the sales inbox.
 *
 * For now this just validates the payload and logs it so the front end can
 * be demoed end-to-end before a destination is wired up.
 */
export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // eslint-disable-next-line no-console
  console.log("New project enquiry:", body);

  // Example WordPress forward, once WORDPRESS_API_URL is set:
  // await fetch(`${process.env.WORDPRESS_API_URL}/wp/v2/contact-submissions`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(body),
  // });

  return NextResponse.json({ ok: true });
}
