import { useEffect } from "react";
import refundsContent from "./refundsContent"
import "./refunds.css"

const Refunds = () => {
    useEffect(() => {
        document.title = "Refunds | Foodie";
    }, []);
    return (
        <main className="terms">
            <h2>Refunds</h2>
            <p>This Refund Policy ("Policy") outlines the terms and conditions for requesting a refund for the Instagram growth services provided by Foodie ("Pizaa Time," "we," "our," or "us"). By using our services, you ("you," "your," or "user") agree to comply with this Policy regarding refund requests.</p>
            {refundsContent.map((content) =>
                <section key={content.title}>
                    <h4>{content.id}. {content.title}:</h4>
                    <p>{content.content}</p>
                </section>)}
        </main>
    )
}

export default Refunds;