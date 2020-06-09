import React from 'react'

const PersonForm = ({ persons, newName, newNumber, handleNameChange, handleNumberChange, addPerson, updatePerson }) => {
    return (
        <form onSubmit={(persons.map(p => p.name).indexOf(newName) > -1) ? updatePerson : addPerson}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm