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
        if (!funcInput) return;

        try {
            const parsedFunction = math.parse(funcInput);
            const compiledFunction = parsedFunction.compile();

            const xValues = [];
            const yValues = [];
            for (let x = -10; x <= 10; x += 0.1) {
                const scope = { x };
                const y = compiledFunction.evaluate(scope);
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
        myChart.data.datasets[0].data = yValues.map((y, index) => ({ x: xValues[index], y: y }));
        myChart.update();
    }

    window.addToInput = function(value) {
        const funcInput = document.getElementById('functionInput');
        funcInput.value += value;
        renderFunction();
        funcInput.focus();
    };

    window.clearInput = function() {
        const funcInput = document.getElementById('functionInput');
        funcInput.value = '';
        document.getElementById('functionDisplay').innerHTML = '';
        funcInput.focus();
    };

    window.backspace = function() {
        const funcInput = document.getElementById('functionInput');
        funcInput.value = funcInput.value.slice(0, -1);
        renderFunction();
        funcInput.focus();
    };

    function renderFunction() {
        const funcInput = document.getElementById('functionInput').value;
        const display = document.getElementById('functionDisplay');
        try {

            let latexInput = funcInput
                .replace(/(\d)\^(\d+)/g, '$1^{ $2 }')
                .replace(/(\d)\^(\w+)/g, '$1^{ $2 }')
                .replace(/sqrt\(/g, '\\sqrt{')
                .replace(/\)/g, '}')
                .replace(/([a-zA-Z0-9]+)\(/g, '$1{')
                .replace(/\^([^\d])/g, '^{ $1}')
                .replace(/\{/g, '\\{')
                .replace(/\}/g, '\\}');

            katex.render(latexInput, display, { throwOnError: false });
        } catch (error) {
            display.innerHTML = 'Invalid function';
        }
    }

    document.getElementById('functionInput').addEventListener('input', renderFunction);
});
