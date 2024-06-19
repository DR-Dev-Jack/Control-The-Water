document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.querySelector('button[type="submit"]');
    calculateButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        function convertToNumber(value, type) {
            const conversions = {
                showerDuration: {
                    "less_than_5": 2.5,
                    "5_to_10": 7.5,
                    "10_to_15": 12.5,
                    "more_than_15": 17.5
                },
                showerFrequency: {
                    "1_to_2": 1.5,
                    "3_to_4": 3.5,
                    "5_to_6": 5.5,
                    "daily": 7
                },
                toiletFlushes: {
                    "1_to_2": 1.5,
                    "3_to_4": 3.5,
                    "5_or_more": 5
                },
                dishwasherUsage: {
                    "rarely": 0.2,
                    "occasionally": 0.5,
                    "weekly": 1,
                    "daily": 7
                },
                laundryFrequency: {
                    "rarely": 0.5,
                    "weekly": 1,
                    "2_to_3_times": 2.5,
                    "daily": 7
                },
                drinkingWater: {
                    "less_than_4": 2,
                    "4_to_8": 6,
                    "more_than_8": 10
                },
                meatConsumption: {
                    "no": 0,
                    "rarely": 0.5,
                    "occasionally": 1,
                    "regularly": 2,
                    "daily": 7
                },
                cerealConsumption: {
                    "no": 0,
                    "rarely": 0.5,
                    "occasionally": 1,
                    "regularly": 2,
                    "daily": 7
                },
                dairyConsumption: {
                    "no": 0,
                    "rarely": 0.5,
                    "occasionally": 1,
                    "regularly": 2,
                    "daily": 7
                }
            };
            return conversions[type][value];
        }

        function getCheckboxValues(name) {
            const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
            return Array.from(checkboxes).map(cb => cb.value);
        }

        const showerDuration = convertToNumber(document.getElementById("showerDuration").value, "showerDuration");
        const showerFrequency = convertToNumber(document.getElementById("showerFrequency").value, "showerFrequency");
        const toiletFlushes = convertToNumber(document.getElementById("toiletFlushes").value, "toiletFlushes");
        const dishwasherUsage = convertToNumber(document.getElementById("dishwasherUsage").value, "dishwasherUsage");
        const laundryFrequency = convertToNumber(document.getElementById("laundryFrequency").value, "laundryFrequency");
        const outdoorWatering = document.getElementById("outdoorWatering").value === "yes" ? 1 : 0;
        const drinkingWater = convertToNumber(document.getElementById("drinkingWater").value, "drinkingWater");
        const meatConsumption = convertToNumber(document.getElementById("meatConsumption").value, "meatConsumption");
        const cerealConsumption = convertToNumber(document.getElementById("cerealConsumption").value, "cerealConsumption");
        const dairyConsumption = convertToNumber(document.getElementById("dairyConsumption").value, "dairyConsumption");

        const meatTypes = getCheckboxValues("meat");
        const cerealTypes = getCheckboxValues("cereal");
        const dairyTypes = getCheckboxValues("dairy");

        const waterUsagePerType = {
            meat: {
                beef: 1000,
                pork: 500,
                chicken: 250,
                fish: 100
            },
            cereal: {
                wheat: 500,
                rice: 600,
                corn: 400
            },
            dairy: {
                milk: 400,
                cheese: 500,
                yogurt: 300
            }
        };

        const showerWater = showerDuration * showerFrequency * 6;
        const toiletWater = toiletFlushes * 7;
        const dishwasherWater = dishwasherUsage * 10;
        const laundryWater = laundryFrequency * 50;
        const outdoorWater = outdoorWatering * 20;
        const drinkWater = drinkingWater * 0.25;

        const averageWaterUsage = (types, usagePerType) => {
            if (types.length === 0) return 0;
            const total = types.reduce((sum, type) => sum + usagePerType[type], 0);
            return total / types.length;
        };

        const meatWater = meatConsumption * averageWaterUsage(meatTypes, waterUsagePerType.meat);
        const cerealWater = cerealConsumption * averageWaterUsage(cerealTypes, waterUsagePerType.cereal);
        const dairyWater = dairyConsumption * averageWaterUsage(dairyTypes, waterUsagePerType.dairy);

        console.log({
            showerWater,
            toiletWater,
            dishwasherWater,
            laundryWater,
            outdoorWater,
            drinkWater,
            meatWater,
            cerealWater,
            dairyWater
        });

        var xValues = ["Douchen", "Toilet", "Vaatwasser", "Wasmachine", "Plantjes", "Drinken"];
        var yValues = [showerWater, toiletWater, dishwasherWater, laundryWater, outdoorWater, drinkWater];
        var barColors = ["darkred", "green", "blue", "orange", "brown", "purple"];

        new Chart("myChart", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                legend: { 
                    display: false,
                    labels: {
                        fontColor: '#ffffff'
                    }
                },
                title: {
                    display: true,
                    text: "Water gebruik in Liters per week",
                    fontColor: '#ffffff'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#ffffff'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Liters',
                            fontColor: '#ffffff'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#ffffff'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Categorieën',
                            fontColor: '#ffffff'
                        }
                    }]
                }
            }
        })

        var xValues = ["Vlees", "Granen", "Zuivel"];
        var yValues = [meatWater, cerealWater, dairyWater];
        var barColors = ["darkred", "green", "blue"];

        new Chart("mySecondChart", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                legend: { 
                    display: false,
                    labels: {
                        fontColor: '#ffffff'
                    }
                },
                title: {
                    display: true,
                    text: "Water gebruik in Liters per week",
                    fontColor: '#ffffff'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#ffffff'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Liters',
                            fontColor: '#ffffff'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#ffffff'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Categorieën',
                            fontColor: '#ffffff'
                        }
                    }]
                }
            }
        })
    });
});
