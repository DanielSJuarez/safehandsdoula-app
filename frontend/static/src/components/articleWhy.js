import ArticleDetail from "./articleDetail";
import { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";
import { base_URL } from '../config/settings'
import Spinner from 'react-bootstrap/Spinner'


function ArticleWhy() {
    // const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();
    const { handleError } = useOutletContext();
    const [article, setArticle] = useState(null)

    useEffect(() => {
        const getArticle = async () => {

            const response = await fetch(`${base_URL}/api/v1/articles/`).catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setArticle(data);
            }
        }
        getArticle();
    }, []);

    if (!article) {
        return <div>Fetching article data....
             <Spinner animation="border" size="sm"/>
        </div>
    }

    const filterArticle = article.filter(article => (
        article.catagory === 'WHY'
    ))

    const articleList = filterArticle.map(article => (
        <ArticleDetail key={article.id} {...article} />
    ))

    return (
        <>
            <div className='container'>
                <div className="articleHolder">
                    {articleList}
                </div>
                <div className='pageSupport'>
                    <p>“There is such a special sweetness in being able to participate in creation.” - Pamela S. Nadav</p>
                </div>
            </div>
        </>
    )
}

export default ArticleWhy