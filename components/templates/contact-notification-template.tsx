import * as React from 'react';

interface ContactNotificationTemplateProps {
    userName: string;
    userEmail: string;
    message: string;
}

export const ContactNotificationTemplate: React.FC<Readonly<ContactNotificationTemplateProps>> = ({
    userName,
    userEmail,
    message,
}) => (
    <div>
        <h2>New Contact Inquiry - FedhaHub</h2>
        <p><strong>From:</strong> {userName} ({userEmail})</p>
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8fafc', borderLeft: '4px solid #059669' }}>
            <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
        </div>
    </div>
);
