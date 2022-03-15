import ArticleDetail from "./articleDetail";
import { useState, useEffect} from 'react'
import { useOutletContext } from "react-router-dom";


function ArticleWhy() {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();
    const [article, setArticle] = useState(null)

    useEffect(() => {
        const getArticle = async () => {
            const response = await fetch('/api/v1/articles/').catch(handleError);

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
        return <div>Fetching article data....</div>
    }

    const filterArticle = article.filter(article => (
        article.catagory === 'WHY'
    ))

    const articleList = filterArticle.map(article => (
        <ArticleDetail key={article.id} {...article}/>
    ))

    return (
        <div>
            {articleList}
        </div>
    )
}

export default ArticleWhy