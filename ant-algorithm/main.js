// Canvas elementini  ve içeriğini al
let canvas = document.getElementById('canvas');
canvas.width = 1000;
canvas.height = 600;
let context = canvas.getContext('2d');
let numAnts = 10;
let numIterations;
let evaporationRate = 0.5;
let pheromoneMatrix = [];
let Alpha = 1;
let Beta = 2;
let q = 100;
let initialPheromone = 5;
let distances;
let points = [];


// Kullanıcı tuval üzerine tıkladığında olay dinleyicisini ayarla
canvas.addEventListener('mousedown', handleMouseDown);

// Mousedown olayını işle - tuvale bir nokta ekler ve noktalar dizisine ekler
function handleMouseDown(event) {
    // Pencere içine canvası al
    let rect = canvas.getBoundingClientRect();
    // Fare pozisyonunu canvasa göre hesapla
    let x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // Canvasın genişliğini ve yüksekliğini ayarla
    const canvasX = x * (canvas.width / rect.width);
    const canvasY = y * (canvas.height / rect.height);
    // Canvasa nokta(şehir) ekle
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(canvasX, canvasY, 5, 0, Math.PI * 2);
    context.fill();
    points.push([canvasX, canvasY]);
}

// İki şehir arası mesafeyi hesapla
function DistanceCalculation(point1, point2) {
    const dx = point2[0] - point1[0];
    const dy = point2[1] - point1[1];
    return Math.sqrt(dx * dx + dy * dy);
}

// Şehirler dizisinden mesafe matriksi oluştur
function createGraph(dots) {
    const n = dots.length;
    const graph = [];
    for (let i = 0; i < n; i++) {
        const arr = [];
        for (let j = 0; j < n; j++) {
            arr.push(DistanceCalculation(dots[i], dots[j]));
        }
        graph.push(arr);
    }
    return graph;
}

// TSP için karınca kolonisi algoritmasını optimize et
async function ACO(distanceMatrix, numAnts, numIterations, evaporationRate, Alpha, Beta, q) {
    // Sabit bir değerle feromon matrisini başlat
    pheromoneMatrix = [];
    const initialPheromone = 1 / (distanceMatrix.length * numAnts);
    for (let i = 0; i < distanceMatrix.length; i++) {
        const arr = [];
        for (let j = 0; j < distanceMatrix.length; j++) {
            arr.push(initialPheromone);
        }
        pheromoneMatrix.push(arr);
    }
    let bestTour;
    let bestTourLength = Infinity;
    // Şimdiye kadar bulunan en iyi turu saklamak için değişkenler

    // Belirtilen iterasyon sayısına kadar döngü yap
    for (let iter = 0; iter < numIterations; iter++) {
        // Her karınca için feromon matrisinin bir kopyasını oluştur
        const antPheromoneMatrix = [];
        for (let i = 0; i < numAnts; i++) {
            antPheromoneMatrix.push(pheromoneMatrix.slice());
        }

        // her karınca için döngü oluştur
        for (let ant = 0; ant < numAnts; ant++) {
            const path = [];
            const visited = new Set();
            let current = Math.floor(Math.random() * distanceMatrix.length);
            visited.add(current);
            path.push(current);

            // her şehir için döngü
            for (let i = 0; i < distanceMatrix.length - 1; i++) {
                // Olası her bir sonraki şehrin olasılıklarını hesapla
                const probabilities = [];
                let denominator = 0;
                for (let j = 0; j < distanceMatrix.length; j++) {
                    if (!visited.has(j)) {
                        const numerator = Math.pow(pheromoneMatrix[current][j], Alpha) * Math.pow(1 / distanceMatrix[current][j], Beta);
                        denominator += numerator;
                        probabilities.push(numerator);
                    } else {
                        probabilities.push(0);
                    }
                }
                probabilities.forEach((_, index) => probabilities[index] /= denominator);

                // Ağırlıklı rasgele seçim yaparak bir sonraki şehri seç
                const random = Math.random();
                let sum = 0;
                let next;
                for (let j = 0; j < probabilities.length; j++) {
                    sum += probabilities[j];
                    if (random < sum) {
                        next = j;
                        break;
                    }
                }

                // Bir sonraki şehri yola ekle ve ziyaret edildi olarak işaretle
                visited.add(next);
                path.push(next);

                // Geçerli ve bir sonraki şehirler için feromon matrisini güncelle

                antPheromoneMatrix[ant][current][next] += q / distanceMatrix[current][next];
                antPheromoneMatrix[ant][next][current] += q / distanceMatrix[current][next];

                // bir sonraki şehire geç
                current = next;
            }

            // Turu tamamlamak için son şehirden başlangıç şehrine kadar olan mesafeyi ekle

            let tourLength = 0;
            for (let i = 0; i < path.length - 1; i++) {
                tourLength += distanceMatrix[path[i]][path[i + 1]];
            }
            tourLength += distanceMatrix[path[path.length - 1]][path[0]];

            // Yolu tamamlamak için son ve ilk şehirler için feromon matrisini güncelle
            antPheromoneMatrix[ant][path[path.length - 1]][path[0]] += q / distanceMatrix[path[path.length - 1]][path[0]];
            antPheromoneMatrix[ant][path[0]][path[path.length - 1]] += q / distanceMatrix[path[path.length - 1]][path[0]];

            // Feromon matrisine buharlaşma uygula
            for (let i = 0; i < antPheromoneMatrix[ant].length; i++) {
                for (let j = 0; j < antPheromoneMatrix[ant][i].length; j++) {
                    antPheromoneMatrix[ant][i][j] *= 1 - evaporationRate;
                    antPheromoneMatrix[ant][i][j] = Math.max(antPheromoneMatrix[ant][i][j], 0.0001);
                }
            }

            // Daha kısa bir tur bulunursa en iyi turu güncelle
            if (tourLength < bestTourLength) {
                bestTour = path;
                bestTourLength = tourLength;
            }
        }

        // Her bir karıncanın feromonuyla global feromon matrisini güncelle

        for (let i = 0; i < pheromoneMatrix.length; i++) {
            for (let j = 0; j < pheromoneMatrix[i].length; j++) {
                let sum = 0;
                for (let ant = 0; ant < numAnts; ant++) {
                    sum += antPheromoneMatrix[ant][i][j];
                }
                pheromoneMatrix[i][j] = (1 - evaporationRate) * pheromoneMatrix[i][j] + sum;
            }
        }
    }

    return [bestTour, bestTourLength];
}

