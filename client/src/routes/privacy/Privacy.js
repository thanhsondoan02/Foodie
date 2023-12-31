import { useEffect } from "react";
import privacyContent from "./privacyContent"
import "../refund/refunds.css"

const Privacy = () => {
    useEffect(() => {
        document.title = "Privacy | Foodie";
    }, []);
    return (
        <main className="terms">
            <h2>Privacy</h2>
            <p>This Privacy Policy ("Policy") outlines how Foodie ("Foodie," "we," "our," or "us") collects, uses, and protects your personal information when you use our Instagram growth services. By using our services, you ("you," "your," or "user") consent to the practices described in this Policy.</p>
            {privacyContent.map((content) =>
                <section key={content.title}>
                    <h4>{content.id}. {content.title}:</h4>
                    <p>{content.content}</p>
                </section>)}
            <p>If you have any questions or concerns regarding our Privacy Policy, please contact us at info@foodie.com.
                Thank you for trusting Foodie with your personal information.</p>
        </main>
    )
}

export default Privacy;