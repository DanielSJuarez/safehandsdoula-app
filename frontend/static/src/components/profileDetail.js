function ProfileDetail({name, about, services, why, website, image, facebook, twitter, instagram}) {
    return (
        <section className='col article'>
            <div className='imgHolder'>
                <img src={image} alt={name} />
            </div>
            <h2>{name}</h2>
            <a target='blank' href={facebook}>{facebook}</a>
            <a target='blank' href={twitter}>{twitter}</a>
            <a target='blank' href={instagram}>{instagram}</a>
            <a target='blank' href={website}>{website}</a>
            <p className='summary'>{about}</p>  
            <p className='summary'>{services}</p>  
            <p className='summary'>{why}</p>  
        </section>
    )
}

export default ProfileDetail