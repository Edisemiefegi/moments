import emailjs from "emailjs-com";

export const sendInviteEmailNotification = async ({
  toEmail,
  toName,
  fromName,
  date,
  time,
  location,
  fromEmail,
}: any) => {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email: toEmail,
        to_name: toName,
        from_name: fromName,
        from_email: fromEmail,
        date,
        time,
        location,
        app_link: "https://momentsblues.vercel.app/",
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );
  } catch (error) {
    console.log("Email error:", error);
  }
};
