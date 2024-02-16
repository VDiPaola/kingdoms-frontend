const TitleComponent = () => {
    return(
        <div className="text-center text-6xl font-bold p-2"><p>{process.env.REACT_APP_TITLE}</p></div>
    )
}

export default TitleComponent;