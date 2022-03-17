import ArticleDetail from "./articleDetail";
import { useState, useEffect} from 'react'
import { useOutletContext } from "react-router-dom";
import {environment} from '../config/settings'


function ArticleHow() {
    // const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();
    const { handleError } = useOutletContext();
    const [article, setArticle] = useState(null)
    // console.log(environment)
    useEffect(() => {
        const getArticle = async () => {

            let location = ''
            if (environment === 'development'){
                location = 'http://localhost:8000'
            } else if (environment === 'production'){
                location = 'https://safehandsdoula-app-dsj.herokuapp.com'
            }
            const response = await fetch(`/api/v1/articles/`).catch(handleError);

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
        article.catagory === 'HOW'
    ))

    const articleList = filterArticle.map(article => (
        <ArticleDetail key={article.id} {...article}/>
    ))

    return (
        <>
            <div>
                {articleList}
            </div>
            <div className='pageSupport'>
                <p>“The so called miracle of birth is nature getting her own way.” - Camille Paglia</p>
            </div>
        </>
    )
}

export default ArticleHow