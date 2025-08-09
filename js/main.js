// Format number with commas and round to nearest whole number
function formatNumber(num) {
    if (num === undefined || num === null) return '0';
    const rounded = Math.round(Number(num));
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function initApp() {
    // Check authentication state
    if (!isAuthenticated()) {
        return;
    }
    
    // Load appropriate dashboard
    loadDashboard();
}

function loadDashboard() {
    const user = getCurrentUser();
    const contentArea = $('#contentArea');
    
    if (user.type === "admin") {
        loadAdminDashboard(contentArea);
    } else if (user.type === "member") {
        loadMemberDashboard(contentArea, user.id);
    }
}

function loadAdminDashboard(container) {
    container.empty().html(`
        <div class="col-12">
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Admin Dashboard</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0">Circle Summary</h6>
                                </div>
                                <div class="card-body">
                                    <div id="summaryStats" class="text-center">
                                        <!-- Summary stats will be loaded here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0">Quick Actions</h6>
                                </div>
                                <div class="card-body">
                                    <button class="btn btn-primary w-100 mb-2" onclick="viewSummary()">
                                        View Circle Summary
                                    </button>
                                    <button class="btn btn-secondary w-100 mb-2" onclick="viewAllMembers()">
                                        View All Members
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0">Recent Activity</h6>
                                </div>
                                <div class="card-body">
                                    <div id="recentActivity">
                                        <!-- Recent activity will be loaded here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    // Load summary data
    loadSummaryData();
}

function loadMemberDashboard(container, memberId) {
    const memberData = getMemberData(memberId);
    const financials = getMemberFinancialSummary(memberData);
    
    container.empty().html(`
        <div class="col-12">
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0">Member Dashboard - ${memberData.First_Name} ${memberData.Last_Name}</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 mb-4">
                            <div class="card h-100">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0">Profile</h6>
                                </div>
                                <div class="card-body text-center">
                                    <img src="${memberData.learnerImageUrl || 'images/avatar_bw.jpg'}" 
                                         class="rounded-circle mb-3" width="120" height="120" alt="Member Photo">
                                    <h5>${memberData.First_Name} ${memberData.Last_Name}</h5>
                                    <p class="text-muted">ID: ${memberData.idInput}</p>
                                    <p><strong>Status:</strong> <span class="badge ${memberData.Status === 'Active' ? 'bg-success' : 'bg-danger'}">${memberData.Status}</span></p>
                                    <p><strong>Circle:</strong> ${memberData.circle}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-8 mb-4">
                            <div class="card h-100">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0">Financial Summary</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <div class="card bg-light">
                                                <div class="card-body">
                                                    <h6 class="card-title">Total Savings</h6>
                                                    <p class="card-text fs-4">K ${formatNumber(financials.totalSavings)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="card bg-light">
                                                <div class="card-body">
                                                    <h6 class="card-title">Total Loans</h6>
                                                    <p class="card-text fs-4">K ${formatNumber(financials.totalLoan)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="card bg-light">
                                                <div class="card-body">
                                                    <h6 class="card-title">Pending Returns</h6>
                                                    <p class="card-text fs-4">K ${formatNumber(financials.totalPending)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="card bg-light">
                                                <div class="card-body">
                                                    <h6 class="card-title">Projected Payout</h6>
                                                    <p class="card-text fs-4">K ${formatNumber(financials.payOut)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0">Monthly Contributions</h6>
                                </div>
                                <div class="card-body">
                                
                                <div class="table-container">
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Month</th>
                                                    <th>Shares</th>
                                                    <th>Loans</th>
                                                    <th>Returns</th>
                                                    <th>Pending</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Jul</td>
                                                    <td>K ${formatNumber(memberData.janShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.janLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.janReturns) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.janPending) || 0}</td>
                                                    <td><span class="badge ${memberData.janb ? 'bg-success' : 'bg-warning'}">${memberData.janb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Aug</td>
                                                    <td>K ${formatNumber(memberData.febShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.febLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.febReturms) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.febPending) || 0}</td>
                                                    <td><span class="badge ${memberData.febb ? 'bg-success' : 'bg-warning'}">${memberData.febb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Sep</td>
                                                    <td>K ${formatNumber(memberData.marShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.marLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.marReturns) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.marPending) || 0}</td>
                                                    <td><span class="badge ${memberData.marb ? 'bg-success' : 'bg-warning'}">${memberData.marb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Oct</td>
                                                    <td>K ${formatNumber(memberData.aprShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.aprLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.aprReturns) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.aprPending) || 0}</td>
                                                    <td><span class="badge ${memberData.aprb ? 'bg-success' : 'bg-warning'}">${memberData.aprb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Nov</td>
                                                    <td>K ${formatNumber(memberData.mayShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.mayLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.mayReturns) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.mayPending) || 0}</td>
                                                    <td><span class="badge ${memberData.mayb ? 'bg-success' : 'bg-warning'}">${memberData.mayb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Dec</td>
                                                    <td>K ${formatNumber(memberData.junShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.junLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.junReturns) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.junPending) || 0}</td>
                                                    <td><span class="badge ${memberData.junb ? 'bg-success' : 'bg-warning'}">${memberData.junb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0">Next of Kin Information</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p><strong>Name:</strong> ${memberData.kinName || 'N/A'}</p>
                                            <p><strong>Relationship:</strong> ${memberData.relation || 'N/A'}</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p><strong>Phone:</strong> ${memberData.kinPhone || 'N/A'}</p>
                                            <p><strong>Email:</strong> ${memberData.kinEmail || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
}

function loadSummaryData() {
    const summaryData = getSummaryData();
    const financials = getMemberFinancialSummary(summaryData);
    
    $('#summaryStats').html(`
        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="card-title">Total Shares</h6>
                        <p class="card-text fs-4">${formatNumber(summaryData.Shares)}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="card-title">Total Members</h6>
                        <p class="card-text fs-4">${formatNumber(getAllMembers().length)}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="card-title">Total Loans</h6>
                        <p class="card-text fs-4">K ${formatNumber(calculateLoan(summaryData))}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="card-title">Total Returns</h6>
                        <p class="card-text fs-4">K ${formatNumber(summaryData.janReturns + summaryData.febReturms + summaryData.marReturns + 
                            summaryData.aprReturns + summaryData.mayReturns + summaryData.junReturns)}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="card-title">Total Pending</h6>
                        <p class="card-text fs-4">K ${formatNumber(financials.totalPending)}</p>
                    </div>
                </div>
            </div>
        </div>
    `);
}

function viewSummary() {
    const summaryData = getSummaryData();
    const financials = getMemberFinancialSummary(summaryData);
    
    $('#contentArea').html(`
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Circle Summary</h5>
                </div>
                <div class="card-body">
                
                <div class="table-container">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Total Shares</th>
                                    <th>Total Loans</th>
                                    <th>Total Returns</th>
                                    <th>Total Pending</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Jul</td>
                                    <td>K ${formatNumber(summaryData.janShares)}</td>
                                    <td>K ${formatNumber(summaryData.janLoans)}</td>
                                    <td>K ${formatNumber(summaryData.janReturns)}</td>
                                    <td>K ${formatNumber(financials.monthlyPending.janPending)}</td>
                                </tr>
                                <tr>
                                    <td>Aug</td>
                                    <td>K ${formatNumber(summaryData.febShares)}</td>
                                    <td>K ${formatNumber(summaryData.febLoans)}</td>
                                    <td>K ${formatNumber(summaryData.febReturms)}</td>
                                    <td>K ${formatNumber(financials.monthlyPending.febPending)}</td>
                                </tr>
                                <tr>
                                    <td>Sep</td>
                                    <td>K ${formatNumber(summaryData.marShares)}</td>
                                    <td>K ${formatNumber(summaryData.marLoans)}</td>
                                    <td>K ${formatNumber(summaryData.marReturns)}</td>
                                    <td>K ${formatNumber(financials.monthlyPending.marPending)}</td>
                                </tr>
                                <tr>
                                    <td>Oct</td>
                                    <td>K ${formatNumber(summaryData.aprShares)}</td>
                                    <td>K ${formatNumber(summaryData.aprLoans)}</td>
                                    <td>K ${formatNumber(summaryData.aprReturns)}</td>
                                    <td>K ${formatNumber(financials.monthlyPending.aprPending)}</td>
                                </tr>
                                <tr>
                                    <td>Nov</td>
                                    <td>K ${formatNumber(summaryData.mayShares)}</td>
                                    <td>K ${formatNumber(summaryData.mayLoans)}</td>
                                    <td>K ${formatNumber(summaryData.mayReturns)}</td>
                                    <td>K ${formatNumber(financials.monthlyPending.mayPending)}</td>
                                </tr>
                                <tr>
                                    <td>Dec</td>
                                    <td>K ${formatNumber(summaryData.junShares)}</td>
                                    <td>K ${formatNumber(summaryData.junLoans)}</td>
                                    <td>K ${formatNumber(summaryData.junReturns)}</td>
                                    <td>K ${formatNumber(financials.monthlyPending.junPending)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                    <button class="btn btn-secondary mt-3" onclick="loadAdminDashboard($('#contentArea'))">
                        <i class="fas fa-arrow-left me-1"></i> Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    `);
}

function viewAllMembers() {
    const members = getAllMembers();
    
    let html = `
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">All Members</h5>
                </div>
                <div class="card-body">
                
                <div class="table-container">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Shares</th>
                                    <th>Loans</th>
                                    <th>Pending</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
    `;
    
    members.forEach(member => {
        const financials = getMemberFinancialSummary(member);
        html += `
            <tr>
                <td>${member.idInput}</td>
                <td>${member.First_Name} ${member.Last_Name}</td>
                <td>${formatNumber(member.Shares)}</td>
                <td>K ${formatNumber(calculateLoan(member))}</td>
                <td>K ${formatNumber(financials.totalPending) || 0}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="viewMemberDetails('${member.idInput}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
                            </tbody>
                        </table>
                    </div>
                    </div>
                    
                    <button class="btn btn-secondary mt-3" onclick="loadAdminDashboard($('#contentArea'))">
                        <i class="fas fa-arrow-left me-1"></i> Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    `;
    
    $('#contentArea').html(html);
}

function viewMemberDetails(memberId) {
    const memberData = getMemberData(memberId);
    const financials = getMemberFinancialSummary(memberData);
    
    $('#contentArea').html(`
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Member Details - ${memberData.First_Name} ${memberData.Last_Name}</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 mb-4">
                            <div class="card h-100">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0">Profile Information</h6>
                                </div>
                                <div class="card-body">
                                    <div class="text-center mb-3">
                                        <img src="${memberData.learnerImageUrl || 'images/avatar_bw.jpg'}" 
                                             class="rounded-circle" width="120" height="120" alt="Member Photo">
                                    </div>
                                    <p><strong>ID:</strong> ${memberData.idInput}</p>
                                    <p><strong>Name:</strong> ${memberData.First_Name} ${memberData.Middle_Name ? memberData.Middle_Name + ' ' : ''}${memberData.Last_Name}</p>
                                    <p><strong>Status:</strong> <span class="badge ${memberData.Status === 'Active' ? 'bg-success' : 'bg-danger'}">${memberData.Status}</span></p>
                                    <p><strong>Circle:</strong> ${memberData.circle}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-8 mb-4">
                            <div class="card h-100">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0">Financial Summary</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <div class="card bg-light">
                                                <div class="card-body">
                                                    <h6 class="card-title">Total Savings</h6>
                                                    <p class="card-text fs-4">K ${formatNumber(financials.totalSavings)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="card bg-light">
                                                <div class="card-body">
                                                    <h6 class="card-title">Total Loans</h6>
                                                    <p class="card-text fs-4">K ${formatNumber(financials.totalLoan)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="card bg-light">
                                                <div class="card-body">
                                                    <h6 class="card-title">Pending Returns</h6>
                                                    <p class="card-text fs-4">K ${formatNumber(financials.totalPending)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="card bg-light">
                                                <div class="card-body">
                                                    <h6 class="card-title">Projected Payout</h6>
                                                    <p class="card-text fs-4">K ${formatNumber(financials.payOut)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0">Monthly Contributions</h6>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Month</th>
                                                    <th>Shares</th>
                                                    <th>Loans</th>
                                                    <th>Returns</th>
                                                    <th>Pending</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Jul</td>
                                                    <td>K ${formatNumber(memberData.janShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.janLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.janReturns) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.janPending) || 0}</td>
                                                    <td><span class="badge ${memberData.janb ? 'bg-success' : 'bg-warning'}">${memberData.janb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Aug</td>
                                                    <td>K ${formatNumber(memberData.febShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.febLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.febReturms) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.febPending) || 0}</td>
                                                    <td><span class="badge ${memberData.febb ? 'bg-success' : 'bg-warning'}">${memberData.febb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Sep</td>
                                                    <td>K ${formatNumber(memberData.marShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.marLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.marReturns) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.marPending) || 0}</td>
                                                    <td><span class="badge ${memberData.marb ? 'bg-success' : 'bg-warning'}">${memberData.marb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Oct</td>
                                                    <td>K ${formatNumber(memberData.aprShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.aprLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.aprReturns) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.aprPending) || 0}</td>
                                                    <td><span class="badge ${memberData.aprb ? 'bg-success' : 'bg-warning'}">${memberData.aprb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Nov</td>
                                                    <td>K ${formatNumber(memberData.mayShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.mayLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.mayReturns) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.mayPending) || 0}</td>
                                                    <td><span class="badge ${memberData.mayb ? 'bg-success' : 'bg-warning'}">${memberData.mayb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Dec</td>
                                                    <td>K ${formatNumber(memberData.junShares) || 0}</td>
                                                    <td>K ${formatNumber(memberData.junLoans) || 0}</td>
                                                    <td>K ${formatNumber(memberData.junReturns) || 0}</td>
                                                    <td>K ${formatNumber(financials.monthlyPending.junPending) || 0}</td>
                                                    <td><span class="badge ${memberData.junb ? 'bg-success' : 'bg-warning'}">${memberData.junb ? 'Cleared' : 'Pending'}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header bg-info text-white">
                                    <h6 class="mb-0">Next of Kin Information</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p><strong>Name:</strong> ${memberData.kinName || 'N/A'}</p>
                                            <p><strong>Relationship:</strong> ${memberData.relation || 'N/A'}</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p><strong>Phone:</strong> ${memberData.kinPhone || 'N/A'}</p>
                                            <p><strong>Email:</strong> ${memberData.kinEmail || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-secondary mt-3" onclick="viewAllMembers()">
                        <i class="fas fa-arrow-left me-1"></i> Back to Members List
                    </button>
                </div>
            </div>
        </div>
    `);
}