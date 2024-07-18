document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Graph Plot',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });

    window.plotFunction = function() {
        const funcInput = document.getElementById('functionInput').value;
        if (!funcInput) {
            alert('Please enter a function of x.');
            return;
        }

        try {
            const xValues = [];
            const yValues = [];
            for (let x = -10; x <= 10; x += 0.1) {
                const y = eval(funcInput.replace(/x/g, `(${x})`));
                xValues.push(x);
                yValues.push(y);
            }
            plotGraph(xValues, yValues);
        } catch (error) {
            alert('Invalid function. Please enter a valid function of x.');
        }
    };

    function plotGraph(xValues, yValues) {
        myChart.data.labels = xValues;
        myChart.data.datasets[0].data = yValues.map((y, index) => ({x: xValues[index], y: y}));
        myChart.update();
    }
});
