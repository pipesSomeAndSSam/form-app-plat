import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/helper/supabaseClient';
import Form from '../forms/Form.css';

const Forms = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [picture, setPicture] = useState('');
  const [surname, setSurname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPeople = async () => {
    try {
      const { data, error } = await supabase.from('form').select('*');
      if (error) throw error;
      setPeople(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsClicked(true);

    try {
      const { data, error } = await supabase.from('form').insert([
        {
          picture,
          surname,
          firstname: firstName,
          gender,
          address,
          contact,
        },
      ]);

      if (error) throw error;

      alert('Data successfully added!');
      setPicture('');
      setSurname('');
      setFirstName('');
      setGender('');
      setAddress('');
      setContact('');
      fetchPeople();
    } catch (error) {
      console.error('Error inserting data:', error);
      alert('Error: ' + error.message);
    } finally {
      setIsClicked(false);
    }
  };

  const filteredPeople = people.filter((person) =>
    `${person.surname} ${person.firstname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="header">
        <div className="website-name">QuickFormz</div>
        <div className="website-info">Input information below.</div>
      </div>
      <div className="container">
        <div className="inputs">
          <div className="inputholder">
            <div className="place-holder">Upload Your Picture</div>
            <div className="inputnb">
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
          <div className="inputholder">
            <div className="place-holder">Your Surname</div>
            <div className="input">
              <input type="text" placeholder="De la Cruz" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>
          </div>
          <div className="inputholder">
            <div className="place-holder">Your First Name</div>
            <div className="input">
              <input type="text" placeholder="Juan" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
          </div>
          <div className="inputholder">
            <div className="place-holder">Your Gender</div>
            <div className="input">
              <input type="text" placeholder="Male" value={gender} onChange={(e) => setGender(e.target.value)} />
            </div>
          </div>
          <div className="inputholder">
            <div className="place-holder">Your Address</div>
            <div className="input">
              <input type="text" placeholder="Baybay, Leyte" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
          <div className="inputholder">
            <div className="place-holder">Your Contact Number</div>
            <div className="input">
              <input type="text" placeholder="09671951947" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="submit-container">
          <div className={`submit ${isClicked ? 'clicked' : ''}`} onClick={handleSubmit}>
            Submit
          </div>
        </div>
      </div>
      <div className="header">
        <div className="website-name">QuickFormz</div>
        <div className="website-info">Search or see people.</div>
      </div>
      <div className="containergrid">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
        </div>
        {filteredPeople.length > 0 ? (
          <ul className='no-bulets-info'>
            {filteredPeople.map((person) => (
              <li key={person.id}>
                <div className='infofetch'>
                  <img src={person.picture} alt="Profile" className="image-fit" />
                  <strong>{person.surname}, {person.firstname}</strong> - {person.gender}, {person.address}, {person.contact}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="textnodata">No Data available</div>
        )}
      </div>
      <div className="footer">
        <div className="footer-info">QuickFormz by: Arradaza</div>
      </div>
    </div>
  );
};

export default Forms;

/*
<div className="container">
        {people.length > 0 ? (
          <ul>
            {people.map((person) => (
              <li key={person.id}>
                <strong>{person.surname}, {person.firstname}</strong> - {person.gender}, {person.address}, {person.contact}
              </li>
            ))}
          </ul>
        ) : (
            <div className="textnodata">No Data available</div>
        )}
      </div>
*/

/*
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/helper/supabaseClient';

const Forms = () => {
  const [isClicked, setIsClicked] = useState(false);

  // State to store form values
  const [picture, setpicture] = useState('');
  const [surname, setSurname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  // State to store fetched data
  const [people, setPeople] = useState([]);

  // Fetch data from Supabase
  const fetchPeople = async () => {
    try {
        console.log('check');
      const { data, error } = await supabase.from('form').select('*');
      console.log('che12132',data);
      if (error) throw error;
      setPeople(data);
      console.log('check12132',data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchPeople();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsClicked(true);

    try {
      const { data, error } = await supabase.from('form').insert([
        {
          surname,
          firstname: firstName,
          gender,
          address,
          contact,
        },
      ]);

      if (error) throw error;

      alert('Data successfully added!');
      setSurname('');
      setFirstName('');
      setGender('');
      setAddress('');
      setContact('');

      // Fetch updated list after inserting new data
      fetchPeople();
    } catch (error) {
      console.error('Error inserting data:', error);
      alert('Error: ' + error.message);
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="website-name">QuickFormz</div>
        <div className="website-info">Input information in the boxes below.</div>
      </div>
      <div className="container">
        <div className="inputs">
        
          <div className="inputholder">
            <div className="place-holder">Your Surname</div>
            <div className="input">
              <input type="text" placeholder="De la Cruz" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>
          </div>
          <div className="inputholder">
            <div className="place-holder">Your First Name</div>
            <div className="input">
              <input type="text" placeholder="Juan" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
          </div>
          <div className="inputholder">
            <div className="place-holder">Your Gender</div>
            <div className="input">
              <input type="text" placeholder="Male" value={gender} onChange={(e) => setGender(e.target.value)} />
            </div>
          </div>
          <div className="inputholder">
            <div className="place-holder">Your Address</div>
            <div className="input">
              <input type="text" placeholder="Baybay, Leyte" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
          <div className="inputholder">
            <div className="place-holder">Your Contact Number</div>
            <div className="input">
              <input type="text" placeholder="09671951947" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="submit-container">
          <div className={`submit ${isClicked ? 'clicked' : ''}`} onClick={handleSubmit}>
            Submit
          </div>
        </div>
      </div>
      <div className="header">
        <div className="website-name">QuickFormz</div>
        <div className="website-info">See list of information.</div>
      </div>
      <div className="container">
        {people.length > 0 ? (
          <ul className='no-bulets-info'>
            {people.map((person) => (
              <li key={person.id}>
                    <div className='infofetch'>
                        <strong>{person.surname}, {person.firstname}</strong> - {person.gender}, {person.address}, {person.contact}
                    </div>             
              </li>
            ))}
          </ul>
        ) : (
            <div className="textnodata">No Data available</div>
        )}
      </div>
    </div>
  );
};

export default Forms;
*/