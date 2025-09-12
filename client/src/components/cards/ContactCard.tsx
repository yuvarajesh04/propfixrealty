import '../../styles/contactCard.css'
import React from 'react';

interface ContactCardProps {
    title: string;
    location: string;
    onClose: ()=> void
}

interface FormStatus {
    show: boolean;
    type: 'success' | 'danger';
    message: string;
}

function Capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function ContactCard({title, location, onClose}: ContactCardProps) {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        mobile: '',
        message: `Interested in ${title} at ${location}`
    })
    const [isOpen, setIsOpen] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [formStatus, setFormStatus] = React.useState<FormStatus | null>(null)

    React.useEffect(() => {
        setIsOpen(true)
    }, [])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("https://propfixrealty.com/index.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Failed to submit form");

            setFormStatus({
                show: true,
                type: "success",
                message: "✅ Thank you for your message! We'll get back to you soon.",
            });

            setFormData({ name: "", email: "", mobile: "", message: `Interested in ${title} at ${location}` });
        } catch (error) {
            setFormStatus({
                show: true,
                type: "danger",
                message: error instanceof Error ? error.message : "An unexpected error occurred",
            });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setFormStatus(null), 5000);
            setIsOpen(false)
        }
    }

    function handleClose() {
        onClose()
        setIsOpen(false)
    }

    return (
        <div className="contact-card-container" style={{display: isOpen ? 'flex' : 'none'}}>
            <div className="contact-card">
                <div className="card-header rounded">
                    <div className="title-close">
                        <h5>Interested in <span style={{textDecoration: 'underline', textDecorationColor: 'linear-gradient(135deg, #4f79ac, #08aef5)'}}>{Capitalize(title)}</span></h5>
                        <i onClick={handleClose} className="bi bi-x-lg p-1 rounded close-icon"></i>
                    </div>
                    <div className="location">
                        <p style={{background: 'linear-gradient(135deg, #4f79ac, #08aef5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                            <i className="bi bi-geo-alt-fill"></i>{Capitalize(location)}
                        </p>
                    </div>
                </div>
                <div className="card-body">
                    {formStatus && (
                        <div className={`alert alert-${formStatus.type}`}>
                            {formStatus.message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className='form-label'>Name</label>
                            <input 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                value={formData.name}
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="John Doe" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className='form-label'>Email</label>
                            <input 
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                value={formData.email}
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="JohnDoe@example.com" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile" className='form-label'>Mobile</label>
                            <input 
                                onChange={(e) => setFormData({...formData, mobile: e.target.value})} 
                                value={formData.mobile}
                                type="tel" 
                                id="mobile" 
                                name="mobile" 
                                placeholder="9876543210" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className='form-label'>Message</label>
                            <textarea 
                                onChange={(e) => setFormData({...formData, message: e.target.value})} 
                                value={formData.message}
                                id="message" 
                                name="message" 
                                placeholder="Write your message here..."
                            />
                        </div>
                        <div className="form-group">
                            <button 
                                type="submit" 
                                className='submit-btn'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
