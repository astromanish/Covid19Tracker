import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class Dailyrecovered extends Component {
    state = {
        dailyStat: {
            labels: [],
            datasets: [
                {
                    label: "",
                    data: []
                }
            ]
        }
    }
    componentDidMount() {
        axios.get("https://api.covid19india.org/data.json")
            .then(res => {
                var dailyrecovered = [];
                var date = [];
                res.data.cases_time_series.forEach(daily => {
                    const dailyC = dailyrecovered.push(daily.dailyrecovered);
                    const dailydate = date.push(daily.date);
                });
                dailyrecovered = dailyrecovered.slice(dailyrecovered.length - 31, dailyrecovered.length);
                date = date.slice(date.length - 31, date.length);
                this.setState({
                    dailyStat: {
                        labels: date,
                        datasets: [
                            {
                                label: "Daily recovered Cases",
                                data: dailyrecovered
                            }
                        ]
                    }
                })
                console.log(this.state);
            })
    }

    getChartData = canvas => {
        const data = this.state.dailyStat;
        if (data.datasets) {
            data.datasets.forEach((set) => {
                set.backgroundColor = "rgba(66, 135, 245,0.7)";
                set.pointBackgroundColor = "blue";
                set.pointBorderColor = "blue";
                set.borderColor = "rgba(66, 135, 245,0.7)";
                set.borderWidth = 2;
                set.pointBorderWidth = 1
            });
        }
        return data;
    }

    render() {
        return (
            <div style={{ position: "relative", width: 500, height: 400 }}>
                <Line
                    options={{
                        responsive: true
                    }}
                    data={this.getChartData}
                />
            </div>
        )
    }
}

export default Dailyrecovered