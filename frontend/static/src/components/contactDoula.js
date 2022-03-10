import { useState } from "react"

function ContactDoula() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [info, setInfo] = useState('')

    const back = () => {
        setName('')
        setEmail('')
        setPhone('')
        setInfo('')
        navigate('/home')
    }

    return (
        <div className='loginPlacholder'>
            <form onSubmit={handleSubmit}>
                <div className='col loginField'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' className='inputField' name='name' id='name' placeholder='name' onChange={(e) => setName(e.target.value)} required value={name} />
                </div>
                <div className='col loginField'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' className='inputField' name='email' id='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} required value={email} />
                </div>
                <div className='col loginField'>
                    <label htmlFor='phone'>Phone</label>
                    <input type='text' className='inputField' name='phone' id='phone' placeholder='phone' onChange={(e) => setPhone(e.target.value)} required value={phone} />
                </div>
                <div className='col loginField'>
                    <label htmlFor='info'>Info</label>
                    <input type='text' className='inputField' name='info' id='info' placeholder='info' onChange={(e) => setInfo(e.target.value)} required value={info} />
                </div>
                <div className='col loginField'>
                    <button className='loginRegisterButton' type='button' onClick={() => back()}>Back</button>
                    <button className='loginRegisterButton' type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default ContactDoula