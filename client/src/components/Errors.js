const Errors = ({errors}) => {
    if (errors) {
         return (
        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
    )
    }
   
}

export default Errors;