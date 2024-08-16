// Example data to be entered into the form
const formData = {
    idInput: 'SI21AP0304',
    First_Name: 'Bridget',
    Middle_Name: 'Muuka',
    Last_Name: 'Mbaso',
    circleBegunOn: '2024-7-5',
    circleEndsOn: '2025-01-5',
    Status: 'Active',
    
    learnerImageUrl: 'images/Muuka.jpg', // Image URL for learner picture
    parentImageUrl: 'images/Mbaso.jpg',   // Image URL for parent picture
    
    emailInput: '',
    callInput: '',
    smsInput: '',
    
    janShares: 150,
    janLoans: 400,
    janReturns: 500,
    janPending: 600,
    
    febShares: 70,
    febLoans: 50,
    febReturms: 60,
    febPending: 56,
    
    marShares: 40,
    marLoans: 38,
    marReturns: 28,
    marPending: 65,
    
    aprShares: 50,
    aprLoans: 20,
    aprReturns: 10,
    aprPending: 60,
    
    mayShares: 57,
    mayLoans: 64,
    mayReturns: 43,
    mayPending: 78,
    
    junShares: 30,
    junLoans: 30,
    junReturns: 10,
    junPending: 76,
    
    circle: 'Circle 6',

    
    relation: 'Husband',
    kinPhone: '0968084570',
    kinName: 'Clint Mbaso',
    kinEmail: 'clintonmbaso@gmail.com',
    
    
    reg: 100,
    paidOut: 500,
    
    savings: 1000,
    pending: 200,
    payout: 300,
    loan: 150,

    janb: true,
    febb: true,
    marb: true,
    mayb: true,
    junb: true,
    julb: true,
    
    paycheck: true,
    
    // Add other fields as needed
};

// Function to populate the form fields
function populateForm(data) {
    document.getElementById('idInput').value = data.ID_Number;
    document.getElementById('wb_circle').innerText = data.circle;
    
    document.getElementById('firstnameInput').value = data.First_Name;
    document.getElementById('middlenameInput').value = data.Middle_Name;
    document.getElementById('lastnameInput').value = data.Last_Name;
    
    document.getElementById('wb_circle').innerText = data.circle;

    document.getElementById('status').value = data.Status;
    
    document.getElementById('dob').value = data.circleBegunOn;
    document.getElementById('doe').value = data.circleEndsOn;
    
    document.getElementById('relationship').value = data.relation;
    document.getElementById('kinEmail').value = data.kinEmail;
    document.getElementById('kinPhone').value = data.kinPhone;
    document.getElementById('kinName').value = data.kinName;

    document.getElementById('janShares').value = data.janShares;
    document.getElementById('janLoans').value = data.janLoans;
    document.getElementById('janReturns').value = data.janReturns;
    document.getElementById('janPending').value = data.janPending;

    
    document.getElementById('febShares').value = data.febShares;
    document.getElementById('febLoans').value = data.febLoans;
    document.getElementById('febReturms').value = data.febReturms;
    document.getElementById('febPending').value = data.febPending;

    
    document.getElementById('marShares').value = data.marShares;
    document.getElementById('marLoans').value = data.marLoans;
    document.getElementById('marReturns').value = data.marReturns;
    document.getElementById('marPending').value = data.marPending;

    
    document.getElementById('aprShares').value = data.aprShares;
    document.getElementById('aprLoans').value = data.aprLoans;
    document.getElementById('aprReturns').value = data.aprReturns;
    document.getElementById('aprPending').value = data.aprPending;

    
    document.getElementById('mayShares').value = data.mayShares;
    document.getElementById('mayLoans').value = data.mayLoans;
    document.getElementById('mayReturns').value = data.mayReturns;
    document.getElementById('mayPending').value = data.mayPending;

    
    document.getElementById('junShares').value = data.junShares;
    document.getElementById('junLoans').value = data.junLoans;
    document.getElementById('junReturns').value = data.junReturns;
    document.getElementById('junPending').value = data.junPending;

    document.getElementById('reg').value = data.reg;
    document.getElementById('savings').value = data.savings;
    document.getElementById('pending').value = data.pending;
    document.getElementById('payOut').value = data.payout;
    document.getElementById('loan').value = data.loan;
    document.getElementById('paidOut').value = data.paidOut;
    
    
// Handle picture display
    document.getElementById('learnerpic-source').srcset = data.learnerImageUrl;
    document.getElementById('learnerpic').src = data.learnerImageUrl;

    // Handle parent picture display
    document.getElementById('parentpic-source').srcset = data.parentImageUrl;
    document.getElementById('parentpic').src = data.parentImageUrl;

    
    // Handle checkbox state
    document.getElementById('janb').checked = data.janb;
    document.getElementById('febb').checked = data.febb;
    document.getElementById('marb').checked = data.marb;
    document.getElementById('mayb').checked = data.mayb;
    document.getElementById('junb').checked = data.junb;
    document.getElementById('julb').checked = data.julb;

    document.getElementById('paycheck').checked = data.paycheck;

    
    // Populate other fields similarly
}

// Call the function to populate the form when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    populateForm(formData);
});