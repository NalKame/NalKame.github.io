document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('scatterPlot');
    const ctx = canvas.getContext('2d');
    let points = [];
    const savedDataSets = loadSavedData();
    const dataSelect = document.getElementById('dataSelect');
    const correlationContainer = document.getElementById('correlationContainer');
    const correlationText = document.getElementById('correlation');
    const dataSetNameInput = document.getElementById('dataSetName');

    updateDataSelect();

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = canvas.height - (event.clientY - rect.top) * scaleY; // Y座標を上向き正に変換

        points.push({ x, y });
        drawPoint(x, canvas.height - y); // 描画時にY座標を再度変換
        updateCorrelation();
    });

    document.getElementById('undoButton').addEventListener('click', () => {
        if (points.length > 0) {
            points.pop();
            redrawCanvas();
            updateCorrelation();
        }
    });

    document.getElementById('saveButton').addEventListener('click', () => {
        const dataSetName = dataSetNameInput.value.trim() || `データセット ${savedDataSets.length + 1}`;
        savedDataSets.push({ name: dataSetName, points: [...points] });
        saveData();
        updateDataSelect();
        dataSetNameInput.value = '';
    });

    document.getElementById('loadButton').addEventListener('click', () => {
        const selectedIndex = dataSelect.selectedIndex;
        if (selectedIndex >= 0) {
            points = [...savedDataSets[selectedIndex].points];
            redrawCanvas();
            updateCorrelation();
        }
    });

    document.getElementById('deleteButton').addEventListener('click', () => {
        const selectedIndex = dataSelect.selectedIndex;
        if (selectedIndex >= 0) {
            savedDataSets.splice(selectedIndex, 1);
            saveData();
            updateDataSelect();
        }
    });

    document.getElementById('clearButton').addEventListener('click', () => {
        points = [];
        redrawCanvas();
        updateCorrelation();
    });

    document.getElementById('toggleCorrelationButton').addEventListener('click', () => {
        correlationContainer.style.display = correlationContainer.style.display === 'none' ? 'block' : 'none';
    });

    function loadSavedData() {
        const data = localStorage.getItem('scatterPlotData');
        return data ? JSON.parse(data) : [];
    }

    function saveData() {
        localStorage.setItem('scatterPlotData', JSON.stringify(savedDataSets));
    }

    function updateDataSelect() {
        dataSelect.innerHTML = '';
        savedDataSets.forEach((dataSet, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = dataSet.name;
            dataSelect.appendChild(option);
        });
    }

    function drawPoint(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2, true);
        ctx.fill();
    }

    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points.forEach(point => drawPoint(point.x, canvas.height - point.y)); // 描画時にY座標を再度変換
    }

    function updateCorrelation() {
        if (points.length < 2) {
            correlationText.textContent = "N/A";
            return;
        }

        const { correlation } = calculateCorrelation(points);
        correlationText.textContent = correlation.toFixed(2);
    }

    function calculateCorrelation(points) {
        const n = points.length;
        const sumX = points.reduce((sum, point) => sum + point.x, 0);
        const sumY = points.reduce((sum, point) => sum + point.y, 0);
        const sumX2 = points.reduce((sum, point) => sum + point.x ** 2, 0);
        const sumY2 = points.reduce((sum, point) => sum + point.y ** 2, 0);
        const sumXY = points.reduce((sum, point) => sum + point.x * point.y, 0);

        const numerator = n * sumXY - sumX * sumY;
        const denominator = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
        
        const correlation = denominator !== 0 ? numerator / denominator : 0;

        return { correlation };
    }
});
