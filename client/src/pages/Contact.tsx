import React from "react";

interface FormStatus {
  show: boolean;
  type: 'success' | 'danger';
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formStatus, setFormStatus] = React.useState<FormStatus | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://propfixrealty.com/index.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit form");

      setFormStatus({
        show: true,
        type: "success",
        message: "✅ Thank you for your message! We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (error) {
      setFormStatus({
        show: true,
        type: "danger",
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(null), 5000);
    }
  }

  return (
    <section className="contact-section p-3">
      <div className="contact-header text-center mb-5">
        <h2 className="fw-bold">Contact Us</h2>
        <p className="text-muted">
          We'd love to hear from you. Fill out the form or reach us directly.
        </p>
      </div>

      <div className="row g-4 d-flex justify-content-between align-items-start flex-lg-row flex-column">
        {/* Contact Form */}
        <div className="col-lg-6 col-md-12 d-flex align-items-stretch justify-content-center">
          <div className="contact-card">
            <div className="card-header rounded text-center mb-3">
              <h5
                style={{
                  textDecoration: 'underline',
                  textDecorationColor:
                    'linear-gradient(135deg, #4f79ac, #08aef5)',
                }}
              >
                Send Us a Message
              </h5>
            </div>
            <div className="card-body">
              {formStatus && formStatus.show && (
                <div
                  className={`alert alert-${formStatus.type}`}
                  role="alert"
                >
                  {formStatus.message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="JohnDoe@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    className="form-control"
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    placeholder="Write your message here..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Company Info using ContactCard style */}
        <div className="col-lg-6 col-md-12 d-flex align-items-stretch justify-content-center">
          <div
            className="contact-card h-100 p-3"
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <div className="card-header rounded text-center mb-3">
              <h5
                style={{
                  textDecoration: 'underline',
                  textDecorationColor:
                    'linear-gradient(135deg, #4f79ac, #08aef5)',
                }}
              >
                Get in Touch
              </h5>
            </div>
            <div className="card-body d-flex flex-column justify-content-center">
              <p className="mb-2">
                <strong>Address:</strong> F2 block, No. 308, Ozone Greens,
                Phase II Perumbakkam, Jalladianpet Road
              </p>
              <p className="mb-2">
                <strong>Phone:</strong>{' '}
                <a href="tel:+919789360885">+91 9789360885</a>
              </p>
              <p className="mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:arunkumar@propfixrealty.com">
                  arunkumar@propfixrealty.com
                </a>
              </p>

              <div className="mt-3" style={{ marginTop: 'auto' }}>
                <h6 className="mb-2">Follow Us</h6>
                <div className="d-flex gap-3 fs-4">
                  {[
                    { href: 'https://www.facebook.com/propfixrealty', icon: 'bi-facebook', gradient: 'linear-gradient(135deg,#3b5998,#00aced)' },
                    { href: 'https://www.instagram.com/propfixrealty/', icon: 'bi-instagram', gradient: 'linear-gradient(135deg,#f58529,#dd2a7b,#8134af,#515bd4)' },
                    // { href: 'https://twitter.com/', icon: 'bi-twitter', gradient: 'linear-gradient(135deg,#1da1f2,#0d95e8)' },
                    // { href: 'https://linkedin.com/', icon: 'bi-linkedin', gradient: 'linear-gradient(135deg,#0077b5,#00a0dc)' },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.icon.replace('bi-', '').toUpperCase()}
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        color: 'white',
                        background: social.gradient,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform =
                          'scale(1.1)';
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          '0 6px 15px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform =
                          'scale(1)';
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          'none';
                      }}
                    >
                      <i className={`bi ${social.icon}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
