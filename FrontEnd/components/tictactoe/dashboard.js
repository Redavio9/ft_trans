function drawText(ctx, text, x, y, options = {}) {
    // Set default values for font size, color, and alignment
    const fontSize = options.fontSize || '16px';
    const fontFamily = options.fontFamily || 'Arial';
    const color = options.color || '#000';
    const align = options.align || 'center';
    const baseline = options.baseline || 'middle';

    // Apply the font style and color
    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;

    // Draw the text on the canvas
    ctx.fillText(text, x, y);
}

// async function fetchStatistics() {
//     const response = await fetch('/api/game_statistics/'); // Replace with your actual endpoint
//     const stats = await response.json();

//     // Update statistics in the DOM
//     document.getElementById('gamesPlayed').textContent = stats.games_played;
//     document.getElementById('winRate').textContent = stats.win_rate + '%';
//     document.getElementById('averageScore').textContent = stats.average_score;
//     document.getElementById('averageResponseTime').textContent = stats.average_response_time + ' ms';

//     // Sample data for charts (replace with real data from `stats`)
//     const performanceData = [12, 15, 9, 13, 17];  // Placeholder for scores over games
//     const winRateData = [70, 65, 80, 75, 85];      // Placeholder win rates over time

//     // Draw charts
//     drawLineChart(performanceData, 'performanceChart');
//     drawBarChart(winRateData, 'winRateChart');
// }

// function drawBarChartAnimated(data, canvasId) {
// const canvas = document.getElementById(canvasId);
// const ctx = canvas.getContext('2d');
// const padding = 40;
// const chartHeight = canvas.height - padding * 2;
// const barWidth = (canvas.width - padding * 2) / data.length - 10;

// const maxData = Math.max(...data);
// const yStep = chartHeight / maxData;

// // Draw axes
// ctx.strokeStyle = '#FFFFFF';
// ctx.beginPath();
// ctx.moveTo(padding, padding);
// ctx.lineTo(padding, canvas.height - padding);
// ctx.lineTo(canvas.width - padding, canvas.height - padding);
// ctx.stroke();

// let progress = 0; // Initial progress for animation

// drawText(ctx, 'Win Rate Over Time (Bar Chart)', 0, 0, {
//     fontSize: '20px',
//     color: '#FFFFFF',
//     align: 'left',
//     baseline: 'top',
//     // fontFamily: 'Verdana'
// });
// function animate() {
//     progress += 0.02; // Adjust speed of animation
//     ctx.clearRect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);

//     // Draw bars gradually
//     ctx.fillStyle = '#007bff';
//     data.forEach((value, index) => {
//         const x = padding + index * (barWidth + 10);
//         const height = value * yStep * progress;
//         const y = canvas.height - padding - height;
//         console.log({x}, {y}, {height})

//         ctx.fillRect(x, y, barWidth, height);
//     });

//     if (progress < 1) {
//         requestAnimationFrame(animate); // Continue the animation
//     }
// }
// requestAnimationFrame(animate); // Start animation
// }

function drawBarChartAnimated(data, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const padding = 40;
    const chartHeight = canvas.height - padding * 2;
    const barWidth = (canvas.width - padding * 2) / data.length - 10;

    const maxData = Math.max(...data);
    const yStep = chartHeight / maxData;

    // Draw axes
    ctx.strokeStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Add chart title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Win Rate Over Time (Bar Chart)', padding, 10);

    let progress = 0; // Initial progress for animation

    function animate() {
        progress += 0.02; // Adjust speed of animation
        ctx.clearRect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);

        // Draw bars and data labels
        ctx.fillStyle = '#007bff';
        data.forEach((value, index) => {
            const x = padding + index * (barWidth + 10);
            const height = value * yStep * progress;
            const y = canvas.height - padding - height;

            // Draw bar
            ctx.fillRect(x, y, barWidth, height);

            // Draw data label on top of the bar
            if (progress >= 1) {  // Display label once the animation completes
                ctx.fillStyle = '#FFFFFF';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(value, x + barWidth / 2, y - 5);
            }
            ctx.fillStyle = '#007bff';
        });

        // Draw y-axis markers
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = 0; i <= maxData; i += Math.ceil(maxData / 5)) {
            const y = canvas.height - padding - i * yStep;
            ctx.fillText(i, padding - 5, y);
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding, y);
            ctx.stroke();
        }

        if (progress < 1) {
            requestAnimationFrame(animate); // Continue the animation
        }
    }

    requestAnimationFrame(animate); // Start animation
}


