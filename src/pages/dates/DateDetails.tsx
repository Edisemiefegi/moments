import { useParams } from "react-router-dom";

function DateDetails() {
const { id } = useParams();

  return <div>Date details for {id}</div>
}

export default DateDetails