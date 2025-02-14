import { Booking } from "../../types/booking";
import { formatTime } from "../lib/utils/timeUtils";

interface MailParams {
  content: string;
  from?: string;
  to: string;
  subject: string;
}

interface TeacherData {
  nickname: string;
  pricing: number;
  email: string;
}

export async function sendMail({ content, from, to, subject }: MailParams) {
    console.log('Attempting to send email:', { to, subject });
    
    try {
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                content,
                from: from || "onboarding@resend.dev",
                to,
                subject
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Email API error details:', {
                status: response.status,
                statusText: response.statusText,
                data: errorData
            });
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Email API response:', data);
        return data;

    } catch (error) {
        console.error("sendMail error details:", error);
        throw error;
    }
}

export function generateBookingConfirmationEmail(booking: Booking | Booking[], teacherData: TeacherData) {
  const isMultipleBookings = Array.isArray(booking);
  const bookings = isMultipleBookings ? booking : [booking];
  
  const formatBookingDetails = (b:any) => `
    <li style="margin-bottom: 10px;">
      Date: ${b.date.day}/${b.date.month}/${b.date.year}<br>
      Time: ${formatTime(b.startTime)} - ${formatTime(b.endTime)}<br>
      ${b.link ? `Zoom Link: <a href="${b.link}">${b.link}</a>` : ''}
    </li>
  `;

  return `
    <h1>Booking Confirmation</h1>
    <p>Your booking with ${teacherData.nickname} has been confirmed.</p>
    
    <h2>Booking Details:</h2>
    <ul style="list-style: none; padding: 0;">
      ${bookings.map(formatBookingDetails).join('')}
    </ul>

    <p>Price per lesson: $${teacherData.pricing}</p>
    ${isMultipleBookings ? `<p>Total for ${bookings.length} lessons: $${teacherData.pricing * bookings.length}</p>` : ''}
    
    <p>Please e-transfer the payment to: ${teacherData.email}</p>
    
    <p>Thank you for booking with us!</p>
  `;
}
