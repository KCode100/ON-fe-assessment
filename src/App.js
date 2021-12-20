import { useState, useEffect } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Notification from "./components/Notification";

function App() {
	const [myData, setMyData] = useState([]);
	const [users, setUsers] = useState([]);
	const [filterText, setFilterText] = useState("");

	const getData = async () => {
		const res = await fetch("https://randomuser.me/api?results=100&nat=us,dk,fr,gb,br");
		const data = await res.json();
		setMyData(data.results);
	};

	// Filter through users list, check if it matches input
	const filteredUsers = users.filter(
		user =>
			user.firstName.toLocaleLowerCase().includes(filterText) ||
			user.lastName.toLocaleLowerCase().includes(filterText)
	)

	// If there is input value, show search results
	const usersToDisplay = filterText ? filteredUsers : users;

	// Fetch users on page load
	useEffect(() => {
		getData();
	}, [])

	useEffect(() => {
		// filter users registered between 2000 - 2010
		const minYear = Date.parse("2000-01-01");
		const maxYear = Date.parse("2010-01-01");
		const registeredUsers = myData.filter(user => {
			const registeredYear = Date.parse(user.registered.date);
			if (registeredYear > minYear && registeredYear < maxYear) {
				return user
			}
		})

		// create user object
		const users = registeredUsers.map((user, index) => {
			return {
				"firstName": user.name.first,
				"lastName": user.name.last,
				"image": user.picture.medium,
				"registered": user.registered.date.substring(0, 10),
				"gender": user.gender
			}
		})
		setUsers(users)
	}, [myData])

	return (
		<div className="app">
			<Header />
			<main>
				<section>
					<p>Filter users by name:</p>
					<input
						type="text"
						placeholder="Filter users by name"
						value={filterText}
						onChange={e => setFilterText(e.target.value.toLocaleLowerCase())}
					/>
				</section>
				{!filteredUsers.length && <Notification />}
				<section>
					<ul className="list">
						{usersToDisplay.map((user, index) => <Card user={user} key={index} />)}
					</ul>
				</section>
			</main>
		</div>
	);
}

export default App;
