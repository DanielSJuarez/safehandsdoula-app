function ArticleDetail ({title, image, text}) {
    return (
        <article>
            <div>
                <img src={image} alt={title}/>
            </div>
            <h1>{title}</h1>
            <hr/>
            <div>{text}</div>
        </article>
    )
}

export default ArticleDetail