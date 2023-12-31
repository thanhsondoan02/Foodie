/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react"
import { apiGetBlog } from "../../services/BlogService";
import { toastError } from "../../helpers/toastHelper";
import './blogPost.css'

const BlogPost = () => {
    const [blogPost, setBlogPost] = useState({});

    const getBlogFromServer = async () => {
        const blogId = window.location.pathname.split("/")[2];
        try {
            const response = await apiGetBlog(blogId);
            if (response.data.EC === 0) {
                setBlogPost(response.data.DT);
            } else {
                console.log(response.data.EM);
                toastError(response.data.EM);
            }
        } catch (err) {
            console.log(err);
            toastError(err);
        }
    }

    useEffect(() => {
        document.title = `${blogPost.name} | Foodie`;
    }, [blogPost.name]);

    useEffect(() => {
        getBlogFromServer();
    }, [])

    return (
        <div className="blog-post-super-container">
            <div className="blog-post-container">
                <main className='blog-post'>
                    <section>
                        <h2 className="blog-post-header">{blogPost.name}</h2>
                        <img src={blogPost.img} alt="" aria-hidden="true" />

                        <div className="blog-post-credentials">
                            <p className="">By {blogPost.author}</p>
                            <p>·</p>
                            <p className="">{blogPost.date}</p>
                        </div>

                        <hr/>
                        <p className="blog-post-content">{blogPost.content}</p>
                    </section>
                </main>
                <div className="blog-post-right-bar">
                    <h4>Tags</h4>
                    <section>
                        <p>pizza</p>
                        <p>food</p>
                        <p>good</p>
                        <p>pasta</p>
                        <p>sushi</p>
                        <p>sale</p>
                        <p>vegetarian</p>
                        <p>cheese</p>
                        <p>garlic</p>
                        <p>avocado</p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default BlogPost;