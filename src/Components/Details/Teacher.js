import React, { useMemo } from 'react'
import { useGetTeachersQuery } from '../../features/api/teachersSlice';
import { useNavigate } from 'react-router-dom';
import './Details.css';

export default function Teacher({ name }) {
    const navigate = useNavigate();
    const { data: teachers, isLoading, isError, error } = useGetTeachersQuery();

    const filteredTeachers = useMemo(() => {
        return (
            teachers?.filter((teacher) => {
                // console.log("Filtering teacher:", teacher.SkillName); // 👈 debug output
                return teacher.SkillName === name;
            }) || []
        );
    }, [teachers, name]);
    // console.log(filteredTeachers);

    if (!teachers) return <p>No data available.</p>;




    const handleClick = (e) => {
        navigate(`/details/${name}/${e.Institute}`)
        console.log(name, e.Institute);
    }

    return (
        <div>
            <h3>Teachers List</h3>
            <div>
                {filteredTeachers.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f0f0' }}>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>#</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Address</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Country</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Period (months)</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Fees (₹)</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeachers.map((e, index) => (
                                <tr key={index} onClick={() => handleClick(e)} className='clickable'>
                                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{index + 1}</td>
                                    <td style={{
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                        color: 'blue',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}>{e.Institute}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.Address}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.Country}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.PeriodInMonths}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.Fees}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{e.Rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No teachers found for "{name}".</p>
                )}
            </div>

            <div>
                <button className='clickable' style={{ fontSize: "20px", margin: "20px", width: "40px", height: '40px' }} onClick={() => navigate('/NewTeacher')}> + </button>
            </div>

        </div>
    )
}