// Belirtilen yoldaki noktalar arasına çizgi çiz
function drawPath(path, isBestRoute = false) {
    // Haritayı temizle
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Feromon izlerini cyan renginde çiz
    context.strokeStyle = 'rgba(0, 100, 100, 0.5)';
    context.lineWidth = 4;
    for (let i = 0; i < path.length - 1; i++) {
        let startX = points[path[i]][0];
        let startY = points[path[i]][1];
        let endX = points[path[i + 1]][0];
        let endY = points[path[i + 1]][1];
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
    }

    // En iyi rotayı siyah renkte çiz
    if (isBestRoute) {
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(points[path[0]][0], points[path[0]][1]);
        for (let i = 1; i < path.length; i++) {
            context.lineTo(points[path[i]][0], points[path[i]][1]);
        }
        context.closePath();
        context.stroke();
    }
}

// Düğmeye tıklama olayını işle - karınca kolonisi optimizasyon algoritmasını çalıştır ve sonucu görüntüle

async function startOptimization() {
    // Giriş alanından iterasyon sayısını al
    numIterations = parseInt(document.getElementById('numIterations').value);
    Beta = parseInt(document.getElementById('Beta').value);
    Alpha = parseInt(document.getElementById('Alpha').value);

    // En az iki nokta olduğundan emin ol
    if (points.length < 2) {
        alert('Add at least two points.');
        return;
    }

    // Nokta dizisinden (şehir) bir mesafe matrisi oluştur
    distances = createGraph(points);

    let bestTour;
    let bestTourLength = Infinity;

    for (let iteration = 1; iteration <= numIterations; iteration++) {
        // Şu anki iterasyon için karınca kolonisi optimizasyon algoritmasını çalıştır
        const [currentBestTour, currentBestTourLength] = await ACO(distances, numAnts, 1, evaporationRate, Alpha, Beta, q);

        // Daha kısa bir tur bulunursa en iyi turu güncelle
        if (currentBestTourLength < bestTourLength) {
            bestTour = currentBestTour;
            bestTourLength = currentBestTourLength;
        }

        // Feromon izlerini ve mevcut iterasyon için en iyi rotayı çiz
        drawPath(currentBestTour);

        // Geçerli iterasyonu ve en iyi turun uzunluğunu göster
        console.log(`Iteration ${iteration}: Best tour length = ${bestTourLength}`);
        await new Promise(resolve => setTimeout(resolve, 10));
    }

    // En iyi turu çiz
    drawPath(bestTour, true);

    document.getElementById("distance-label").innerHTML = bestTourLength;
}

// Düğmeye tıklama olayını işle - tuvali ve nokta dizisini temizle
function reset() {
    // Haritayı temizle
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Şehirleri temizle
    points = [];
}

reset();
