document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.querySelector('button[type="submit"]');
    calculateButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        // Function to convert text values to numbers
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
                beverages: {
                    "none": 0,
                    "1_to_2": 1.5,
                    "3_to_5": 4,
                    "more_than_5": 6
                },
                meatConsumption: {
                    "rarely": 0.5,
                    "occasionally": 1,
                    "regularly": 2,
                    "daily": 7
                },
                cerealConsumption: {
                    "rarely": 0.5,
                    "occasionally": 1,
                    "regularly": 2,
                    "daily": 7
                },
                dairyConsumption: {
                    "rarely": 0.5,
                    "occasionally": 1,
                    "regularly": 2,
                    "daily": 7
                }
            };
            return conversions[type][value];
        }
        
        // Get values from the select inputs
        const showerDuration = convertToNumber(document.getElementById("showerDuration").value, "showerDuration");
        const showerFrequency = convertToNumber(document.getElementById("showerFrequency").value, "showerFrequency");
        const toiletFlushes = convertToNumber(document.getElementById("toiletFlushes").value, "toiletFlushes");
        const dishwasherUsage = convertToNumber(document.getElementById("dishwasherUsage").value, "dishwasherUsage");
        const laundryFrequency = convertToNumber(document.getElementById("laundryFrequency").value, "laundryFrequency");
        const outdoorWatering = document.getElementById("outdoorWatering").value === "yes" ? 1 : 0;
        const drinkingWater = convertToNumber(document.getElementById("drinkingWater").value, "drinkingWater");
        const beverages = convertToNumber(document.getElementById("beverages").value, "beverages");
        const cooking = document.getElementById("cooking").value === "yes" ? 1 : 0;
        const meatConsumption = convertToNumber(document.getElementById("meatConsumption").value, "meatConsumption");
        const cerealConsumption = convertToNumber(document.getElementById("cerealConsumption").value, "cerealConsumption");
        const dairyConsumption = convertToNumber(document.getElementById("dairyConsumption").value, "dairyConsumption");
        const vegetarianOrVeganDiet = document.getElementById("vegetarianOrVeganDiet").value === "yes" ? 1 : 0;
        
        // Calculate water usage
        const showerWater = showerDuration * showerFrequency * 6;
        const toiletWater = toiletFlushes * 7;
        const dishwasherWater = dishwasherUsage * 10;
        const laundryWater = laundryFrequency * 50;
        const outdoorWater = outdoorWatering * 20;
        const drinkWater = drinkingWater * 0.25;

        // Print values to the console
        console.log({
            showerWater,
            toiletWater,
            dishwasherWater,
            laundryWater,
            outdoorWater,
            drinkWater
        });

        var xValues = ["Shower", "Toilet", "Dishwasher", "Laundry", "Outdoor", "Drinks"];
        var yValues = [showerWater, toiletWater, dishwasherWater, laundryWater, outdoorWater, drinkWater];
        var barColors = ["red", "green", "blue", "orange", "brown", "yellow"];

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
                        fontColor: '#ffffff' // Change legend text color
                    }
                },
                title: {
                    display: true,
                    text: "Water Usage in Liters",
                    fontColor: '#ffffff' // Change title text color
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#ffffff' // Change y-axis text color
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Liters',
                            fontColor: '#ffffff' // Change y-axis label color
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#ffffff' // Change x-axis text color
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Categories',
                            fontColor: '#ffffff' // Change x-axis label color
                        }
                    }]
                }
            }
        })
    });
});
