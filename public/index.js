

    function getColor(stock) {
        if(stock === "GME") {
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT") {
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS") {
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX") {
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    

    async function main() 

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=b3646458106b40f38e00c81cb4505386');

       const result = await response.json();

       const { GME, MSFT, DIS, BNTX } = result;

       const stocks = [GME, MSFT, DIS, BNTX];

    

    const reversedStocks = stocks.map(stock => {
        return {
            ...stock,
            values: stock.values.reverse()
        }
    })

    

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: reversedStocks[0].values.map(value => value.datetime),
            datasets: reversedStocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    findHighest(stock.values)
                ))
            }]
        }
    });

    








main()