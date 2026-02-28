import * as React from 'react';

interface ContactTemplateProps {
    userName: string;
}

export const ContactTemplate: React.FC<Readonly<ContactTemplateProps>> = ({
    userName,
}) => (
    <div>
        <h2>Hello {userName},</h2>
        <p>Thank you for contacting FedhaHub.</p>
        <p>We have received your message and our team at Corban Technologies will review it and get back to you within 48 hours.</p>
        <br />
        <p>Best Regards,</p>
        <p><strong>The FedhaHub Team</strong></p>
    </div>
);
