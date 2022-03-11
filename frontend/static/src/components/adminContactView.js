function AdminContactView({ name, email, phone_number, question, reported}) {
    return (
        <div>
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{phone_number}</p>
            <p>{question}</p>
            {/* <button type="button" onClick={() => contact(id)}>Approve</button>
        <button type="button" onClick={() => contact(id)}>Delete</button> */}
        </div>
    )
}

export default AdminContactView