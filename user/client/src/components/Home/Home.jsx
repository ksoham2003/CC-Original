import Header from "../Header/Header";
import "./Home.css";
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import Slider1 from "../../assets/slider1.png";
import {useNavigate} from "react-router-dom";
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const contentStyle = {
  height: '300px',
  width: "100%",
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function Home(){

    const [allproducts, setAllProducts] = useState([]);
    const [event, setEvent] = useState([]);
    const [workshop, setWorkshop] = useState([]);

    const navigate = useNavigate();

    const fetchInfo = async () => {
      const res = await fetch('http://localhost:8080/api/v1/auth/get-events');
      const data = await res.json();
      setAllProducts(data);
    }

    useEffect(() => {
      fetchInfo();
    }, []);

    useEffect(() => {
        const events = [];
        const workshops = [];
        
        allproducts?.data?.forEach(elm => {
            if(elm.category === "event") {
                events.push(elm);
            } else {
                workshops.push(elm);
            }
        });

        setEvent(events);
        setWorkshop(workshops);
    }, [allproducts]);

    return(
        <>
            <Header/>
            <div className="home-page-main-div">
                <div className="home-section1-div">
                    <Carousel autoplay>
                        <div>
                            <img src={Slider1} style={contentStyle} />
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                    </Carousel>
                </div>
                
                <div className="home-section-heading">Events</div>
                <div className="home-section2-div">
                    {
                        event?.map((elm) => (
                            <Card
                                key={elm._id}
                                onClick={() => navigate(`/event/${elm._id}`)}  // Corrected
                                style={{
                                width: 300,
                                marginRight: 10,
                                marginLeft: 10
                                }}
                                cover={
                                <img
                                    alt="example"
                                    src={`${elm.image}`}  // Corrected
                                />
                                }
                                >
                            <Meta
                                title={`${elm.name}`}  // Corrected
                                description={`${elm.description}`}  // Corrected
                            />
                        </Card>
                        ))
                    }
                </div>
                
                <div className="home-section-heading">Workshops</div>
                <div className="home-section2-div">
                {
                        workshop?.map((elm) => (
                            <Card
                                key={elm._id}
                                onClick={() => navigate(`/event/${elm._id}`)}  // Corrected
                                style={{
                                width: 300,
                                marginRight: 10,
                                marginLeft: 10
                                }}
                                cover={
                                <img
                                    alt="example"
                                    src={`${elm.image}`}  // Corrected
                                />
                                }
                                >
                            <Meta
                                title={`${elm.name}`}  // Corrected
                                description={`${elm.description}`}  // Corrected
                            />
                        </Card>
                        ))
                    }
                </div>

                <div className="home-section-heading">About Us</div>
                <div className="home-section2-div">
                    <p>Welcome to the DYPCET Coding Club! We are a community of passionate coders at DYP College of Engineering and Technology (DYPCET), dedicated to fostering a culture of learning and collaboration in the field of computer science and programming.</p>
                </div>

                <div className="home-section-heading">Our Mission</div>
                <div className="home-section2-div">
                    <p>Our mission is to provide a platform for students to enhance their coding skills, participate in coding competitions, collaborate on projects, and stay updated with the latest trends and technologies in the world of software development.</p>
                </div>

                <div className="home-section-heading">What We Offer</div>
                <div className="home-section2-div">
                    <ul style={{display: "grid", justifyContent: "center"}}>
                        <li>Regular coding workshops and seminars</li>
                        <li>Coding competitions and hackathons</li>
                        <li>Project collaboration opportunities</li>
                        <li>Guest lectures from industry experts</li>
                        <li>Networking opportunities with fellow coders</li>
                    </ul>
                </div>

                <div className="home-section-heading">Get Involved</div>
                <div className="home-section2-div">
                    <p>Whether you're a beginner or an experienced coder, everyone is welcome to join our club! Connect with us on social media, attend our events, and participate actively to make the most out of your coding journey at DYPCET.</p>
                </div>
            </div>
        </>
    )
}

export default Home;


