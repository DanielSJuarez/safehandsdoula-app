function ContactDetail({ name, email, question, phone_number, id }) {

    return (
        <div>
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{phone_number}</p>
            <p>{question}</p>
        </div>
    )
}

export default ContactDetail