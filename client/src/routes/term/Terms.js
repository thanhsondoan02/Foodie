import { useEffect } from "react";
import termsContent from "./termsContent";
import "../refund/refunds.css"

const Terms = () => {
    useEffect(() => {
        document.title = "Terms | Foodie";
    }, []);
    return (
        <main className="terms">
            <h2>Terms & Conditions</h2>
            <p>Welcome to Foodie. These Terms of Service outline the rules and guidelines for using our website and services. By accessing or using our website, you agree to abide by these terms. Please read them carefully before proceeding.</p>
            {termsContent.map((content) =>
                <section key={content.title}>
                    <h4>{content.id}. {content.title}:</h4>
                    <p>{content.content}</p>
                </section>)}
        </main>
    )
}

export default Terms;