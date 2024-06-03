import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.png';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const Addproduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "event",
    price: "",
    description: "",
    Rstart_date: "",
    Rend_date: "",
    start_date: "",
    duration: "",
  });

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'images_preset'); // Updated with your upload preset

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/djexiuzrj/image/upload', // Updated with your Cloudinary cloud name
        formData
      );

      responseData = response.data;
      product.image = responseData.secure_url; // Cloudinary URL

      console.log(product);
      const addProductResponse = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const addProductData = await addProductResponse.json();
      addProductData.success ? alert("Product Added") : alert("Failed");
    } catch (error) {
      console.error('Upload Error:', error);
      alert("Failed to upload image");
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Name</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.price} onChange={changeHandler} type="number" name="price" placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Type</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="event">Event</option>
          <option value="workshop">Workshop</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select one</p>
        </div>
        {image && <img src={URL.createObjectURL(image)} alt="Preview" className='addproduct-thumnail-image' />}
      </div>

      <div className="addproduct-itemfield">
        <p>Enter Description</p>
        <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Type here' />
      </div>
      <div className="addproduct-startend">
        <div className="addproduct-itemfield">
          <p>Registration Date Start</p>
          <input value={productDetails.Rstart_date} onChange={changeHandler} type="date" name='Rstart_date' />
        </div>
        <div className="addproduct-itemfield">
          <p>Registration Date End</p>
          <input value={productDetails.Rend_date} onChange={changeHandler} type="date" name='Rend_date' />
        </div>
      </div>
      <div className="addproduct-duration">
        <div className="addproduct-itemfield">
          <p>Date</p>
          <input value={productDetails.start_date} onChange={changeHandler} type="date" name='start_date' />
        </div>
        <div className="addproduct-itemfield">
          <p>Duration</p>
          <input value={productDetails.duration} onChange={changeHandler} type="text" name='duration' placeholder='Type here' />
        </div>
      </div>
      <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
    </div>
  );
};

export default Addproduct;