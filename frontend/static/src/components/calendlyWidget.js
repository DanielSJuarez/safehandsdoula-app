import { InlineWidget } from "react-calendly";

function CalendlyWidget ({calendly}) {
    return (
        <div>
             <InlineWidget url={calendly}/>
        </div>
    )
}

export default CalendlyWidget