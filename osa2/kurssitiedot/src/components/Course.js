import React from 'react'

const Header = ({ name }) => {
    return (
        <h2>{name}</h2>
    )
}

const Total = ({ parts }) => {
    const sum = parts.map(p => p.exercises).reduce((acc, cur) => acc + cur)
    return (
        <h3>total of {sum} exercises</h3>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course