function profilesDiplayView({ image, name, started, setGetId, id, setIsSummary}) {

    const detail = (id) => {
        setIsSummary(true)
        setGetId(id)
    }
   
    return (
        <section onClick={() => detail(id)}>
            <div className='imgHolder'>
                <img src={image} alt={name} />
            </div>
            <h2>{name}</h2>
            <p>{started}</p>
        </section>
    )
}

export default profilesDiplayView