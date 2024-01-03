import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
    return(
        <div className="note">
        <h4>{props.title}</h4>
        <p>{props.note}</p>
        <button onClick={() => {
            props.onDelete(props.title,props.note);
        }}>
            <DeleteIcon />
        </button>
        </div>
    );
}
export default Note;