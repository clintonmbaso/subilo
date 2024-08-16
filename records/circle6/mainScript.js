// Function to calculate total savings
function calculateSavings(data) {
    const totalShares = data.janShares + data.febShares + data.marShares + data.aprShares + data.mayShares + data.junShares + data.reg;
    return totalShares;
}

// Function to calculate total Loans
function calculateLoan(data) {
    const totalLoan = data.janLoans + data.febLoans + data.marLoans + data.aprLoans + data.mayLoans + data.junLoans;
    return totalLoan;
}

// Function to calculate simple interest
function calculateSimpleInterest(principal, rate, time) {
    return principal * rate * time + principal;
}

// Function to populate the form fields with a given data record
function populateForm(data) {
    document.getElementById('idInput').value = data.idInput;
    document.getElementById('wb_circle').value = data.circle;
    
    document.getElementById('firstnameInput').value = data.First_Name;
    document.getElementById('middlenameInput').value = data.Middle_Name;
    document.getElementById('lastnameInput').value = data.Last_Name;
    
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
    
    // Calculate and set janPending as simple interest of janLoans
    const interestRate = 0.2; // 20% interest rate
    const timePeriod = 1; // 1 year
    const janPendings = calculateSimpleInterest(data.janLoans, interestRate, timePeriod);
    const janPending = janPendings - data.janReturns;
    document.getElementById('janPending').value = janPending;
    
    document.getElementById('febShares').value = data.febShares;
    document.getElementById('febLoans').value = data.febLoans;
    document.getElementById('febReturms').value = data.febReturms;
    
    const febPendings = calculateSimpleInterest((janPending + data.febLoans), interestRate, timePeriod);
    const febPending = febPendings - data.febReturms;
    document.getElementById('febPending').value = febPending;
    
    document.getElementById('marShares').value = data.marShares;
    document.getElementById('marLoans').value = data.marLoans;
    document.getElementById('marReturns').value = data.marReturns;
    
    const marPendings = calculateSimpleInterest((febPending + data.marLoans), interestRate, timePeriod);
    const marPending = marPendings - data.marReturns;
    document.getElementById('marPending').value = marPending;

    document.getElementById('aprShares').value = data.aprShares;
    document.getElementById('aprLoans').value = data.aprLoans;
    document.getElementById('aprReturns').value = data.aprReturns;
    
    const aprPendings = calculateSimpleInterest((marPending + data.aprLoans), interestRate, timePeriod);
    const aprPending = aprPendings - data.aprReturns;
    document.getElementById('aprPending').value = aprPending;

    document.getElementById('mayShares').value = data.mayShares;
    document.getElementById('mayLoans').value = data.mayLoans;
    document.getElementById('mayReturns').value = data.mayReturns;
    
    const mayPendings = calculateSimpleInterest((aprPending + data.mayLoans), interestRate, timePeriod);
    const mayPending = mayPendings - data.mayReturns;
    document.getElementById('mayPending').value = mayPending;

    document.getElementById('junShares').value = data.junShares;
    document.getElementById('junLoans').value = data.junLoans;
    document.getElementById('junReturns').value = data.junReturns;
    
    const junPendings = calculateSimpleInterest((mayPending + data.junLoans), interestRate, timePeriod);
    const junPending = junPendings - data.junReturns;
    document.getElementById('junPending').value = junPending;

    // Populate remaining fields
    document.getElementById('reg').value = data.reg;
    
    // Calculate and set savings
    const totalSavings = calculateSavings(data);
    document.getElementById('savings').value = totalSavings;
    
    // Calculate and set pending
    const totalPending = junPending;
    document.getElementById('pending').value = totalPending;
    
    // Calculate and set pending
    const totalLoan = calculateLoan(data);
    document.getElementById('loan').value = totalLoan;
    
    const payOut = (data.Shares * 10428) - totalPending;
    document.getElementById('payOut').value = payOut;
    
    document.getElementById('paidOut').value = data.paidOut;
    
    // Handle picture display
    document.getElementById('learnerpic-source').srcset = data.learnerImageUrl;
    document.getElementById('learnerpic').src = data.learnerImageUrl;

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
