/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import NoteService from '../services/note.service'
import "../css/Home.css";
import { useHistory } from "react-router-dom";

const stringSimilarity = require('string-similarity')

function HomePage() {
    const [notes, setNotes] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (!notes) {
            getNotes();
        }
    })

    const getNotes = async () => {
        let res = await NoteService.getAll(localStorage.getItem('uid'));
        setNotes(res);
    }

    const editClick = note => {
        localStorage.setItem('ToEdit', JSON.stringify(note))
        setTimeout(() => {
            localStorage.removeItem('ToEdit') //i want to find a better way of doing this, but I can't figure anything out rn
        }, 1000)
        history.push('/note')
    }

    const clickHandler = async () => {
        let search = document.getElementById('search')
        if (!search || !search.value) return

        await getNotes()

        let newNotes = []
        for (let i of notes) {
            let similarity = stringSimilarity.compareTwoStrings(search.value.toLowerCase(), i.title.toLowerCase())
            console.log(similarity)
            if (similarity > .7) newNotes.push(i)
            else {
                similarity = stringSimilarity.compareTwoStrings(search.value.toLowerCase(), i.text.toLowerCase())
                console.log(similarity)
                if (similarity > .7) newNotes.push(i)
            }
        }
        console.log(newNotes)
        setNotes(newNotes)
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') clickHandler()
    }

    const renderNote = note => {
        return (
            <>
                <div className='Note'>
                    <div className='TopRow'>
                        <h1 className='NoteTitle'>{note.title}</h1>
                        <div className='NoteEdit'><a href='javascript:void(0)'><i className="material-icons" onClick={() => { editClick(note) }}>edit</i></a></div>
                    </div>
                    <p1>{note.text}</p1>
                    <h3>{`Created on ${getDateString(note.createdAt)}`}</h3>
                </div>
            </>

        );
    };

    const logOut = () => {
        localStorage.clear()
        history.push('/')
    }

    if (!notes) return (
        <div className='App'>
            <div className="Header">
                <ul>
                    <li>
                        <div className='dropDownHeader'>
                            <a href='profile'>{localStorage.getItem('username')}</a>
                            <div className='dropdown-content'>
                                <button onClick={logOut}>Logout</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
    return (
        <div className='App'>
            <div className="Header">
                <ul>
                    <li>
                        <a href='note'>New</a>
                    </li>
                    <li>
                        <div className='dropDownHeader'>
                            <a href='profile'>{localStorage.getItem('username')}</a>
                            <div className='dropdown-content'>
                                <button onClick={logOut}>Logout</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="searchBox">
                <input className="searchInput" type="text" id='search' placeholder="Search" onKeyDown={handleKeyDown} />
                <button className="searchButton" onClick={clickHandler} type='submit'>
                    <i className="material-icons">search</i>
                </button>
            </div>
            <div className='Notes' style={{ position: "absolute" }}>
                {notes.map(note => renderNote(note))}
            </div>
        </div>
    )
}

export default HomePage;

function getDateString(date) {
    let d = new Date(parseInt(date))
    let year = d.getFullYear();
    let month = (1 + d.getMonth()).toString().padStart(2, '0');
    let day = d.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
}