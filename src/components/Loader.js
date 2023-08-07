import "./Loader.css";

export default function Loader({ message }) {
    return (
        <div className="spinner-container">
            <div className="loading-spinner">
            </div>
            <br />
            <p>{message ? message : "Loading"}</p>
        </div>
    );
}