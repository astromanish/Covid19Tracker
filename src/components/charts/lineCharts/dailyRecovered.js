import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class DailyRecovered extends Component {
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
                    dailyrecovered.push(daily.dailyrecovered);
                    date.push(daily.date);
                });
                dailyrecovered = dailyrecovered.slice(dailyrecovered.length - 31, dailyrecovered.length);
                date = date.slice(date.length - 30, date.length);
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
                });
            });
    }

    getChartData = canvas => {
        const data = this.state.dailyStat;
        if (data.datasets) {
            data.datasets.forEach((set) => {
                set.backgroundColor = "rgba(139, 191, 247,0.2)"
                set.borderColor = "rgb(139, 191, 247)";
                set.borderWidth = 5;
                set.pointRadius = 0;
            });
        }
        return data;
    }

    render() {
        return (
            <Line
                options={{
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    },
                    devicePixelRatio: 2,
                    legend: {
                        display: false
                    },
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                display: false,
                                maxTicksLimit: 8
                            },
                            gridLines: {
                                display: false,
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                display: false,
                                maxTicksLimit: 8
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                    }
                }}
                data={this.getChartData}
            />
        )
    }
}

export default DailyRecovered