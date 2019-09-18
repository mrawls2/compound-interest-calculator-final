// Input Elements
const amountEl = document.getElementsByName('amount');
const contributionEl = document.getElementsByName('contribution');
const durationEl = document.getElementsByName('duration');
const interestEl = document.getElementsByName('interest');

// Result Elements
const startingVal = document.querySelectorAll('.starting-val');
const contributionVal = document.querySelectorAll('.contribution-val');
const durationVal = document.querySelectorAll('.duration-val');
const returnVal = document.querySelectorAll('.return-val');
const finalVal = document.querySelectorAll('.final-val');

// Format Value
const formatValue = (value, type) => {
    var formatted = parseFloat(Math.round(value * 100) / 100).toFixed(2);

    switch (type) {
        case '$':
            var x = formatted.split('.'),
                x1 = x[0],
                x2 = x.length > 1 ? '.' + x[1] : '',
                rgx = /(\d+)(\d{3})/;

            // Add comma
            while (rgx.test(x1)) { x1 = x1.replace(rgx, '$1' + ',' + '$2') }

            return '$' + x1 + x2;
            break;
        case '%':
            return formatted + '%';
            break;
        default:
            return formatted
            break;
    }
}

// Display Results
const displayResults = (finalBalance) => {
	finalVal[0].innerHTML = finalBalance;
}

// Get Ratio
const getRatio = (value, max) => {
    return 100 * (value/max);
}

var pieCanvas = document.getElementById('piechart').getContext('2d');
var pieChart = new Chart(pieCanvas, {
	// The type of chart we want to create
	type: 'pie',

	// The data for our dataset
	data : {
		datasets: [{
			data: [10, 20, 30],
			backgroundColor: ['#008FCC','#008494','#5EBF86']
		}],

		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: [
		'Starting Amount',
		'Contribution Total',
		'Final Balance'
		]
	},

	// Configuration options go here
	options: {
	}
});


const updatePieChart = (amount, totalContribution, totalReturn) => {
	pieChart.data.datasets[0].data = [+amount, +totalContribution, +totalReturn];
	pieChart.update();
}


// Calculate
const calculate = () => {
	let amount = amountEl[0].value;
	let contribution = contributionEl[0].value;
	let duration = durationEl[0].value;
	let interest = interestEl[0].value;
	let rate = interest/100;
	let finalBalance;
	let totalContribution;


	// const
	if (rate) {
		finalBalance = amount * Math.pow(1 + rate, duration) + contribution * ( (Math.pow(1 + rate, duration) - 1) / rate );
		totalContribution = contribution * duration;
	} else {
		totalContribution = contribution * duration;
		finalBalance = +amount + totalContribution;
	}

	updatePieChart(amount, totalContribution, finalBalance);
	displayResults(formatValue(finalBalance, '$'));
}


// On Load
calculate();
