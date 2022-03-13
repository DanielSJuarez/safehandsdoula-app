function profilesDiplayView({ image, name, started, setGetId, id, setIsSummary }) {

    const detail = (id) => {
        setIsSummary(true)
        setGetId(id)
    }

    return (
        <section onClick={() => detail(id)} className='col-lg-3 summaryView'>
            <div className='imgHolder'>
                <img src={image} alt={name} className='image' />
            </div>
            <div className="userHeader profileHead">
                <h2>{name}</h2>
                <label htmlFor='started'>Started</label>
                <p>{started}</p>
            </div>
        </section>
    )
}

export default profilesDiplayView