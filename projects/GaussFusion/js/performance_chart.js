document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('performanceChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                ['GenFusion', '(Video Model)'],
                ['ExploreGS', '(Video Model)'],
                ['Difix3D+', '(Image Model)'],
                ['Ours (Few-step)', '(Video Model)']
            ],
            datasets: [{
                label: 'Inference Speed (FPS)',
                data: [1.1, 1.2, 12.8, 16],
                backgroundColor: [
                    'rgba(201, 203, 207, 0.6)', // Grey
                    'rgba(201, 203, 207, 0.6)', // Grey
                    'rgba(201, 203, 207, 0.6)', // Grey
                    'rgba(54, 162, 235, 0.6)'   // Blue
                ],
                borderColor: [
                    'rgb(201, 203, 207)',
                    'rgb(201, 203, 207)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frames Per Second (FPS)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Method',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Inference Efficiency Comparison',
                    font: {
                        size: 18
                    }
                }
            }
        }
    });
});
