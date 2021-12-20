const Card = ({ user }) => {
    return (
        <li className={`card ${user.gender}`} >
            <figure>
                <img src={user.image} />
            </figure>
            <div className="description">
                <p className="description__name">{user.firstName} {user.lastName}</p>
                <p className="description__date">{user.registered}</p>
            </div>
        </li >
    );
}

export default Card;