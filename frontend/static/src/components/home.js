import { useOutletContext } from "react-router-dom";
import { useEffect } from 'react';

function Home () {
    const [auth, setAuth, navigate, createDoula, setCreateDoula, setIsDoula] = useOutletContext();

    const handleError = (err) => {
        console.log(err);
    }

    useEffect(() => {
                const isDoula = async () => {
                    const response = await fetch('/api/v1/accounts/doula/').catch(handleError);
                    if (!response.ok) {
                        throw new Error('Netword response was not OK!')
                    } else {
                        const data = await response.json();
                        if (data[0].is_doula == true) {
                            setIsDoula(true)
                        }
                    }
                }
                isDoula();
            }, []);

    return (
    <div>I am the home page</div>
    )
}

export default Home