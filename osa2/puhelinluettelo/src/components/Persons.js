import React from 'react'
import Button from './Button'


const Persons = ({ persons, removePerson }) => {
    return (
        <div>
            {persons.map(p =>
                [
                    <p key={p.id}>{p.name} {p.number}</p>,
                    <Button key={p.name} text={'delete'} handleClick={() => removePerson(p.id)} />
                ])}
        </div>
    )
}

export default Persons