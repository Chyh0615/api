chartIn();
async function chartIn() {
    await getDate();
    const firstChart = document.getElementById('chart').getContext('2d');
    const chart_one = new Chart(firstChart, {
        type: 'line',
        data: {
            labels: xyears,
            datasets: [{
                label: 'Global Temperature',
                data: ytemps,
                backgroundColor: 'rgba(127,0,255,0.5)',
                borderColor: 'rgb(127,0,255)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Global Average Temperature',
                    font: {
                        size: 20,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    yAlign: 'bottom',
                    displayColors: false,
                    callbacks: {
                        title: function(item) {
                            let year = item[0].label;
                            let title = 'In ' + year;
                            return title;
                        },
                        label: function(item) {
                            let temp = item.formattedValue;
                            let label = 'Global Average Temperature: ' + temp + ' ℃';
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value, index, ticks) {
                            return value + ' ℃';
                        }
                    }
                }
            }
        }
    });

    const secondChart = document.getElementById('chart_two').getContext('2d');
    const chart_two = new Chart(secondChart, {
        type: 'line',
        data: {
            labels: xyears,
            datasets: [
                {
                    label: 'Northern Hemisphere',
                    data: northTemp,
                    backgroundColor: 'rgba(25,25,112,0.5)',
                    borderColor: 'rgb(25,25,112)',
                    borderWidth: 1
                },
                {
                    label: 'Southern Hemisphere',
                    data: southTemp,
                    backgroundColor: 'rgb(215,59,62,0.5)',
                    borderColor: 'rgb(215,59,62)',
                    borderWidth: 1
                },
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Compare The Temperature of Northern Hemisphere and Southern Hemisphere',
                    font: {
                        size: 20,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    yAlign: 'bottom',
                    displayColors: false,
                    callbacks: {
                        title: function(item) {
                            let year = item[0].label;
                            let title = 'In ' + year;
                            return title;
                        },
                        label: function(item) {
                            let temp = item.formattedValue;
                            let place = item.dataset.label;
                            let label = 'The Temperature of ' + place + ': ' + temp + ' ℃';
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value, index, ticks) {
                            return value + ' ℃';
                        }
                    }
                }
            }
        }
    });
};

const xyears = [];
const ytemps = [];
const northTemp = [];
const southTemp = [];
async function getDate() {
    const response = await fetch("ZonAnn.Ts+dSST.csv");
    const data = await response.text();
    const result = data.split('\n').slice(21);

    result.forEach(item => {
        const row = item.split(',');
        const year = row[0];
        xyears.push(year);
        const temp = row[1];
        ytemps.push(parseFloat(temp) + 14);
        northTemp.push(parseFloat(row[2]) + 14);
        southTemp.push(parseFloat(row[3]) + 14);
    });
};