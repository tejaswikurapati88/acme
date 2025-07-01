import './Home.css'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label
} from "recharts";
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
    const [preweight, setweight] = useState('48')
    const [targetWeight, settarget] = useState("43")
    const [selectedDate, setSelectedDate] = useState(new Date('2025-06-02')); 

    const today = new Date();
    const elapsedTime = today.getTime() - selectedDate.getTime();
    const elapsedDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const remainingDays = 30 - elapsedDays;

    const data = [
        { month: "Jan", weight: 60 },
        { month: "Feb", weight: 62 },
        { month: "Mar", weight: 58 },
        { month: "Apr", weight: 50 },
        { month: "May", weight: 48 },
    ];

    return (
        <div>
            <Header />
            <div className='home-cont'>
                <Sidebar />
                <div className='main-cont'>
                    <div className='top-cont'>
                        <div className='cont'>
                            <h3 className='sub-h'>Weight Change</h3>
                            <p className='value'>{preweight - 60}kgs</p>
                        </div>
                        <div className='cont'>
                            <h3 className='sub-h'>Next Shipment</h3>
                            <p className='value'>
                                {remainingDays > 0 ? `${remainingDays} days left` : `Completed`}
                            </p>
                        </div>
                        <div className='cont'>
                            <h3 className='sub-h'>Registered Users</h3>
                            <p className='value'>5000+</p>
                        </div>
                        <div className='cont'>
                            <h3 className='sub-h'>Happy Results</h3>
                            <p className='value'>4580+</p>
                        </div>
                    </div>
                    <div className='cont-gr'>
                        <div className='graph-cont'>
                            <ResponsiveContainer >
                                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis >
                                        <Label value="Weight" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                                    </YAxis>
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='cont-inps'>
                            <div className='sub-scon'>
                                <div className='sid-cont'>
                                    <h4>Your Present Weight</h4>
                                    <div
                                        style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                                        <input type='text' className={targetWeight === "" ? "empty-inp inp-val" : "inp-val"} value={preweight}
                                            onChange={(e) => { setweight(e.target.value) }} />
                                        <p className='inp-units' style={{ marginTop: "0px" }}>kgs</p>
                                    </div>
                                </div>
                                <div className='sid-cont'>

                                    <h4>Target Weight</h4>
                                    <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                                        <input type='text' className={targetWeight === "" ? "empty-inp inp-val" : "inp-val"} value={targetWeight}
                                            onChange={(e) => { settarget(e.target.value) }} />
                                        <p className='inp-units' style={{ marginTop: "0px" }}>kgs</p>
                                    </div>
                                </div>
                            </div>
                            <div className='medi-cont'>

                                <h4>Past Medications</h4>
                                {/*<input type='text' className='inp-vall' value={med}
                                    onChange={(e) => { setMed(e.target.value) }} />*/}
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="MMM dd, yyyy"
                                    className='inp-vall'
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home