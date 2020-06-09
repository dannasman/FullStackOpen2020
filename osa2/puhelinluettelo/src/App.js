import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/personService'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newSearch, setNewSearch] = useState('')
	const [showNotification, setShowNotification] = useState(false)
	const [notificationMessage, setNotificationMessage] = useState('')
	const [notificationType, setNotificationType] = useState('')

	useEffect(() => {
		console.log('effect')
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber
		}

		personService
			.create(personObject)
			.then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
				setNotificationMessage(`Added ${newName}`)
				setNotificationType('success')
				setShowNotification(true)

				setTimeout(() => {
					setNotificationMessage('')
					setNotificationType('')
					setShowNotification(false)
				}, 3000)

				setNewName('')
				setNewNumber('')
			})
			.catch(error => {
				setNotificationMessage(`Failed to add ${newName}`)
				setNotificationType('error')
				setShowNotification(true)

				setTimeout(() => {
					setNotificationMessage('')
					setNotificationType('')
					setShowNotification(false)
				}, 3000)

				setNewName('')
				setNewNumber('')
			})
	}

	const removePerson = (id) => {
		if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
			personService
				.remove(id)
				.then(returnedPerson => {
					personService.getAll()
						.then(existingPersons => {
							setPersons(existingPersons)
							setNotificationMessage(`Deleted ${persons.find(p => p.id === id).name}`)
							setNotificationType('success')
							setShowNotification(true)
							setTimeout(() => {
								setNotificationMessage('')
								setNotificationType('')
								setShowNotification(false)
							}, 3000)
						})
				})
				.catch(error => {
					setNotificationMessage(`Information of ${persons.find(p => p.id === id).name} has already been removed from server`)
					setNotificationType('error')
					setShowNotification(true)

					setTimeout(() => {
						setNotificationMessage('')
						setNotificationType('')
						setShowNotification(false)
					}, 3000)

					setNewName('')
					setNewNumber('')
				})
		}
	}

	const updatePerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber
		}
		if (window.confirm(`${persons.find(p => p.id === persons.find(p => p.name === newName).id).name} is already in the phonebook, replace the old number with a new one?`)) {
			personService
				.update(persons.find(p => p.name === newName).id, personObject)
				.then(returnedPerson => {
					setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
					setNotificationMessage(`Updated ${newName}`)
					setNotificationType('success')
					setShowNotification(true)
					setTimeout(() => {
						console.log('täällä, tänään')
						setNotificationMessage('')
						setNotificationType('')
						setShowNotification(false)
					}, 3000)
				})
				.catch(error => {
					setNotificationMessage(`Failed to update information of ${newName}`)
					setNotificationType('error')
					setShowNotification(true)

					setTimeout(() => {
						setNotificationMessage('')
						setNotificationType('')
						setShowNotification(false)
					}, 3000)
				})
		}
	}

	const handleSearchChange = (event) => setNewSearch(event.target.value)

	const handleNameChange = (event) => setNewName(event.target.value)

	const handleNumberChange = (event) => setNewNumber(event.target.value)

	return (
		<div>
			{showNotification ? <Notification message={notificationMessage} type={notificationType} /> : null}
			<h2>Phonebook</h2>
			<Filter value={newSearch} handleSearchChange={handleSearchChange} />
			<h3>add a new</h3>
			<PersonForm persons={persons} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange} addPerson={addPerson} updatePerson={updatePerson} />
			<h3>Numbers</h3>
			<Persons persons={persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase()))} removePerson={removePerson} />
		</div>
	)

}

export default App
