// Authentication system
const users = {
    admin: {
        password: "Subilo-AP00", // In production, use proper hashing
        name: "Administrator",
        type: "admin"
    },
    members: {
        // Admin passwords would be hashed in production
        "SI21AP0701": { password: "Bridget-AP64", name: "Bridget Muuka" },
        "SI21AP0702": { password: "Betty-AP50", name: "Bertha Betty Mambwe" },
        "SI21AP0703": { password: "Clint-AP25", name: "Clint Mbaso" },
        
        // Member passwords would be hashed in production
        "SI21MP0704": { password: "Barbra-MP09", name: "Barbra Mwape" },
        "SI21MP0705": { password: "Memory-MP29", name: "Memory Nkhosi" },
        "SI21MP0706": { password: "Angela-MP25", name: "Angela Imakando" },
        "SI21MP0707": { password: "Likando-MP89", name: "Likando Katukula" },
        "SI21MP0708": { password: "Virginia-MP82", name: "Virginia Salujinga" },
        "SI21MP0709": { password: "Mukamwanze-MP77", name: "Mukamwanze Hamaumbwe" },
        "SI21MP0710": { password: "Jessy-MP81", name: "Jessy Chinyama" },
        "SI21MP0711": { password: "Rachel-MP", name: "Rachel Nkhoma" },
        "SI21MP0712": { password: "Hazel-MP", name: "Hazel Mwiinde" },
        "SI21MP0713": { password: "Chilambe-MP22", name: "Chilambe Mutelo" },
        "SI21MP0714": { password: "Mercy-MP51", name: "Mercy Kasela" },
        "SI21MP0715": { password: "Mercy-MP34", name: "Mercy Mwila" },
        "SI21MP0716": { password: "Getrude-MP32", name: "Getrude Mwape" },
        "SI21MP0717": { password: "Febby-MP30", name: "Febby Selina Banda" },
        "SI21MP0718": { password: "Mercy-MP49", name: "Mercy Phiri" },
        "SI21MP0719": { password: "Giveson-MP86", name: "Giveson Mukuka" },
        
    }
};

let currentUser = null;

function authenticate(username, password, userType) {
    if (userType === "admin") {
        if (username === "SI21AP0000" && password === users.admin.password) {
            currentUser = users.admin;
            return true;
        }
    } else if (userType === "member") {
        if (users.members[username] && users.members[username].password === password) {
            currentUser = {
                id: username,
                name: users.members[username].name,
                type: "member"
            };
            return true;
        }
    }
    return false;
}

function logout() {
    currentUser = null;
    window.location.reload();
}

function isAuthenticated() {
    return currentUser !== null;
}

function getCurrentUser() {
    return currentUser;
}

// Initialize login form
$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        const username = $('#username').val();
        const password = $('#password').val();
        const userType = $('#loginType').val();
        
        if (authenticate(username, password, userType)) {
            $('#loginModal').modal('hide');
            loadDashboard();
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
    
    $('#logoutBtn').click(function() {
        logout();
    });
});