function drawLineChartAnimated(data, canvasId) {
const canvas = document.getElementById(canvasId);
const ctx = canvas.getContext('2d');
const padding = 40;
const chartHeight = canvas.height - padding * 2;
const chartWidth = canvas.width - padding * 2;

const maxData = Math.max(...data);
const xStep = chartWidth / (data.length - 1);
const yStep = chartHeight / maxData;

// Draw axes
ctx.strokeStyle = '#FFFFFF';
ctx.beginPath();
ctx.moveTo(padding, padding);
ctx.lineTo(padding, canvas.height - padding);
ctx.lineTo(canvas.width - padding, canvas.height - padding);
ctx.stroke();

let progress = 0; // Initial progress for animation

drawText(ctx, 'Game Performance (Line Chart)', 0, 0, {
    fontSize: '20px',
    color: '#FFFFFF',
    align: 'left',
    baseline: 'top',
    // fontFamily: 'Verdana'
});

function animate() {
    progress += 0.02; // Adjust speed of animation
    ctx.clearRect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);

    // Draw data points and line gradually
    ctx.strokeStyle = '#007bff';
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding - data[0] * yStep);
    
    for (let i = 1; i < data.length; i++) {
        const targetX = padding + i * xStep;
        const targetY = canvas.height - padding - data[i] * yStep;

        const currentX = padding + (i - 1 + progress) * xStep;
        const currentY = canvas.height - padding - data[i - 1] * yStep + (targetY - (canvas.height - padding - data[i - 1] * yStep)) * progress;
        
        ctx.lineTo(currentX, currentY);
        ctx.arc(currentX, currentY, 2, 0, 2 * Math.PI); // Draw points
        
        if (progress >= 1) {
            ctx.lineTo(targetX, targetY);
        }
    }
    ctx.stroke();

    if (progress < 1) {
        requestAnimationFrame(animate); // Continue the animation
    }
}
requestAnimationFrame(animate); // Start animation
}

// function drawPieChartAnimated(data, canvasId) {
//     const canvas = document.getElementById(canvasId);
//     const ctx = canvas.getContext('2d');
//     const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
//     const x = canvas.width / 2;
//     const y = canvas.height / 2;
//     const radius = 200;

//     const total = data.reduce((sum, value) => sum + value, 0);
//     let startAngle = 0;
//     let progress = 0;

//     drawText(ctx, 'Pie Chart', 0, 0, {
//             fontSize: '20px',
//             color: '#FFFFFF',
//             align: 'left',
//             baseline: 'top',
//         // fontFamily: 'Verdana'
//     });

// function animate() {
//     // ctx.clearRect(0, 0, canvas.width, canvas.height);
//     progress += 0.02;

//     data.forEach((value, index) => {
//         const sliceAngle = (value / total) * (2 * Math.PI);
//         const endAngle = startAngle + sliceAngle * Math.min(progress, 1);

//         ctx.beginPath();
//         ctx.moveTo(x, y);
//         ctx.arc(x, y, radius, startAngle, endAngle);
//         ctx.closePath();

//         ctx.fillStyle = colors[index];
//         ctx.fill();

//         startAngle += sliceAngle;
//     });

//     if (progress < 1) {
//         requestAnimationFrame(animate);
//     }
// }

