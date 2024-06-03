import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/recycle-bin.png';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';

const EnrolledList = () => {

    const { id } = useParams();

    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => {
                setAllProducts(data.enrolled);
            });
    };

    useEffect(() => {
        getStudents();
        // fetchInfo();
    }, []);

    const getStudents = async () => {
        await fetch('http://localhost:4000/getStudent', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        }).then((res) => res.json())
            .then((data) => {
                setAllProducts(data.enrolled);
            });
    };

    useEffect(() => {
        console.log(allproducts);
    }, [allproducts]);

    const exportToCSV = () => {
        const csvData = Papa.unparse(allproducts);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "enrolled_students.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className='list-product'>
            <h1>Enrolled Students</h1>
            <button onClick={exportToCSV} className="export-btn">Export to CSV</button>
            <div className="listproduct-format-main">
                <p>Name</p>
                <p>Email</p>
                <p>Department</p>
                <p>Year</p>
                <p>Div</p>
                <p>Mobile</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts?.map((product, index) => {
                    return <>
                        <div key={index} className="listproduct-format-main listproduct-format">
                            <p>{product.name}</p>
                            <p>{product.email}</p>
                            <p>{product.department}</p>
                            <p>{product.year}</p>
                            <p>{product.div}</p>
                            <p>{product.mobile}</p>
                        </div>
                        <hr />
                    </>
                })}
            </div>
        </div>
    );
}

export default EnrolledList;    