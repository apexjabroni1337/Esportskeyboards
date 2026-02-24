import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact — EsportsKeyboards",
  description: "Get in touch with the EsportsKeyboards team. Submit corrections, suggest features, inquire about partnerships, or just say hello.",
  alternates: { canonical: "https://esportskeyboards.com/contact" },
  openGraph: {
    title: "Contact — EsportsKeyboards",
    description: "Get in touch with the EsportsKeyboards team.",
    url: "https://esportskeyboards.com/contact",
    images: [{ url: "https://esportskeyboards.com/og?title=Contact&subtitle=Get+in+Touch", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
