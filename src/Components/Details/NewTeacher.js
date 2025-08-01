import React, { useState } from 'react';
import countryList from 'react-select-country-list';
import { useCreateTeacherMutation } from '../../features/api/teachersSlice';
import './Details.css';
import { useNavigate } from 'react-router-dom';
import { useGetImagesQuery } from '../../features/api/imageSlice'


export default function NewTeacher() {
    const countryOptions = countryList().getData();
    const [createTeacher] = useCreateTeacherMutation();
    const { data: images, isLoading, isError, error } = useGetImagesQuery();

    const navigate = useNavigate();


    const [teacherForm, setTeacherForm] = useState({
        Institute: '',
        Address: '',
        Country: '',
        PeriodInMonths: '',
        Fees: '',
        Rating: '',
        SkillName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacherForm({ ...teacherForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted Data:', teacherForm);
        try {
            const result = await createTeacher(teacherForm).unwrap();
            console.log('Teacher created successfully:', result);
            navigate(`/details/${teacherForm.SkillName}`);

        } catch (error) {
            console.error('Error creating teacher:', error);
            alert(`Failed to create teacher: ${error?.data?.error || 'Unknown error'}`);

        }
    };

    return (
        <div className='NewTeacher'>

            <form onSubmit={handleSubmit} className='card'>
                <h2>Add New Teacher</h2>
                Institute Name : <input
                    type='text'
                    placeholder='Institute Name'
                    name='Institute'
                    value={teacherForm.Institute}
                    onChange={handleChange}
                />

                Address : <input
                    type='text'
                    placeholder='Address'
                    name='Address'
                    value={teacherForm.Address}
                    onChange={handleChange}
                />

                Country : <select
                    name='Country'
                    value={teacherForm.Country}
                    onChange={handleChange}
                >
                    <option value=''>Select Country</option>
                    {countryOptions.map((country) => (
                        <option key={country.value} value={country.label}>
                            {country.label}
                        </option>
                    ))}
                </select>

                Course Period : <input
                    type='text'
                    placeholder='Period In Months'
                    name='PeriodInMonths'
                    value={teacherForm.PeriodInMonths}
                    onChange={handleChange}
                />

                Fees : <input
                    type='text'
                    placeholder='Fees'
                    name='Fees'
                    value={teacherForm.Fees}
                    onChange={handleChange}
                />

                Rating : <select
                    name='Rating'
                    value={teacherForm.Rating}
                    onChange={handleChange}
                >
                    <option value=''>Rating</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>

                Select Skill :
                <select name="SkillName" onChange={handleChange}>
                    <option value="">Select a skill</option>
                    {images?.map((e, i) => (
                        <option key={i} value={e.Name}>
                            {e.Name}
                        </option>
                    ))}
                </select>


                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}
