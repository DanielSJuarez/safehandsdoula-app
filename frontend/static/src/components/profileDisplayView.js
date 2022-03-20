function profilesDiplayView({ image, name, started, setGetId, id, setIsSummary, city, state, service_range}) {

    const detail = (id) => {
        setIsSummary(true)
        setGetId(id)
    }

    return (
        <section onClick={() => detail(id)} className='col-md-6 col-lg-3 summaryView'>
            <div className='imgHolder'>
                <img src={image} alt={name} className='image' />
            </div>
            <div className="userHeader profileHead">
                <h2>{name}</h2>
                <label htmlFor='city'>Started</label>
                <p>{started}</p>
                <label htmlFor='location'>Location</label>
                <p>{city}<span>, {state}</span></p>
            </div>
        </section>
    )
}

export default profilesDiplayView