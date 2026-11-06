import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Sends through Web3Forms, which forwards each submission to the inbox the
// access key was created for. The key is public by design (it can only
// send to that one inbox) and lives in REACT_APP_WEB3FORMS_KEY.
const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_KEY;
const FALLBACK_EMAIL = "aliyah.sagaban22@gmail.com";

const ease = [0.23, 1, 0.32, 1];
const empty = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [sentTo, setSentTo] = useState("");

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (status === "error" || status === "sent") setStatus("idle");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!ACCESS_KEY) {
      setStatus("error");
      return;
    }
    // Hidden honeypot: real visitors never tick it.
    if (form.botcheck.checked) return;

    setStatus("sending");
    // Sent as FormData, not JSON: a JSON body triggers a CORS preflight,
    // which Web3Forms' Cloudflare edge rejects (403) before the real POST.
    const body = new FormData();
    body.append("access_key", ACCESS_KEY);
    body.append("subject", `Portfolio: ${values.subject.trim()}`);
    body.append("from_name", values.name.trim());
    body.append("name", values.name.trim());
    body.append("email", values.email.trim());
    body.append("message", values.message.trim());
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Send failed");
      setSentTo(values.email.trim());
      setValues(empty);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-form__row">
        <label className="contact-field">
          <span className="contact-field__label">Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            value={values.name}
            onChange={update("name")}
            disabled={sending}
          />
        </label>
        <label className="contact-field">
          <span className="contact-field__label">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={120}
            value={values.email}
            onChange={update("email")}
            disabled={sending}
          />
        </label>
      </div>

      <label className="contact-field">
        <span className="contact-field__label">Subject</span>
        <input
          type="text"
          name="subject"
          required
          maxLength={120}
          value={values.subject}
          onChange={update("subject")}
          disabled={sending}
        />
      </label>

      <label className="contact-field">
        <span className="contact-field__label">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          maxLength={4000}
          value={values.message}
          onChange={update("message")}
          disabled={sending}
        />
      </label>

      <input
        type="checkbox"
        name="botcheck"
        className="contact-form__honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="contact-form__footer">
        <div className="contact-form__status" role="status" aria-live="polite">
          <AnimatePresence mode="wait">
            {status === "sent" && (
              <motion.p
                key="sent"
                className="contact-form__note contact-form__note--ok"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease }}
              >
                Sent. I'll reply to {sentTo} soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="error"
                className="contact-form__note contact-form__note--error"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease }}
              >
                That didn't go through. Try again, or email me at{" "}
                <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button type="submit" className="contact-form__submit" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </form>
  );
}
