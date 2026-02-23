import nodemailer from 'nodemailer';

interface EmailRequest {
  name: string;
  mobile: string;
  service: string;
  address: string;
}

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'shuchiwater@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body: EmailRequest = await request.json();

    const { name, mobile, service, address } = body;

    if (!name || !mobile || !service || !address) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email content
    const emailContent = `
      <h2>New Service Booking Request</h2>
      <p><strong>Customer Name:</strong> ${name}</p>
      <p><strong>Mobile Number:</strong> ${mobile}</p>
      <p><strong>Service Required:</strong> ${service}</p>
      <p><strong>Address:</strong> ${address}</p>
      <hr/>
      <p>Please contact the customer as soon as possible to confirm the service.</p>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.GMAIL_USER || 'shuchiwater@gmail.com',
      to: 'shuchiwater@gmail.com',
      subject: `New Service Booking Request from ${name}`,
      html: emailContent,
    });

    // Send confirmation email to customer
    const customerEmail = `
      <h2>Booking Confirmation</h2>
      <p>Hello ${name},</p>
      <p>Thank you for booking Shuchi RO Services. We have received your request for <strong>${service}</strong>.</p>
      <p>Our team will contact you shortly at <strong>${mobile}</strong> to confirm the appointment.</p>
      <hr/>
      <p><strong>Service Details:</strong></p>
      <p>Service Type: ${service}</p>
      <p>Service Address: ${address}</p>
      <p>If you have any questions, please call us at 9911585627</p>
      <p>Thank you!</p>
      <p>Shuchi RO Services Team</p>
    `;

    // You can optionally send confirmation to customer email if they provide it
    // For now, we're just sending to admin

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
