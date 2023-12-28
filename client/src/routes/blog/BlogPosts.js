import React from "react";
import { Link } from "react-router-dom";
import ResetLocation from '../../helpers/ResetLocation';

const BlogPosts = ({ blogPost }) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: '25px',
        maxWidth: '1200px',  // Adjust as needed
    };
    const imgStyle = {
        padding: '25px',
        width: '60%',  // Image on the left (adjust as needed)
    };
    const contentContainerStyle = {
        flex: 1,
        marginLeft: '20px',  // Adjust margin between image and content
    };
    const fontStyle = {
        color: 'wheat',
        margin: '0',  // Adjust as needed
    };

    return (
        <section className="blog-grid-item" style={containerStyle}>
            <img
                src={blogPost.img}
                alt={blogPost.name}
                style={imgStyle}
            />
            <div style={contentContainerStyle}>
                <section className="credentials" style={fontStyle}>
                    <p>{blogPost.date}</p>
                    <p>by {blogPost.author}</p>
                </section>
                <Link
                    onClick={ResetLocation}
                    to={`/blog/${blogPost.name.toLowerCase().replaceAll(' ', '-')}`}
                    style={{ textDecoration: 'none' }}
                >
                    <h3 style={fontStyle}>{blogPost.name}</h3>
                </Link>
                <p className="intro" style={fontStyle}>{blogPost.intro}</p>
                <p style={fontStyle}>{blogPost.content}</p>
            </div>
        </section>
    );
}

export default BlogPosts;