// requestAnimationFrame(animate);
// }
function drawPieChartAnimated(data, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = 200;

    const total = data.reduce((sum, value) => sum + value, 0);
    let startAngle = 0;
    let progress = 0;

    drawText(ctx, 'Pie Chart', 0, 0, {
        fontSize: '20px',
        color: '#FFFFFF',
        align: 'left',
        baseline: 'top'
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for animation
        progress += 0.02;

        startAngle = 0; // Reset start angle for each frame
        data.forEach((value, index) => {
            const sliceAngle = (value / total) * (2 * Math.PI);
            const endAngle = startAngle + sliceAngle * Math.min(progress, 1);

            // Draw pie slice
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, startAngle, endAngle);
            ctx.closePath();

            ctx.fillStyle = colors[index];
            ctx.fill();

            // Calculate midpoint angle for percentage text placement
            const midAngle = startAngle + sliceAngle / 2;
            const textX = x + (radius / 2) * Math.cos(midAngle); // Adjust to position inside slice
            const textY = y + (radius / 2) * Math.sin(midAngle);

            // Draw percentage text
            const percentage = ((value / total) * 100).toFixed(1) + '%';
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(percentage, textX, textY);

            startAngle += sliceAngle; // Update start angle for next slice
        });
        const colorss = {
            wins: '#4CAF50', // Green for wins
            draws: '#FFC107', // Yellow for draws
            losses: '#F44336' // Red for losses
        };
        const padding = 70;
        // Draw legend
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = colorss.wins;
        ctx.fillText("Wins", canvas.width - padding + 20, padding + 20);
        ctx.fillStyle = colorss.draws;
        ctx.fillText("Draws", canvas.width - padding + 20, padding + 40);
        ctx.fillStyle = colorss.losses;
        ctx.fillText("Losses", canvas.width - padding + 20, padding + 60);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function drawLineChartAnimated(dataSets, labels, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const padding = 70;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Colors for each line
    const colors = {
        wins: '#4CAF50', // Green for wins
        draws: '#FFC107', // Yellow for draws
        losses: '#F44336' // Red for losses
    };

    const maxData = Math.max(...dataSets.wins, ...dataSets.draws, ...dataSets.losses);
    const yStep = chartHeight / maxData;
    const xStep = chartWidth / (dataSets.wins.length - 1);

    let progress = 0;

    function animate() {
        progress += 0.02;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw axes
        ctx.strokeStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Draw y-axis labels
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = 0; i <= maxData; i += Math.ceil(maxData / 5)) {
            const y = canvas.height - padding - i * yStep;
            ctx.fillText(i, padding - 10, y);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
        }

        // Draw each line
        Object.keys(dataSets).forEach((key) => {
            ctx.strokeStyle = colors[key];
            ctx.beginPath();

            dataSets[key].forEach((value, index) => {
                const x = padding + index * xStep;
                const y = canvas.height - padding - value * yStep * progress;

                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
        });

        // Draw legend
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = colors.wins;
        ctx.fillText("Wins", canvas.width - padding + 20, padding + 20);
        ctx.fillStyle = colors.draws;
        ctx.fillText("Draws", canvas.width - padding + 20, padding + 40);
        ctx.fillStyle = colors.losses;
        ctx.fillText("Losses", canvas.width - padding + 20, padding + 60);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// // Usage example
// const dataSets = {
//     wins: [2, 5, 7, 10, 12, 19],
//     draws: [1, 2, 3, 4, 6, 8, 8],
//     losses: [3, 4, 6, 8, 9, 11, 18]
// };
drawLineChartAnimated({wins: [2, 5, 7, 10, 12, 19],
        draws: [1, 2, 3, 4, 6, 8, 8],
        losses: [3, 4, 6, 8, 9, 11, 18]}, ['Wins', 'Draws', 'Losses'], 'LineChart');

// const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']; // Colors for each slice

// Draw the pie chart at (150, 150) with a radius of 100
// let performanceData = [12, 15, 9, 13, 17];  // Placeholder for scores over games
// let winRateData = [70, 65, 80, 75, 85];      // Placeholder win rates over time
// let data = [10, 20, 30, 40]; // Data for the pie chart
// Draw charts
drawPieChartAnimated([10, 20, 30],'Pie');
// drawBarChartAnimated([12, 15, 9, 13, 17], 'performanceChart');
// drawLineChartAnimated([70, 65, 80, 75, 85], 'winRateChart');


// document.getElementById("gamesPlayed").textContent = "10";