function ArticleDetail ({title, image, text}) {
    return (
        <article>
            <div className="articleImageHolder">
                <img className="articleImage" src={image} alt={title}/>
            </div>
            <h1 className='articleTitle'>{title}</h1>
            <hr/>
            <div className="articleText">{text}</div>
        </article>
    )
}

export default ArticleDetail