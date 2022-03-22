import ArticleDetail from "./articleDetail";
import { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";
import { base_URL } from '../config/settings'
import Spinner from 'react-bootstrap/Spinner'


function ArticleWhy() {
    // const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula, searchParams, handleError, preview, setPreview, profileImg, setProfileImg, isSummary, setIsSummary, isSuperUser, setIsSuperUser] = useOutletContext();
    const { handleError } = useOutletContext();
    const [article, setArticle] = useState(null)
    const [getImage, setGetImage] = useState(null)

    useEffect(() => {
        const getArticle = async () => {

            const response = await fetch(`${base_URL}/api/v1/articles/`).catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                console.log(data)
                setGetImage(data[2].image)
                // setArticle(data);
            }
        }
        getArticle();
    }, []);

    if (!getImage) {
        return <div>Fetching article data....
            <Spinner animation="border" size="sm" />
        </div>
    }

    // const filterArticle = article.filter(article => (
    //     article.catagory === 'WHY'
    // ))

    // const articleList = filterArticle.map(article => (
    //     <ArticleDetail key={article.id} {...article} />
    // ))

    return (
        <>
            <div className='container'>
                <div className="articleHolder">
                    {/* {articleList} */}
                    <article>
                        <div className="articleImageHolder">
                            <img className="articleImage" src={getImage} alt='why'/>
                        </div>
                        <h1 className='articleTitle'>Why</h1>
                        <hr />
                        <div className="articleText"><p>Why do you need a doula?
                            Research shows that hiring a doula has a significant impact on the labor and birth you may experience. According to these studies they found that continuous support during labor results in:</p>
                            <ul>
                                <li>25% decrease in the risk of Cesarean; the largest effect was seen with a doula (39% decrease)*
                                </li>
                                <li>8% increase in the likelihood of a spontaneous vaginal birth; the largest effect was seen with a doula (15% increase)*
                                </li>
                                <li>10% decrease in the use of any medications for pain relief; the type of person providing continuous support did not make a difference
                                </li>
                                <li>Shorter labors by 41 minutes on average; there is no data on if the type of person providing continuous support makes a difference
                                </li>
                                <li>38% decrease in the baby’s risk of a low five minute Apgar score; there is no data on if the type of person providing continuous support makes a difference
                                </li>
                                <li>31% decrease in the risk of being dissatisfied with the birth experience; mothers’ risk of being dissatisfied with the birth experience was reduced with continuous support provided by a doula or someone in their social network (family or friend), but not hospital staff
                                </li>
                            </ul>
                            <p>(2 outcomes indicated by an * were with the support of a doula and not that of hospital staff or partner).
                                Doulas will not leave your side. While hospital staff may rotate shifts and not always be in the room with you, or your midwife doesn’t show up until a certain point, a doula will be with you from the moment you say you need her til after the birth of your baby. It can be the certain consistency that is just what your labor needs to progress. Everyone needs to feel supported during this life changing moment. Whether it’s your first birth or your fifth, you deserve the support to bring your baby earthside.
                            </p>
                            <a target='blank' href='https://evidencebasedbirth.com/the-evidence-for-doulas/'>Read More...</a>
                        </div>
                    </article>
                </div>
                <div className='pageSupport'>
                    <p>“There is such a special sweetness in being able to participate in creation.” - Pamela S. Nadav</p>
                </div>
            </div>

        </>
    )
}

export default ArticleWhy